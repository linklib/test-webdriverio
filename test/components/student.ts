/**
 * Тестирование приложения мастера
 */

import { clickElement, checkComment, randomComment, uploadFile } from "./index";
import Student from "../pageobjects/student.pageobject";

const path = require("path");

export const student_2 = () => {
  describe("Тест приложения студента", () => {
    it("Переход в приложение студента", async () => {
      await browser.url(`https://student.libicraft.ru/inbox`);

      await expect(browser).toHaveUrlContaining("student");
    });

    it("Тестирование чата Обучение", async () => {
      await (await $("div[data-test=Обучение]")).click();

      await (await $("div=Попов Дмитрий")).waitForExist({ timeout: 3000 });

      await (await $("div=Попов Дмитрий")).click();

      /**
       * Генерация уникального тестового комментария и проверка его наличия
       */

      const random = randomComment();

      expect(await Student.chatTextarea2).toBeExisting();

      await (
        await Student.chatTextarea2
      ).click;

      await browser.pause(2000);

      await (await Student.chatTextarea2).setValue(await random);

      await browser.pause(2000);

      uploadFile();

      await browser.pause(10000);

      await (await $("div[role=Отправить]")).click();

      await browser.pause(5000);

      const divelem = $("div");

      await expect(divelem).toHaveTextContaining(await random);

      await browser.pause(5000);
    });

    it("Тестирование раздела Обучение", async () => {
      clickElement("a=Обучение");

      await $("input[type=text]").setValue("Продукт");

      await browser.pause(1000);

      await (await $("a=Продолжить")).click();

      await browser.pause(5000);

      /**
       * Запускаем видео кликом на фрейме
       */

      const iframe = await $("iframe:first-of-type");

      await iframe.waitForDisplayed({ timeout: 3000 });

      await $(iframe).doubleClick();

      await browser.pause(10000);

      /**
       * Для поиска в доме фрейма переключаемся на фрейм
       */
      await browser.switchToFrame(0);
      await browser.pause(2000);

      /**
       * Проверяем играет ли видео через наличие иконки паузы
       */
      const pause = await $("#pause");

      await browser.pause(1000);

      await expect(pause).toBeExisting();
      await browser.switchToFrame(null);

      await $("iframe:first-of-type").doubleClick();

      console.log("Пауза во фрейме есть");

      await browser.pause(2000);

      /**
       * Сдать задание
       */

      clickElement("span*=Задание 1");

      await browser.pause(2000);

      const elem = await $("button=Сдать задание");
      expect(elem).toBeExisting();

      await browser.pause(3000);

      await elem.click();

      await browser.pause(2000);

      const random2 = randomComment();

      console.log(random2);

      await browser.pause(5000);

      await (await $("textarea")).setValue(await random2);

      await browser.pause(1000);

      await (await $("div[data-test=Отправить]")).click();

      const divelem = $("div");

      await expect(divelem).toHaveTextContaining(await random2);

      await browser.pause(1000);
    });

    it("Выйти из аккаунта", async () => {
      clickElement("a=Профиль");
      clickElement("a=Выйти");
    });

    it("Закрыть тестовый браузер", async () => {
      browser.closeWindow();
    });
  });
};

/**
 * Для акка 972 777-5555
 */

export const student = () => {
  describe("Тест приложения студента", () => {
    it("Переход в приложение студента", async () => {
      await browser.url(`https://student.libicraft.ru`);
      await expect(browser).toHaveUrlContaining("student");

      //await browser.url(`https://libicraft.ru/launchpad`);
      //await expect(browser).toHaveUrlContaining("launchpad");

      //await (await $(await Student.cabinet)).click();
      //clickElement("a=Учебное приложение");
    });

    it("Тестирование чата Обучение", async () => {
      //await (await $(await Student.chatRole)).click();
      clickElement("div[data-test=Обучение]");
      //await (await $(await Student.chatBox)).click();
      clickElement("div=Тест на рассылки");

      /**
       * Генерация уникального тестового комментария и проверка его наличия
       */

      const random =
        "Тестовый комментарий " + Math.floor(Math.random() * 99999);

      await (await $("textarea")).setValue(random);

      await browser.pause(1000);
      /*
    const filePath = path.join(__dirname, "../data/dog.jpg");

    const remoteFilePath = await browser.uploadFile(filePath);

    await (await $("input[type=file]")).setValue(remoteFilePath);

    await browser.pause(1000);
    */
      await (await $("div[data-test=Отправить]")).click();

      console.log(random);

      await browser.pause(1000);

      const divelem = $("div");

      await expect(divelem).toHaveTextContaining(random);

      await browser.pause(1000);
    });

    it("Тестирование раздела Обучение", async () => {
      clickElement("a=Обучение");

      await $("input[type=text]").setValue("Композиция");

      await browser.pause(1000);

      await (await $("a=Продолжить")).click();

      await browser.pause(5000);

      /**
       * Запускаем видео кликом на фрейме
       */

      const iframe = await $("iframe:first-of-type");

      //expect(iframe).toBeExisting();
      await iframe.waitForDisplayed({ timeout: 3000 });

      await $(iframe).doubleClick();
      //await $(iframe).click();

      await browser.pause(10000);

      /**
       * Для поиска в доме фрейма переключаемся на фрейм
       */
      await browser.switchToFrame(0);
      await browser.pause(2000);

      /**
       * Проверяем играет ли видео через наличие иконки паузы
       */
      const pause = await $("#pause");

      await browser.pause(1000);

      await expect(pause).toBeExisting();
      await browser.switchToFrame(null);

      //await $("iframe:first-of-type").click();
      await $("iframe:first-of-type").doubleClick();

      console.log("Пауза во фрейме есть");

      await browser.pause(2000);

      /**
       * Сдать задание
       */

      clickElement("span*=Задание 3");

      await browser.pause(2000);

      const elem = await $("button=Сдать задание");
      expect(elem).toBeExisting();

      await browser.pause(3000);

      const text = $(elem).getText();

      await browser.pause(2000);

      console.log("Текст на кнопке: ", text);

      await browser.pause(5000);

      await elem.click();

      //console.log("Фокус: ", await elem.isFocused());

      await browser.pause(5000);
      /*
    const random = "Тестовый комментарий " + Math.floor(Math.random() * 99999);

    console.log(random);

    await browser.pause(5000);

    await (await $("textarea")).setValue(random);

    await browser.pause(1000);

    await (await $("div[data-test=Отправить]")).click();

    console.log(random);

    await browser.pause(1000);

    const divelem = $("div");

    await expect(divelem).toHaveTextContaining(random);

    await browser.pause(1000);

    await browser.pause(10000);
    */
    });

    it("Выйти из аккаунта", async () => {
      clickElement("a=Профиль");
      clickElement("a=Выйти");
    });

    it("Закрыть тестовый браузер", async () => {
      browser.closeWindow();
    });

    /*
  it("Change chat tab", async () => {
    await (await $("div=Обучение")).click();

    await browser.executeAsync((done) => {
      console.log("Wake me up before you go!");
      setTimeout(done, 1000);
    });
  });
  */
  });
};
