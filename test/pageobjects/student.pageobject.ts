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
}

export default new Student();
