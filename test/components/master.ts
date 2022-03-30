/**
 * Тестирование приложения мастера (Чат)
 */

import { clickElement, checkComment } from "./index";
import Master from "../pageobjects/master.pageobject";

const path = require("path");

export const master = () => {
  describe("Тест приложения мастера: Чат", () => {
    it("Переход в приложение мастера", async () => {
      //clickElement("a=Кабинет Школа Soho.Dima");
      //clickElement(Master.cabinet);
      await (await $(await Master.cabinet)).click();
      //await browser.pause(3000);
    });

    it("Тестирование чата Лента ответов", async () => {
      //await Master.chatRole.waitForDisplayed({ timeout: 5000 });

      await Master.chatRole.waitForExist({ timeout: 10000 });

      //expect(await $("div[role='Лента ответов']")).toBeExisting();
      //expect(await Master.chatRole).toBeExisting();

      //clickElement("div[role='Лента ответов']");
      await (await $(await Master.chatRole)).click();

      await browser.pause(2000);

      //clickElement("div=Тест на рассылки");
      await (await $(await Master.chatBox)).click();

      await browser.pause(5000);

      /**
       * Генерация уникального тестового комментария и проверка его наличия
       */

      const random =
        "Тестовый комментарий " + Math.floor(Math.random() * 99999);

      expect(await $("textarea")).toBeExisting();

      clickElement("textarea");

      await browser.pause(2000);

      await (await $("textarea")).setValue(random);

      await browser.pause(2000);

      const filePath = path.join(__dirname, "../data/dog.jpg");

      console.log("filePath: ", filePath);

      /**
       *  Меняем свойство display для input[type=file] на block, иначе его нельзя найти
       */
      /*
      const fileUpload = $("input[type=file]");
      browser.executeAsync(
        () => {
          var elems = document.querySelectorAll("input[type='file']");
          for (var i = 0; i < elems.length; i++)
            elems[i].style.display = "block";
        }

        // assign style to elem in the browser
        //(el) => (el.style.display = "block"),
        // pass in element so we don't need to query it again in the browser
        //fileUpload
      );
      fileUpload.waitForDisplayed();
      */
      /*
      await browser.pause(10000);

      const remoteFilePath = await browser.uploadFile(filePath);
      console.log("remoteFilePath: ", remoteFilePath);

      expect(await $("input[type=file]")).toBeExisting();

      await(await $(".cGRVBr input[type=file]")).setValue(remoteFilePath);

      await browser.pause(1000);
*/
      await (await $("div[role=Отправить]")).click();

      await browser.pause(5000);

      const divelem = $("div");

      await expect(divelem).toHaveTextContaining(random);

      await browser.pause(10000);
    });
  });

  describe("Тест приложения мастера: Продажи", () => {
    it("Тестирование раздела Продажи", async () => {
      clickElement("span=Продажи");

      clickElement("a.a-unstyled=Клиенты");

      await expect(browser).toHaveUrl(
        "https://master.libicraft.ru/crm/clients"
      );

      expect(await $("*=Мобильное")).toBeExisting();

      clickElement("*=Мобильное");

      expect(await $("span=clientTest")).toBeExisting();
      //await $("span=clientTest").waitForDisplayed({ timeout: 5000 });

      clickElement("span=Продажи");

      clickElement("a.a-unstyled=Заказы");

      await expect(browser).toHaveUrl("https://master.libicraft.ru/crm/orders");

      await $(
        "input[placeholder='Имя, телефон, номер или дата заказа...']"
      ).setValue("25308");

      await browser.pause(1000);

      expect(await $("a[href='/crm/orders/25308']")).toBeExisting();

      clickElement("span=Продажи");

      clickElement("a.a-unstyled=Задачи");

      await expect(browser).toHaveUrl("https://master.libicraft.ru/crm/tasks");

      expect(await $("div=Обработать новый заказ")).toBeExisting();

      console.log(
        "Текст блока ##: ",
        await $("div=Обработать новый заказ").getText()
      );

      clickElement("div=Обработать новый заказ");

      await expect(browser).toHaveUrl(
        "https://master.libicraft.ru/crm/tasks/4293?chatId=32105"
      );

      await browser.pause(1000);

      expect(await $("[role='Отправить']")).toBeExisting();
    });
  });
};
