<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>iСider</title>
    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="{{ asset('css/main.css') }}" >
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('css/fonts.css') }}" >
    <link rel="stylesheet" href="https://unpkg.com/vue-select@3.0.0/dist/vue-select.css">
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-149850991-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-149850991-1');
    </script>
    <!-- Event snippet for Добавление в корзину conversion page -->
    <script>
        gtag('event', 'conversion', {'send_to': 'AW-706112306/IsjNCMPQ-MgBELLW2dAC'});
    </script>


<body>
<header>
    <div class="navbar navbar-dark bg-dark shadow-sm" id="ac-globalnav">
        <div class="container">
            <a href="/">< Назад</a>
        </div>
    </div>
    <div class="navbar navbar-light bg-light shadow-sm sticky-top" id="ac-globalnavhite">

    </div>
</header>
<main role="main" id="app">
</main>
@include('footer')
<script src="https://unpkg.com/lodash@latest/lodash.min.js"></script>
<script src="https://unpkg.com/vue-select@3.0.0"></script>
<script src="{{ asset('js/cart.js') }}"></script>
<script src="/public/js/jquery-3.2.1.min.js" crossorigin="anonymous"></script>

</body>
</html>
