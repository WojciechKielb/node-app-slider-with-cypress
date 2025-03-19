describe('Swiper Gallery Test', function () {
  it('Checks if second slide contains "United Kingdom"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.get('.swiper-slide-active').should('contain', 'United Kingdom');
  });
});

describe('Swiper Gallery Test', function () {
  it('Checks if third slide contains "Paris"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-button-next').click({ force: true });
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'Paris');
  });
});

describe('Slide Navigation Test', function () {
  it('Allows user to navigate slides using next and previous buttons', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.get('.swiper-slide-active').should('exist');
    cy.get('.swiper-button-prev').click();
    cy.get('.swiper-slide-active').should('exist');
  });
});

describe('Slide Content Test', function () {
  it('Verifies that each slide title and description are displayed correctly', function () {
    cy.visit('http://localhost:3000');
    const slides = [
      { title: 'Rome', description: 'Italy' },
      { title: 'United Kingdom', description: 'London' },
      { title: 'Paris', description: 'France' }
    ];

    slides.forEach((slide, index) => {
      if (index > 0) {
        cy.get('.swiper-button-next').click();
        cy.wait(500);
      }
      cy.get('.swiper-slide-active').within(() => {
        cy.contains(slide.title).should('be.visible');
        cy.contains(slide.description).should('be.visible');
      });
    });
  });
});

describe('Responsive Gallery Test', function () {
  const viewports = [
    { device: 'iPhone X', width: 375, height: 812 },
    { device: 'iPad', width: 768, height: 1024 },
    { device: 'MacBook 13"', width: 1280, height: 800 }
  ];

  viewports.forEach(({ device, width, height }) => {
    it(`Ensures gallery adapts to screen size on ${device}`, function () {
      cy.viewport(width, height);
      cy.visit('http://localhost:3000');
      cy.get('.swiper', { timeout: 8000 }).should('be.visible');
      cy.get('.swiper-button-next').should('be.visible').click();
      cy.wait(500);
      cy.get('.swiper-button-prev').should('be.visible').click();
    });
  });
});
