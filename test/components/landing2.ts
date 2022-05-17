/**
 * Тестирование платного заказа на лэндинге новым клиентом
 */

/**
- открыть лэндинг
- проверить наличие виджета
- клик на кнопку купить
- заполнить телефон
- подтвердить телефон
- заполнить форму
- кликнуть на Оформить заказ
- проверить наличие формы приёма оплаты
- зайти в мастер
- зайти в карточку нового клиента
- удалить карточку нового клиента
*/

var CONFIG = require("../config.json");
let client = "Ромбов";

export const landing2 = () => {
  describe("Тест на лэндинге", () => {
    it("Открываем лэндинг", async () => {
      await browser.url(`https://s-113.libicraft.ru`);

      await expect(browser).toHaveUrlContaining("s-113.libicraft.ru");
    });

    it("Проверяем ниличие виджета на лэндинге и кликаем на Купить", async () => {
      await $("h3.title=Платный на 3 даты").waitForExist({ timeout: 10000 });

      const parent = await (
        await $("h3.title=Платный на 3 даты")
      ).parentElement();

      await (await parent.$(".buy-link")).click();

      await expect(browser).toHaveUrlContaining("fieldValuesQuery");
    });

    it("Проверяем телефон", async () => {
      await $("input[type=tel]").setValue("9729116565");

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

    it("Заполняем форму", async () => {
      await $("input[name='contacts.lastName']").waitForExist({
        timeout: 10000,
      });

      await (await $("input[name='contacts.lastName']")).doubleClick();
      await browser.keys(["Delete"]);
      await $("input[name='contacts.lastName']").setValue(client);

      await (await $("input[name='contacts.firstName']")).doubleClick();
      await browser.keys(["Delete"]);
      await $("input[name='contacts.firstName']").setValue("Тест");
    });

    it("Кликаем на Оформить заказ", async () => {
      await (await $("button=Оформление заказа")).click();
    });

    it("Проверить наличие формы приёма оплаты", async () => {
      await $("div=Переделать заказ").waitForExist({
        timeout: 10000,
      });
    });
  });

  describe("Тест в мастере", () => {
    it("Входим в мастер", async () => {
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

      await browser.pause(5000);
    });

    it("Находим и удаляем нового клиента", async () => {
      await browser.url(`https://master.libicraft.ru/crm/clients`);

      await browser.waitUntil(
        async () =>
          (await browser.getUrl()) ===
          "https://master.libicraft.ru/crm/clients",
        {
          timeout: 10000,
          timeoutMsg: "URL не https://master.libicraft.ru/crm/clients",
        }
      );

      await $("input[placeholder='Имя клиента или телефон']").setValue(
        "Ромбов"
      );

      await $("*=Ромбов").click();

      await (
        await $("span=Ромбов Тест")
      ).waitForDisplayed({
        timeout: 10000,
        timeoutMsg: "Не открылвсь карточка клиента",
      });

      const edit = await (await $("a[href*='edit'")).getAttribute("href");

      console.log("###EDIT: ", edit);

      //await $("a[href*='edit'").click();

      await browser.url("https://master.libicraft.ru" + edit);

      await (
        await $("button=Удалить клиента")
      ).waitForDisplayed({
        timeout: 10000,
        timeoutMsg: "Нет кнопки Удалить клиента",
      });

      await $("button=Удалить клиента").click();

      await (
        await $("button=Подтвердить")
      ).waitForDisplayed({
        timeout: 10000,
        timeoutMsg: "Нет кнопки Подтвердить",
      });

      await $("button=Подтвердить").click();

      /*
      await (
        await $("span=Есть клиенты")
      ).waitForDisplayed({
        timeout: 10000,
        timeoutMsg: "Что-то не так с удалением клиента",
      });
      */
    });
  });
};
