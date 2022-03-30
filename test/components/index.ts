export const clickElement = async (element: string) => {
  await (await $(element)).click();

  await browser.pause(1000);
};

export const checkComment = async () => {};
