const path = require("path");

export const clickElement = async (element: string) => {
  await (await $(element)).click();

  await browser.pause(1000);
};

export const checkComment = async () => {};

export const randomComment = async () => {
  const random = "Тестовый комментарий " + Math.floor(Math.random() * 99999);
  return random;
};

export const uploadFile = async () => {
  /**
   * Добавляем в чат картинку и текстовый файл
   */

  const filePath = path.join(__dirname, "../data/dog.jpg");
  const filePath2 = path.join(__dirname, "../data/text.txt");

  console.log("filePath: ", filePath);
  console.log("filePath2: ", filePath2);

  /**
   *  Меняем свойство display для input[type=file] на block, иначе его нельзя найти
   */

  const fileUpload = $("input[type=file]");
  browser.executeAsync(() => {
    const elems: any = document.querySelectorAll("input[type='file']");
    for (var i = 0; i < elems.length; i++) elems[i].style.display = "block";
    elems[i].removeAttribute("multiple");
  });
  fileUpload.waitForDisplayed();

  await browser.pause(3000);

  const remoteFilePath = await browser.uploadFile(filePath);
  const remoteFilePath2 = await browser.uploadFile(filePath2);

  expect(await $("input[type=file]")).toBeExisting();

  await (await $("input[type=file]")).setValue(remoteFilePath);

  await browser.pause(3000);

  await (await $("input[type=file]")).setValue(remoteFilePath2);
};
