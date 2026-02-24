import { Page,expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async visit(){
    await this.page.goto('http://localhost:3000/admin/login')

    await expect(this.page.locator('.login-form')).toBeVisible();
    }

    async submitLogin(email: string, pass: string){
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(pass)
        //await this.page.getByText('Entrar').click();
        await this.page.getByRole('button', {name:'Entrar'}).click();
    }
}