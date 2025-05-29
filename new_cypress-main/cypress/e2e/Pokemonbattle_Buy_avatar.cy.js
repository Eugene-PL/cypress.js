describe('e2e (end-to-end) автотест для покемонов: на покупку нового аватара для своего тренера', function () {

   it('e2e-тест на покупку аватара', function () {
        cy.visit('https://pokemonbattle.ru/');                     // Зайти на сайт
        cy.wait(1000);                                             // Пауза 1 сек.
        cy.get('.style_1_popup_white_link_left').should('have.css', 'color', 'rgb(128, 128, 128)'); // Проверка что кнопка "Восстановить" видна юзеру
        cy.get('#k_email').type('USER_LOGIN');                     // Найти поле "Почта", ввести правильный логин
        cy.get('#k_password').type('USER_PASSWORD');               // Найти поле "Пароль", ввести правильный пароль
        cy.get('.MuiButton-root').click();                         // Найти кнопку "Войти", нажать на неё
        cy.wait(3000);                                             // Пауза 3 сек.
        cy.get('.style_1_heading_38_400_pokemon_classic').contains('Покемоны').should('be.visible'); // Проверка что после авторизации есть текст
        cy.get('.header_card_trainer').click();                    // Найти кнопку личного кабинета тренера, нажать на неё
        cy.wait(3000);                                             // Пауза 3 сек.
        cy.get('.attr_id_trainer > .single_page_body_content_inner_top_list_attr_one_name').contains('ID тренера').should('be.visible'); // Проверка что после перехода на страницу, есть текст
        cy.get('.k_mobile > :nth-child(5)').click();               // Найти кнопку "Смена аватара", нажать на неё
        cy.wait(3000);                                             // Пауза 3 сек.
        cy.get('.available > button').first().click();             // Нажать "Купить" у первого доступного аватара
        cy.wait(1000);                                             // Пауза 1 сек.
        cy.get('.payment_form_card_form_title').contains('Карта').should('be.visible');                    // Проверка что после перехода на страницу, есть текст
        cy.get('.payment_form_card_form > :nth-child(2) > .style_1_base_input').type('4620869113632996');  // Вводим номер карты
        cy.get('.payment_form_card_form_inputs > :nth-child(2) > .style_1_base_input').type('125');        // Вводим CVV карты
        cy.get(':nth-child(1) > .style_1_base_input').type('1226');                                        // Вводим срок действия карты
        cy.get('.payment_form_card_form_input_last > .style_1_base_input').type('NAME');                   // Вводим имя владельца карты
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();                // Найти кнопку "Оплатить", нажать на неё
        cy.wait(1000);                                                                                     // Пауза 1 сек.
        cy.get('.style_1_base_input').type('56456');                                                       // Вводим код подтверждения СМС
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();                // Найти кнопку "Оплатить", нажать на неё
        cy.get('.payment_status_top_title').contains('Покупка прошла успешно').should('be.visible');       // Проверка что после покупки есть текст
    })
})