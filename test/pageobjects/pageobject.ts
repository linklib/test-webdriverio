export default class Page {
  async open(path: string) {
    await browser.url(path);
  }
}
