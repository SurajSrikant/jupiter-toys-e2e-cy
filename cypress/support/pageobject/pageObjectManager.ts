import ContactPage from "./contact-page/contactpage";
import Cart from "./cart/cart";

class PageObjectManager {
  contactPage: ContactPage;
  cartPage: Cart;

  constructor() {
    this.contactPage = new ContactPage();
    this.cartPage = new Cart();
  }

  getContactPage() {
    return this.contactPage;
  }

  getCart() {
    return this.cartPage;
  }
}

export default PageObjectManager;
