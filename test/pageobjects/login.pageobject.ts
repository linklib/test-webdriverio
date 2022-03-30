import Page from "./pageobject";

class Login extends Page {
  async open() {
    await super.open("https://libicraft.ru/login");
  }
}

export default new Login();
