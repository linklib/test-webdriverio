/**
 * Тестирование приложения студента
 */

describe("Login in Student application", () => {
  it("Login lanchpad", async () => {
    await browser.url(`https://libicraft.ru/login`);

    await $("input[type=tel]").setValue("9727775555");
    await $('button[type="submit"]').click();

    await browser.pause(2000);

    /**
     * Вводим код на вход
     * Перед запуском надо заполнить code - массив из четырех чисел
     */
    const code = [0, 0, 0, 0];
    await $("input[type=tel]:first-of-type").setValue(code[0]);
    await $("input[type=tel]:nth-child(2)").setValue(code[1]);
    await $("input[type=tel]:nth-child(3)").setValue(code[2]);
    await $("input[type=tel]:nth-child(4)").setValue(code[3]);

    await browser.pause(2000);
  });

  it("Login lanchpad", async () => {
    await (await $("a=Учебное приложение")).click();

    await browser.pause(1000);
  });

  it("Test chat", async () => {
    await (await $("div[data-test=Обучение]")).click();

    await browser.pause(1000);

    await (await $("div=Тест на рассылки")).click();

    await browser.pause(1000);

    const random = "Тестовый комментарий " + Math.floor(Math.random() * 99999);

    await (await $("textarea")).setValue(random);

    await browser.pause(1000);

    await (await $("div[data-test=Отправить]")).click();

    console.log(random);

    await browser.pause(1000);

    const divelem = $("div");

    await expect(divelem).toHaveTextContaining(random);

    await browser.pause(1000);
  });

  it("Test Learning", async () => {
    await (await $("a=Обучение")).click();

    await browser.pause(1000);

    await $("input[type=text]").setValue("Композиция");

    await browser.pause(1000);

    await (await $("a=Продолжить")).click();

    await browser.pause(5000);

    /**
     * Запускаем видео сликом на фрейме
     */
    await $("iframe:first-of-type").click();

    await browser.pause(10000);

    /**
     * Для поиска в доме фрейма переключаемся на фрейм
     */
    await browser.switchToFrame(0);
    await browser.pause(1000);

    /**
     * Проверяем играет ли видео через наличие иконки паузы
     */
    const pause = await $("#pause");

    await browser.pause(1000);

    await expect(pause).toBeExisting();
    await browser.switchToFrame(null);
    await $("iframe:first-of-type").click();

    console.log("Пауза во фрейме есть");

    await browser.pause(1000);
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
