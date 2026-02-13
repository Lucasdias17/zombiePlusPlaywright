import { test, expect } from "@playwright/test";

test("deve cadastrar lead de usuário", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Zombie+/);

  //await page.click('//button[contains(text(), "Aperte o play... se tiver coragem")]');
  //await page.getByRole('button', {name: 'Aperte o play... se tiver coragem'}).click();

  await page.getByRole('button', { name: /Aperte o play/ }).click();

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.locator('input[name=name]').fill('Lucas Dias');
  await page.getByPlaceholder('Informe seu email').fill('teste@lucas.com');

  await page.getByRole('button', {name: 'Quero entrar na Fila!'}).click();
  await page.getByText('Agradecemos').click();
  await expect(page.getByText(/Agradecemos/)).toBeVisible();
  /*Forma de pegar o html da página
  const content = await page.content();
  console.log(content);*/
  await expect(page.locator('.toast')).toHaveText
  ('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!');
  //tobeHidden - confere de o elemento ficou invisivel 
  await expect(page.locator('.toast')).toBeHidden({timeout: 5000});

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
