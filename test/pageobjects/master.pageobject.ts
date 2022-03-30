import Page from "./pageobject";

class Master extends Page {
  get cabinet() {
    return $("a=Кабинет Школа Soho.Dima");
  }
  get chatRole() {
    return $("div[role='Лента ответов']");
  }
  get chatBox() {
    return $("div=Тест на рассылки");
  }
  get chatTextarea() {
    return $("textarea");
  }
}

export default new Master();
