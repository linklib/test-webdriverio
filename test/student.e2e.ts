/**
 * Тестирование приложения студента
 */

import { clickElement, checkComment } from "../components";
import { login } from "../components/login";

const path = require("path");

login();

describe("Тест приложения студента", () => {
  it("Переход в приложение студента", async () => {
    clickElement("a=Учебное приложение");
  });

  it("Тестирование чата Обучение", async () => {
    clickElement("div[data-test=Обучение]");

    clickElement("div=Тест на рассылки");

    /**
     * Генерация уникального тестового комментария и проверка его наличия
     */

    const random = "Тестовый комментарий " + Math.floor(Math.random() * 99999);

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
    expect(iframe).toBeExisting();

    await $(iframe).click();

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
