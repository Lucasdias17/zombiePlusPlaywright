import { Page, expect } from "@playwright/test";

export class Component {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async toastHaveTest(textToast: string) {
    const toast = this.page.locator(".toast");
    //await this.page.getByText("Agradecemos").click();
    await expect(toast).toHaveText(textToast);
    await expect(toast).not.toBeVisible({ timeout: 5000 });
  }
}
