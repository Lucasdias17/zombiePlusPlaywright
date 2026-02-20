import { Page,expect } from "@playwright/test";

export class LandingPage {
  readonly page: Page;

  constructor (page: Page){
    this.page = page;
  }
  async visit() {
    await this.page.goto("http://localhost:3000");
    await expect(this.page).toHaveTitle(/Zombie+/);
  }

  
  async opennLeandModal() {
    await this.page.getByRole("button", { name: /Aperte o play/ }).click();
    //await page.click('//button[contains(text(), "Aperte o play... se tiver coragem")]');
    //await page.getByRole('button', {name: 'Aperte o play... se tiver coragem'}).click();
    await expect(this.page.getByTestId("modal").getByRole("heading")).
    toHaveText("Fila de espera");
  }


  async submitForm(name: string , email: string) {
    await this.page.locator("input[name=name]").fill(name);
    await this.page.getByPlaceholder("Informe seu email").fill(email);
    await this.page.getByRole("button", { name: "Quero entrar na Fila!"}).click();
  }


  async toastHaveTest(textToast: string) {
    const toast = this.page.locator(".toast")

    await this.page.getByText("Agradecemos").click();
     /*Forma de pegar o html da página
      const content = await page.content();
      console.log(content);*/
    await expect(toast).toHaveText(textToast);

    //tobeHidden - confere de o elemento ficou invisivel 
    //await expect(toast).toBeHidden({ timeout: 5000 });

    //Confere tbm se o elemento ficou invisivel 
    await expect(toast).not.toBeVisible({ timeout: 5000 });
  }


  async alertHaveTest(target: string){
    await expect(this.page.locator('.alert')).toHaveText(target);
  }
}
