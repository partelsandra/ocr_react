import 'cypress-file-upload';

describe('End-to-End Tests', () => {
  const baseUrl = "http://localhost:3000";
  const backendUrl = "http://localhost:5000";

  it('Uploads an image through frontend and triggers OCR processing', () => {
    const imageName = 'erar-0-1_002_0000280_00002_t.jpg';

    cy.intercept('POST', `${backendUrl}/upload`).as('uploadRequest');

    cy.visit(baseUrl);

    cy.fixture(imageName, 'base64').then(fileContent => {
      // Convert image inyo blob
      const blob = Cypress.Blob.base64StringToBlob(fileContent);

      // Create file from blob
      const file = new File([blob], imageName, { type: 'image/jpeg' });

      cy.get('input[type="file"]').attachFile({ fileContent: file, fileName: imageName, mimeType: 'image/jpeg' });
    });

    cy.get('.inner-box.display').should('contain', imageName).then(() => {
      cy.get('#process-button').should('not.be.disabled').click();

      cy.wait('@uploadRequest').then(() => {
        cy.get('#progress-bar').should('be.visible');

        cy.get('.text-box pre').should('be.visible');
      });
    });
  });
});
