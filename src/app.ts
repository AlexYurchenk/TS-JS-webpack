require('./scss/main.scss');
const icon = require('./assets/images/sprite.svg');
const menu = require('./assets/menu.json');
const cardsTemplate = require('./templates/card.handlebars');
const toolbarTemplate = require('./templates/toolbar.handlebars');

console.log(icon);
document.body.insertAdjacentHTML(
    'afterbegin',
    toolbarTemplate({
        sun: './sprite.svg#sprite_sun',
        moon: './sprite.svg#sprite_moon',
    })
);
const menuContainer = document.querySelector('.js-menu');
const input = document.getElementById(
    'theme-switch-toggle'
) as HTMLInputElement;

const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
};
const currentTheme = localStorage.getItem('theme');
if (!currentTheme) {
    localStorage.setItem('theme', Theme.LIGHT);
    document.body.classList.add(Theme.LIGHT);
    input.checked = false;
}
if (currentTheme) {
    document.body.classList.add(currentTheme);
    currentTheme === Theme.DARK
        ? (input.checked = true)
        : (input.checked = false);
}

menuContainer.innerHTML = cardsTemplate(menu);

const themeToggle = () => {
    const currentTheme = localStorage.getItem('theme');
    if (
        currentTheme === Theme.DARK &&
        document.body.classList.contains(Theme.DARK)
    ) {
        document.body.classList.remove(Theme.DARK);
        document.body.classList.add(Theme.LIGHT);
        localStorage.setItem('theme', Theme.LIGHT);
    }
    if (
        currentTheme === Theme.LIGHT &&
        document.body.classList.contains(Theme.LIGHT)
    ) {
        document.body.classList.remove(Theme.LIGHT);
        document.body.classList.add(Theme.DARK);
        localStorage.setItem('theme', Theme.DARK);
    }
};
input.addEventListener('input', themeToggle);
