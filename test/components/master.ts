/**
 * Тестирование приложения мастера
 */

import { clickElement, checkComment, randomComment, uploadFile } from "./index";
import Master from "../pageobjects/master.pageobject";

export const master_2 = () => {
  describe("Тест приложения мастера: Чат", () => {
    it("Переход в приложение мастера", async () => {
      await (await $(await Master.cabinet2)).click();
    });

    it("Тестирование чата Лента ответов", async () => {
      await Master.chatRole2.waitForExist({ timeout: 10000 });

      await (await $(await Master.chatRole2)).click();

      await browser.pause(2000);
      //await Master.chatBox2.waitForExist({ timeout: 2000 });

      await (await $(await Master.chatBox2)).click();

      /**
       * Генерация уникального тестового комментария и проверка его наличия
       */

      const random = randomComment();

      expect(await Master.chatTextarea2).toBeExisting();

      await (
        await Master.chatTextarea2
      ).click;

      await (await Master.chatTextarea2).setValue(await random);

      uploadFile();

      await browser.pause(10000);

      expect(await $("div=text.txt")).toBeExisting();

      await (await $("div[role=Отправить]")).click();

      const zadanie = await (await $(".Txoc1")).getText();

      console.log("zadanie: ", zadanie);

      if (zadanie == "Переделать") {
        await (await $("div=Принять")).click();
      } else {
        await (await $("div=Изменить оценку")).click();
        expect(await $("div=Отклонить")).toBeExisting();
        await (await $("div=Отклонить")).click();
      }
    });
  });

  describe("Тест приложения мастера: Продажи", () => {
    it("Тестирование раздела Продажи", async () => {
      await (await $("span=Продажи")).click();

      await (await $("a.a-unstyled=Клиенты")).waitForExist({ timeout: 3000 });

      await (await $("a.a-unstyled=Клиенты")).click();

      await browser.waitUntil(
        async () =>
          (await browser.getUrl()) ===
          "https://master.libicraft.ru/crm/clients",
        {
          timeout: 5000,
          timeoutMsg: "URL не https://master.libicraft.ru/crm/clients",
        }
      );

      const clients = ["*=Лиза Близнюк", "*=Ксения Зимина", "*=Иван Васильев"];

      clients.forEach(async (c) => {
        await (await $(c)).waitForExist({ timeout: 1000 });
        await (await $(c)).click();
        await (await $("span=clientTest")).waitForExist({ timeout: 1000 });
      });

      await (await $("span=Продажи")).click();

      await (await $("a.a-unstyled=Заказы")).click();

      await browser.waitUntil(
        async () =>
          (await browser.getUrl()) === "https://master.libicraft.ru/crm/orders",
        {
          timeout: 5000,
          timeoutMsg: "URL не https://master.libicraft.ru/crm/orders",
        }
      );

      await $(
        "input[placeholder='Имя, телефон, номер или дата заказа...']"
      ).setValue("25307");

      await (
        await $("a[href='/crm/orders/25307']")
      ).waitForExist({
        timeout: 3000,
      });

      await (await $("a[href='/crm/orders/25307']")).click();

      await (
        await $("span=dima_pp@mail.ru")
      ).waitForExist({
        timeout: 3000,
        timeoutMsg: "Не найден dima_pp@mail.ru в заказе 25307",
      });

      /*
      await browser.pause(1000);

      expect(await $("a[href='/crm/orders/25307']")).toBeExisting();

      clickElement("a[href='/crm/orders/25307']");

      expect(await $("span=dima_pp@mail.ru")).toBeExisting();

      await browser.pause(5000);
      */

      await $(
        "input[placeholder='Имя, телефон, номер или дата заказа...']"
      ).setValue("25258");

      await (
        await $("a[href='/crm/orders/25258']")
      ).waitForExist({
        timeout: 10000,
      });

      await (await $("a[href='/crm/orders/25258']")).click();

      await (
        await $("span=dima_pp@mail.ru")
      ).waitForExist({
        timeout: 3000,
        timeoutMsg: "Не найден dima_pp@mail.ru в заказе 25258",
      });

      /*
      await $(
        "input[placeholder='Имя, телефон, номер или дата заказа...']"
      ).setValue("25258");

      await browser.pause(1000);

      expect(await $("a[href='/crm/orders/25258']")).toBeExisting();

      clickElement("a[href='/crm/orders/25258']");

      expect(await $("span=dima_pp@mail.ru")).toBeExisting();

      await browser.pause(5000);

      */

      await $(
        "input[placeholder='Имя, телефон, номер или дата заказа...']"
      ).setValue("25193");

      await (
        await $("a[href='/crm/orders/25193']")
      ).waitForExist({
        timeout: 3000,
      });

      await (await $("a[href='/crm/orders/25193']")).click();

      await (
        await $("span=dima_pp@mail.ru")
      ).waitForExist({
        timeout: 3000,
        timeoutMsg: "Не найден rinat88@mail.ru в заказе 25193",
      });

      /*
      await $(
        "input[placeholder='Имя, телефон, номер или дата заказа...']"
      ).setValue("25193");

      await browser.pause(1000);

      expect(await $("a[href='/crm/orders/25193']")).toBeExisting();

      clickElement("a[href='/crm/orders/25193']");

      expect(await $("span=rinat88@mail.ru")).toBeExisting();
      */

      await (await $("span=Продажи")).click();

      await (await $("a.a-unstyled=Задачи")).click();

      await browser.waitUntil(
        async () =>
          (await browser.getUrl()) === "https://master.libicraft.ru/crm/tasks",
        {
          timeout: 5000,
          timeoutMsg: "URL не https://master.libicraft.ru/crm/tasks",
        }
      );

      expect(await $("div=Напомнить об оплате по заказу")).toBeExisting();

      await (await $("div=Напомнить об оплате по заказу")).click();

      await browser.waitUntil(
        async () =>
          (await browser.getUrl()) ===
          "https://master.libicraft.ru/crm/tasks/429?chatId=371",
        {
          timeout: 5000,
          timeoutMsg:
            "URL не https://master.libicraft.ru/crm/tasks/429?chatId=371",
        }
      );

      expect(await $("[role='Отправить']")).toBeExisting();

      /*

      await browser.pause(5000);

      clickElement("span=Продажи");

      clickElement("a.a-unstyled=Задачи");

      await expect(browser).toHaveUrl("https://master.libicraft.ru/crm/tasks");

      expect(await $("div=Напомнить об оплате по заказу")).toBeExisting();

      clickElement("div=Напомнить об оплате по заказу");

      await expect(browser).toHaveUrl(
        "https://master.libicraft.ru/crm/tasks/429?chatId=371"
      );

      await browser.pause(1000);

      expect(await $("[role='Отправить']")).toBeExisting();
      */
    });
  });
};

/**
 * Для акка 972 777-5555
 */

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

      const random = randomComment();
      //"Тестовый комментарий " + Math.floor(Math.random() * 99999);

      expect(await Master.chatTextarea).toBeExisting();

      await (
        await Master.chatTextarea
      ).click;
      //clickElement("textarea");

      await browser.pause(2000);

      await (await Master.chatTextarea).setValue(await random);

      await browser.pause(2000);
      /*
      const filePath = path.join(__dirname, "../data/dog.jpg");

      console.log("filePath: ", filePath);
*/
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

      await expect(divelem).toHaveTextContaining(await random);

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

      clickElement("div=Обработать новый заказ");

      await expect(browser).toHaveUrl(
        "https://master.libicraft.ru/crm/tasks/4293?chatId=32105"
      );

      await browser.pause(1000);

      expect(await $("[role='Отправить']")).toBeExisting();
    });
  });
};
