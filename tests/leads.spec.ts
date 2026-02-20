import { test, expect } from "@playwright/test";

import {LandingPage} from "./pages/LandingPage"
test("deve cadastrar lead de usuário", async ({ page }) => {
  const landingPage = new LandingPage(page);
  //Visit
  await landingPage.visit();
  //openleandModal
  await landingPage.opennLeandModal();
   //submitForm
  await landingPage.submitForm('Lucas Dias 2', 'teste@qa.com');
  //toastHaveTest
  const textToast = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!"
  await landingPage.toastHaveTest(textToast);
  
});
test("não deve cadastrar com e-mail inválido", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page).toHaveTitle(/Zombie+/);

  await page.getByRole('button', { name: /Aperte o play/ }).click();

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.locator('input[name=name]').fill('Lucas Dias');
  await page.getByPlaceholder('Informe seu email').fill('testelucas.com');

  await page.getByRole('button', {name: 'Quero entrar na Fila!'}).click();
  
  await expect(page.locator('.alert')).toHaveText('Email incorreto');

});
test("não deve cadastrar com campos vazio", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page).toHaveTitle(/Zombie+/);

  await page.getByRole('button', { name: /Aperte o play/ }).click();

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');


  await page.getByRole('button', {name: 'Quero entrar na Fila!'}).click();
  
  await expect(page.locator('.alert')).toHaveText(['Campo obrigatório', 'Campo obrigatório']);
 
  page.waitForTimeout(2000);
});
