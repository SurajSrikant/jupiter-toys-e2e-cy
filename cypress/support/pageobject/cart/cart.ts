class Cart {
  cartBtn = () => cy.get(".cart-count");

  cartItem = () => cy.get(".cart-item");
}

export default Cart;
