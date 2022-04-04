import Page from "./pageobject";

class Student extends Page {
  get cabinet() {
    return $("a=Учебное приложение");
  }
  get chatRole() {
    return $("div[role*=Лента]");
  }
  get chatBox() {
    return $("div=Тест на рассылки");
  }
  get chatTextarea2() {
    return $("textarea");
  }
}

export default new Student();
