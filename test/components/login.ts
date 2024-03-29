//import Login from "../pageobjects/login.pageobject";
var CONFIG = require("../config.json");

export const login_2 = () => {
  describe("Авторизация", () => {
    it("Аторизация в ланчпад", async () => {
      //await Login.open();
      await browser.url(`https://libicraft.ru/login`);

      await $("input[type=tel]").setValue("9726240634");
      await $('button[type="submit"]').click();

      await (
        await $("button=Не приходит СМС?")
      ).waitForDisplayed({ timeout: 10000 });

      /**
       * Вводим код на вход
       */

      const code = CONFIG.code;
      await $("input[type=tel]:first-of-type").setValue(code[0]);
      await $("input[type=tel]:nth-child(2)").setValue(code[1]);
      await $("input[type=tel]:nth-child(3)").setValue(code[2]);
      await $("input[type=tel]:nth-child(4)").setValue(code[3]);

      await (
        await $("h1=Выберите приложение")
      ).waitForDisplayed({
        timeout: 10000,
      });
    });
  });
};

/**
 * Для акка 972 777-5555
 */

export const login = () => {
  describe("Авторизация", () => {
    it("Аторизация в ланчпад", async () => {
      //await Login.open();
      await browser.url(`https://libicraft.ru/login`);

      await $("input[type=tel]").setValue("9727775555");
      await $('button[type="submit"]').click();

      await browser.pause(4000);

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

      await expect(browser).toHaveUrlContaining("launchpad");
    });
  });
};
