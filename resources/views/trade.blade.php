
@include('header')
<main role="main">
    <div class="album">
        <div class="container">
            <div class="alert alert-success alert-dismissible fade d-none" role="alert" id="buttonAlert">
                Товар добавлен в <strong> <a href="/cart">корзину</a></strong>.
            </div>
            <br>
            <h3 class="text-center">Trade in iPhone</h3>
            <br>
            <div class="justify-content-center">
                <div id="app"></div>
            </div>
            <div class="text-cart">
                <p>*Цена может варьироваться в зависимости от состояния телефона</p>
            </div>
        </div>
    </div>
</main>
@include('footer')

</html>
