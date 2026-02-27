import { Page, expect } from "@playwright/test";

export class MoviesPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async isLogged() {
    //networkidle-verificar se todos os componente da tela foi carregado
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveURL(/movies/);
    await expect(this.page.locator('a[href="/logout"]')).toBeVisible();
  }
}
