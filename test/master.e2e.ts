/**
 * Тестирование приложения мастера
 */

import { clickElement, checkComment } from "../components";
import { login } from "../components/login";

login();

describe("Тест приложения мастера", () => {
  it("Переход в приложение мастера", async () => {
    clickElement("a=Кабинет Школа Soho.Dima");
  });

  it("Тестирование чата Лента ответов", async () => {
    expect(await $("div[role*=Лента]")).toBeExisting();

    //expect(await $("div=Лента ответов")).toBeExisting();

    clickElement("div[role*=Лента]");

    await browser.pause(2000);

    clickElement("div=Тест на рассылки");

    await browser.pause(5000);

    /**
     * Генерация уникального тестового комментария и проверка его наличия
     */

    const random = "Тестовый комментарий " + Math.floor(Math.random() * 99999);

    expect(await $("textarea")).toBeExisting();

    clickElement("textarea");

    await browser.pause(2000);

    await (await $("textarea")).setValue(random);

    await browser.pause(2000);
    /*
    const filePath = path.join(__dirname, "../data/dog.jpg");

    const remoteFilePath = await browser.uploadFile(filePath);

    await (await $("input[type=file]")).setValue(remoteFilePath);

    await browser.pause(1000);
    */

    await (await $("div[role=Отправить]")).click();

    //expect(await $("div[dataTest=Отправить]")).toBeExisting();

    //await (await $("div[dataTest=Отправить]")).click();

    //await expect(await $("svg")).toHaveAttr("viewBox");

    //expect(await $("div=Отправить")).toBeExisting();

    //const text = $(await $("div=Отправить")).getText();

    //console.log("Текст на кнопке: ", text);

    //console.log(random);

    await browser.pause(10000);

    //const divelem = $("div");

    //await expect(divelem).toHaveTextContaining(random);

    //await browser.pause(1000);
  });
});
