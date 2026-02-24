import { test, Page, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";

let loginPage : LoginPage
test.beforeEach(({page})=>{
    loginPage = new LoginPage(page)
})

test('deve logar como adm', async ({page})=>{
    await loginPage.visit()
    await loginPage.submitLogin('teste@teste.com', '123')
})