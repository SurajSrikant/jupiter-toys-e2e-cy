/// <reference types="cypress" />
import PageObjectManager from "../../support/pageobject/pageObjectManager";

const selector = new PageObjectManager().getCart();

type CartItem = {
  name: string;
  price: number;
  quantity: number;
  expectedSubtotal: number;
};

type CartItems = CartItem[];

const frog = () => cy.get("#product-2");
const bunny = () => cy.get("#product-4");
const bear = () => cy.get("#product-7");

const expectedItems: CartItems = [
  {
    name: "Stuffed Frog",
    price: 10.99,
    quantity: 2,
    expectedSubtotal: 21.98,
  },
  {
    name: "Fluffy Bunny",
    price: 9.99,
    quantity: 5,
    expectedSubtotal: 49.95,
  },
  {
    name: "Valentine Bear",
    price: 14.99,
    quantity: 3,
    expectedSubtotal: 44.97,
  },
];

describe("Cart page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Validate cart", () => {
    cy.intercept("GET", "views/shop.html").as("shop");

    cy.get(".btn-success").should("have.text", "Start Shopping »").click();

    cy.wait("@shop").then((res) => expect(res.response?.statusCode).to.eq(200));

    addItemsInCart(frog, 2);
    addItemsInCart(bunny, 5);
    addItemsInCart(bear, 3);

    //check cart
    selector.cartBtn().invoke("text").should("have.string", "10");

    selector.cartBtn().click();

    // Validate each cart item row
    selector.cartItem().each((row, index) => {
      cy.wrap(row).within(() => {
        cy.get("td")
          .first()
          .invoke("text")
          .then((itemText) => {
            const itemName = itemText.trim();

            const expectedItem = expectedItems.find((item) =>
              itemName.includes(item.name)
            );

            if (expectedItem) {
              // Price
              validatePrice(expectedItem);

              validateQuantity(expectedItem);

              validateTotal(expectedItem);
            }
          });
      });
    });

    validateCartTotal(expectedItems);
  });
});

function addItemsInCart(selectorFn: () => Cypress.Chainable, times: number) {
  for (let i = 0; i < times; i++) {
    selectorFn().find(".btn-success").click();
  }
}

function validatePrice(expectedItem: CartItem) {
  cy.get("td")
    .eq(1)
    .invoke("text")
    .then((priceText) => {
      const price = parseFloat(priceText.replace("$", ""));
      expect(price).to.equal(expectedItem.price);
    });
}

function validateQuantity(expectedItem: CartItem) {
  cy.get("td")
    .eq(2)
    .find('input[type="number"]')
    .should("have.value", expectedItem.quantity.toString());
}

function validateTotal(expectedItem: CartItem) {
  let calculatedTotal = 0;

  cy.get("td")
    .eq(3)
    .invoke("text")
    .then((subtotalText) => {
      const subtotal = parseFloat(subtotalText.replace("$", ""));
      expect(subtotal).to.equal(expectedItem.expectedSubtotal);
      calculatedTotal += subtotal;
    });
}

function validateCartTotal(expectedItems: CartItems) {
  cy.get(".total")
    .invoke("text")
    .then((totalText) => {
      const totalMatch = totalText.match(/Total:\s*([\d.]+)/);
      expect(totalMatch).to.not.be.null;

      const displayedTotal = parseFloat(totalMatch[1]);
      const expectedTotal = expectedItems.reduce(
        (sum, item) => sum + item.expectedSubtotal,
        0
      );

      expect(displayedTotal).to.equal(expectedTotal);
    });
}
