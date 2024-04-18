import 'cypress-file-upload';

describe('End-to-End Tests', () => {
  const baseUrl = "http://localhost:3000";
  const backendUrl = "http://localhost:5000";

  it('Uploads an image through frontend', () => {
    const imageName = 'erar-0-1_002_0000280_00002_t.jpg';

    cy.intercept('POST', `${backendUrl}/upload`).as('uploadRequest');

    cy.visit(baseUrl);

    cy.fixture(imageName).then(fileContent => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent,
        fileName: imageName,
        mimeType: 'image/jpeg'
      });
    });

    cy.get('.inner-box.display').should('contain', imageName).then(() => {
      cy.get('#process-button').should('not.be.disabled').click();
    });
  });
});
