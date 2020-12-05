'use strict';

const btnSignUp = document.querySelector('.sign-up'),
    btnSignIn = document.querySelector('.sign-in'),
    usersList = document.querySelector('.users-list'),
    userNameElem = document.querySelector('.user-name');
let userData = [];

const render = function() {
    usersList.innerHTML = '';
    userData.forEach(function(user, i) {
        const li = document.createElement('li');
        li.innerHTML = `Имя: ${user.name}. Фамилия: ${user.surename}. Дата регистрации: ${user.regDate}. <button class="delete">Delete</button>`;
        usersList.insertAdjacentElement('beforeend', li);

        const deleteUser = li.querySelector('.delete');
        deleteUser.addEventListener('click', function() {
            userData.splice(i, 1);           
            localStorage.userData = JSON.stringify(userData);
            render();
        });
    });
};

const init = function() {
    if (localStorage.userData){
        userData = JSON.parse(localStorage.userData);
    } else {
        localStorage.todoData = JSON.stringify([]);
    }
    render();
};

const signUp = function() {
    
    const user = {},
        regexp = /[А-Яа-яЁё]+(\s+[А-Яа-яЁё])? /,
        fullName = prompt('Введите имя и фамилию');

    if (regexp.test(fullName)) {
        user.name = fullName.split(' ')[0];
        user.surename = fullName.split(' ')[1];
        user.login = prompt('Введите логин');
        user.pass = prompt('Введите пароль');
        user.regDate = new Date().toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          });
        userData.push(user);
        localStorage.userData = JSON.stringify(userData);
        render();
    } else {
        alert('Неправильный формат имени и фамилии');
    }
};

const signIn = function() {
    const login = prompt('Введите логин'),
        pass = prompt('Введите пароль');

    const checkUser = function() {
        for (let item of userData) { 
            if (item.login === login && item.pass === pass) {
                userNameElem.textContent = item.name;
                return true; // Вопрос: я сначала пробовала использовать forEach, но он всегда возвращал undefined. Не занешь, почему?
            } 
        }
    };
    
    const check = checkUser();
    if (!check){
        alert('Пользователь не найден');
    }
};

btnSignUp.addEventListener('click', signUp);
btnSignIn.addEventListener('click', signIn);

init();
