import 'cypress-file-upload';

describe('End-to-End Tests', () => {
  const baseUrl = "http://localhost:3000";
  const backendUrl = "http://localhost:5000";

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

    cy.wait('@uploadRequest', { timeout: 10000 }).then(() => {
      cy.intercept('POST', `${backendUrl}/process`).as('processRequest');
      cy.wait('@processRequest').then(() => {
        cy.get('#uploaded-image').should('be.visible');
        cy.get('.text-box pre').should('be.visible');
      });
    });
  });
});
