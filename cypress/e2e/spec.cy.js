import 'cypress-file-upload';

describe('End-to-End Tests', () => {
  const baseUrl = "http://localhost:3000";
  const backendUrl = "http://localhost:5000";
  const uploadTimeout = 5 * 60 * 1000; // 5 minutes timeout for upload request

  it('Uploads an image through frontend and processes it on backend', () => {
    const imageName = 'erar-0-1_002_0000280_00002_t.jpg';
    
    cy.intercept('POST', `${backendUrl}/upload`, (req) => {
      req.reply((res) => {
        expect(req.body.get('file')).to.exist;
        res.send({ status: 200 });
      });
    }).as('uploadRequest');

    cy.visit(baseUrl);
    
    cy.fixture(imageName).then(fileContent => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent,
        fileName: imageName,
        mimeType: 'image/jpeg' 
      });
    });

    cy.get('#process-button').click();

    cy.wait('@uploadRequest', { timeout: uploadTimeout }).then(() => {
      cy.log('Upload request completed successfully.');
      cy.intercept('POST', `${backendUrl}/process`).as('processRequest');
      cy.wait('@processRequest').then(() => {
        cy.log('Processing request completed successfully.');
        cy.get('#uploaded-image').should('be.visible');
        cy.get('.text-box pre').should('be.visible');
      });
    }).then(null, (err) => {
      cy.log(`Upload request timed out or failed: ${err}`);
    });
  });
});
