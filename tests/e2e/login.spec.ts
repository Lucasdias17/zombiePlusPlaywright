import { test, Page, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { Component } from "../pages/Component";
import { MoviesPage } from "../pages/MoviesPage";



let loginPage: LoginPage;
let component: Component;
let movies: MoviesPage;

test.beforeEach(({ page }) => {
  loginPage = new LoginPage(page);
  component = new Component(page);
  movies = new MoviesPage(page);
});

test("deve logar como adm", async ({ page }) => {
  await loginPage.visit();
  await loginPage.submitLogin("admin@zombieplus.com", "pwd123");
  await movies.isLogged();
});

test("não deve logar como senha incorreta", async ({ page }) => {
  await loginPage.visit();
  await loginPage.submitLogin("admin@zombieplus.com", "pwd");

  const textTost =
    "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.";
  await component.toastHaveTest(textTost);
});

test("não deve logar como campos vazio", async ({ page }) => {
  await loginPage.visit();
  await loginPage.submitLogin("", "");
  await loginPage.alertHaveText(["Campo obrigatório", "Campo obrigatório"]);
});

test("não deve logar como e-mail inválido", async ({ page }) => {
  await loginPage.visit();
  await loginPage.submitLogin("testeteste.com", "pwd123");
  await loginPage.alertHaveText("Email incorreto");
});