let cart = {}; // корзина
let trade = {}; // корзина
let change_battery = {}; // корзина

function init() {

    //вычитуем файл goods.json
    goodsOut();
}

function goodsOut() {
    // вывод на страницу
    document.querySelectorAll('.add-to-cart').forEach(item => {
        item.addEventListener('click', event => {
            addToCart(item);
        });
    });
}
function addClass(element, className) {
    let elementQuery = document.querySelector(element);
    elementQuery.classList.add(className);
}
function removeClass(element, className) {
    let elementQuery = document.querySelector(element);
    elementQuery.classList.remove(className);
}
function addToCart(item) {
    //оповещение
    removeClass("#buttonAlert",'show');
    addClass("#buttonAlert",'d-none');
    setTimeout(function () {
        removeClass("#buttonAlert",'show');
        addClass("#buttonAlert",'d-none');
    },2000);
    //добавляем товар в корзину
    let id = item.getAttribute('data-id');
    console.log(id);
    // console.log(id);
    if (cart[id] == undefined) {
        cart[id] = 1; //если в корзине нет товара - делаем равным 1
    }
    else {
        cart[id]++; //если такой товар есть - увеличиваю на единицу
    }
    showMiniCart();
    saveCart();
}

function saveCart() {
    //сохраняю корзину в localStorage
    localStorage.setItem('product', JSON.stringify(cart)); //корзину в строку
}

function showMiniCart() {
    //показываю мини корзину
    let out = 0;
    for (let key in cart) {
        out += cart[key];
    }
    for(let keyTrade in trade){
         out++;
    }
    for(let keyChangeBattery in change_battery) {
        out++;
    }
    htm('.ac-gn-bag-badge',out);

}
function htm(el,html) {
    let element = document.querySelector(el);
    if (element) { document.querySelector(el).innerHTML = html; }
}
function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('product')) {
        // если есть - расширфровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('product'));
        trade = JSON.parse(localStorage.getItem('trade'));
        change_battery = JSON.parse(localStorage.getItem('change_battery'));
        showMiniCart();
    }
}

document.addEventListener('DOMContentLoaded', function(){
    init();
    loadCart();
});
