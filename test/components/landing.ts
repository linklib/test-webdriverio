/**
 * Тестирование заказа на лэндинге
 */

/**
+ проверить наличие виджета на лендинге
+ проверить наличие виджета на стороннем сайте
+ открыть лэндинг
+ выбрать продукт
+ перейти к оформлению
+ ввести телефон и подтвердить
+ заполнить форму
+ оформить заказ
+ зайти в приложение студента и проверить, что заказ оформлен
+ определить номер заказа
+ зайти в мастер школы и проверить наличие заказа
+ перевести заказ в ложные
 */

var CONFIG = require("../config.json");
let order = "";

export const landing = () => {
  describe("Проверяем наличие виджетов на лэндинге и стороннем сайте", () => {
    it("Проверяем ниличие виджета на лэндинге", async () => {
      await browser.url(`https://s-113.libicraft.ru`);

      await expect(browser).toHaveUrlContaining("s-113.libicraft.ru");

      await $("h3.title=Бесплатный курс").waitForExist({ timeout: 10000 });
    });

    it("Проверяем ниличие виджета на стороннем сайте", async () => {
      await browser.url(`http://samokats.ru/testovaya-stranica.html`);

      await expect(browser).toHaveUrlContaining("testovaya-stranica");

      await $("h3.title=Бесплатный курс").waitForExist({ timeout: 10000 });
    });
  });

  describe("Заказ продукта на лэндинге", () => {
    it("Открыть лэндинг", async () => {
      await browser.url(
        `https://s-113.libicraft.ru/order/15451?fieldValuesQuery=-1808-287`
      );

      await expect(browser).toHaveUrlContaining("15451");
    });

    it("Подтверждение телефона", async () => {
      await $("input[type=tel]").setValue("9727115498");

      await $("button=Получить код").waitForExist({ timeout: 3000 });

      await (await $("button=Получить код")).click();

      await $("input[name='0']").waitForExist({ timeout: 3000 });

      const code = CONFIG.code;
      await $("input[name='0']").setValue(code[0]);
      await $("input[name='1']").setValue(code[1]);
      await $("input[name='2']").setValue(code[2]);
      await $("input[name='3']").setValue(code[3]);

      await $("div=Номер подтвержден").waitForExist({ timeout: 10000 });
    });

    it("Оформление заказа и проверка наличия на стороне студента", async () => {
      await $("button=Оформить заказ").waitForExist({ timeout: 10000 });

      await (await $("button=Оформить заказ")).click();

      await browser.url(`https://libicraft.ru/login`);

      await browser.waitUntil(
        async () => (await browser.getUrl()) === "https://libicraft.ru/login",
        {
          timeout: 5000,
          timeoutMsg: "URL не https://libicraft.ru/login",
        }
      );

      await $("input[type=tel]").setValue("9727115498");
      await $('button[type="submit"]').click();

      await (
        await $("button=Не приходит СМС?")
      ).waitForDisplayed({ timeout: 10000 });

      const code = CONFIG.code;
      await $("input[type=tel]:first-of-type").setValue(code[0]);
      await $("input[type=tel]:nth-child(2)").setValue(code[1]);
      await $("input[type=tel]:nth-child(3)").setValue(code[2]);
      await $("input[type=tel]:nth-child(4)").setValue(code[3]);

      await browser.waitUntil(
        async () =>
          (await browser.getUrl()) === "https://student.libicraft.ru/inbox",
        {
          timeout: 5000,
          timeoutMsg: "URL не https://student.libicraft.ru/inbox",
        }
      );

      await browser.url(`https://student.libicraft.ru/order`);

      await browser.waitUntil(
        async () =>
          (await browser.getUrl()) === "https://student.libicraft.ru/order",
        {
          timeout: 5000,
          timeoutMsg: "URL не https://student.libicraft.ru/order",
        }
      );

      await (await $("div[color='#377140']")).click();

      expect(await $("div=Итого")).toBeExisting();

      /**
       * Получаем номер созданного заказа
       */

      const orderurl = await browser.getUrl();

      console.log("orderurl: ", orderurl);

      const url = new URL(orderurl);

      console.log("url.pathname: ", url.pathname);

      const orderarr = url.pathname.split("/");

      order = orderarr[2];

      console.log("order: ", order);
    });

    it("Вход в мастер школы, проверка наличия заказа и перевод заказа в 'ложные' ", async () => {
      //order = "25367";
      //console.log("order2: ", order);

      await browser.url(`https://libicraft.ru/login`);

      await browser.waitUntil(
        async () => (await browser.getUrl()) === "https://libicraft.ru/login",
        {
          timeout: 10000,
          timeoutMsg: "URL не https://libicraft.ru/login",
        }
      );

      await $("input[type=tel]").setValue("9727577755");
      await $('button[type="submit"]').click();

      await (
        await $("button=Не приходит СМС?")
      ).waitForDisplayed({
        timeout: 10000,
      });

      const code = CONFIG.code;
      await $("input[type=tel]:first-of-type").setValue(code[0]);
      await $("input[type=tel]:nth-child(2)").setValue(code[1]);
      await $("input[type=tel]:nth-child(3)").setValue(code[2]);
      await $("input[type=tel]:nth-child(4)").setValue(code[3]);

      await (
        await $("*=Кабинет")
      ).waitForDisplayed({
        timeout: 10000,
      });

      await (await $("*=Кабинет")).click();

      await browser.pause(2000);

      const orderURL = `https://master.libicraft.ru/crm/orders/${order}`;

      await browser.url(orderURL);

      await browser.waitUntil(
        async () => (await browser.getUrl()) === orderURL,
        {
          timeout: 10000,
          timeoutMsg: "URL не " + orderURL,
        }
      );

      //await browser.pause(10000);

      await (
        await $("span=Тест2 Попов")
      ).waitForDisplayed({
        timeout: 10000,
      });

      await (
        await $("div=Завершен")
      ).waitForDisplayed({
        timeout: 10000,
        timeoutMsg: "Не найден div=Завершен",
      });

      //expect(await $("div=Завершен")).toBeExisting();

      await $("div=Завершен").click();

      //await browser.pause(5000);
      /*
      await (
        await $("span=Ложный")
      ).waitForDisplayed({
        timeout: 10000,
      });
  */
      //const el = await $("span=Ложный").parentElement().getAttribute("class");

      //const el = await $("span=Ложный").parentElement();

      //await el.$("div").click();

      //console.log("HTML: ", el);

      //await $("span=Ложный").parentElement().click();

      // var runInBrowser = function (argument) {
      //   argument.click();
      // };

      //var elementToClickOn = await browser.$("span=Ложный");

      //browser.execute(runInBrowser, elementToClickOn);

      var elementToClickOn = await $("span=Новый");

      expect(elementToClickOn).toBeExisting();

      console.log("Text^^ ", await elementToClickOn.getText());

      const result = await browser.execute((argument: any) => {
        argument.click();
      }, elementToClickOn);

      //await (await $("div[color='#C47D3E']").$("span=Новый")).click();

      //await browser.pause(5000);

      await (
        await $("div=Сохранить")
      ).waitForDisplayed({
        timeout: 10000,
      });

      //await browser.pause(5000);

      await $("div=Сохранить").click();

      //await browser.pause(5000);

      await (
        await $("button=Ложный заказ")
      ).waitForDisplayed({
        timeout: 10000,
      });

      await (await $("button=Ложный заказ")).click();

      //await browser.pause(5000);
    });
  });
};
