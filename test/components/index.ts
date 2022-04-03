export const clickElement = async (element: string) => {
  await (await $(element)).click();

  await browser.pause(1000);
};

export const checkComment = async () => {};

export const randomComment = async () => {
  const random = "Тестовый комментарий " + Math.floor(Math.random() * 99999);
  return random;
};
