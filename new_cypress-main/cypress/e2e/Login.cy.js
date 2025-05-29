describe('Проверка формы логина и пароля', function () {

   it('1. Правильный пароль и правильный логин', function () {
        cy.visit('https://login.qa.studio/'); //зайти на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //проверяем что кнопка "Забыли пароль?" видна юзеру
        cy.get('#mail').type('german@dolnikov.ru'); //а) найти поле логин, ввести правильный логин
        cy.get('#pass').type('iLoveqastudio1'); //б) найти поле пароль, ввести правильный пароль
        cy.get('#loginButton').click(); //в) найти кнопку войти, нажать на неё
        cy.get('#messageHeader').contains('Авторизация прошла успешно'); //г) проверка что после авторизации есть текст
        cy.get('#messageHeader').should('be.visible'); //проверка что текст виден юзеру
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //проверка что есть крестик и он виден юзеру
    })

    it('2. Проверка логики восстановления пароля', function () {
        cy.visit('https://login.qa.studio/'); //зайти на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //проверяем что кнопка "Забыли пароль?" видна юзеру
        cy.get('#forgotEmailButton').click(); //а) нажать «Забыли пароль»
        cy.get('#forgotForm > .header').contains('Восстановите пароль'); //проверка что поле восстановления существует
        cy.get('#mailForgot').type('german@dolnikov.ru'); //б) ввести любой e-mail
        cy.get('#restoreEmailButton').click(); //найти кнопку "Отправить код", нажать на неё
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); //в) проверка, что получили нужный текст
        cy.get('#messageHeader').should('be.visible'); //проверка что текст виден юзеру
        cy.get('#exitMessageButton').should('be.visible'); //в) проверка, что есть кнопка крестика
    })

    it('3. Правильный логин и НЕправильный пароль', function () {
        cy.visit('https://login.qa.studio/'); //зайти на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //проверяем что кнопка "Забыли пароль?" видна юзеру
        cy.get('#mail').type('german@dolnikov.ru'); //а) найти поле логин, ввести правильный логин
        cy.get('#pass').type('QWERTY'); //б) найти поле пароль, ввести НЕправильный пароль
        cy.get('#loginButton').click(); //в) найти кнопку войти, нажать на неё
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); //г) проверка что есть текст
        cy.get('#messageHeader').should('be.visible'); //проверка что текст виден юзеру
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //проверка что есть крестик и он виден юзеру
    })

    it('4. НЕправильный логин и правильный пароль', function () {
        cy.visit('https://login.qa.studio/'); //зайти на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //проверяем что кнопка "Забыли пароль?" видна юзеру
        cy.get('#mail').type('user@post.ru'); //а) найти поле логин, ввести НЕправильный логин
        cy.get('#pass').type('iLoveqastudio1'); //б) найти поле пароль, ввести правильный пароль
        cy.get('#loginButton').click(); //в) найти кнопку войти, нажать на неё
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); //г) проверка что есть текст
        cy.get('#messageHeader').should('be.visible'); //проверка что текст виден юзеру
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //проверка что есть крестик и он виден юзеру
    })

    it('5. Валидация на наличие @', function () {
        cy.visit('https://login.qa.studio/');
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //проверяем что кнопка "Забыли пароль?" видна юзеру
        cy.get('#mail').type('germandolnikov.ru'); //а) найти поле логин, ввести логин без @
        cy.get('#pass').type('iLoveqastudio'); //б) найти поле пароль, ввести правильный пароль
        cy.get('#loginButton').click(); //в) найти кнопку войти, нажать на неё
        cy.get('#messageHeader').should('be.visible');  //проверка что текст виден юзеру
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); //г)  Проверить, что получаем текст с ошибкой
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //проверка что есть крестик и он виден юзеру
    })

    it('6. Приведение к строчным буквам в логине', function () {
        cy.visit('https://login.qa.studio/');
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); //проверяем что кнопка "Забыли пароль?" видна юзеру
        cy.get('#mail').type('GerMan@Dolnikov.ru'); //а) найти поле логин, ввести правильный логин с заглавными буквами 
        cy.get('#pass').type('iLoveqastudio'); //б) найти поле пароль, ввести правильный пароль
        cy.get('#loginButton').click(); //в) найти кнопку войти, нажать на неё
        cy.get('#messageHeader').should('be.visible');  //проверка что текст виден юзеру
        cy.get('#messageHeader').contains('Авторизация прошла успешно'); //г) проверка что после авторизации есть текст
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //проверка что есть крестик и он виден юзеру
    })
})


// запуск через теринал: npx cypress run --spec cypress/e2e/Login.cy.js --browser chrome
