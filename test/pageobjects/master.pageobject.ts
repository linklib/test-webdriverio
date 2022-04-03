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

  get cabinet2() {
    return $("a=Кабинет Школа Soho.MBA");
  }
  get chatRole2() {
    return $("div[role='Лента ответов']");
  }
  get chatBox2() {
    return $("div=Александра Асейкина");
  }
  get chatTextarea2() {
    return $("textarea");
  }
}

export default new Master();
