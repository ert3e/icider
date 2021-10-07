<!doctype html>
<html lang="en">
<head>
    <link rel="icon" href="/img/logo.png">
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-149850991-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-149850991-1');
        gtag('config', 'AW-706112306');
    </script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta property="og:description" content=/>
    <meta name="description" content="{{ $product->desc }}" />
    <meta name="keywords" content="{{ $product->keywords }}" />
    <title>{{ $product->title }}</title>
    <link rel="stylesheet" href="{{ asset('css/main.css') }}" >
    <link rel="stylesheet" href="{{ asset('css/product.css') }}" >
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('css/fonts.css') }}" />
    <link rel="preload" as="font" href="https://icider.com.ua/public/fonts/fontawesome-webfont.woff2?v=4.7.0" type="font/woff2" crossorigin = "anonymous" />
    <link rel="preload" as="font" href="https://icider.com.ua/public/wss/fonts/SF-Pro-Display/v1/sf-pro-display_medium.woff2" type="font/woff2"  crossorigin = "anonymous" />
    <link rel="preload" as="font" href="https://icider.com.ua/public/wss/fonts/SF-Pro-Text/v1/sf-pro-text_regular.woff2" type="font/woff2" crossorigin = "anonymous" />
    <link rel="preload" as="font" href="https://icider.com.ua/public/wss/fonts/SF-Pro-Icons/v1/SFProIcons_light.woff"  type="font/woff" crossorigin = "anonymous" />
    <link rel="preload" as="font" href="https://icider.com.ua/public/wss/fonts/SF-Pro-Text/v1/sf-pro-text_semibold.woff2" type="font/woff2" crossorigin = "anonymous" />
<body>
@include('header')

<div id="product"> </div>
<div id="dynamic-component-info"> </div>
@include('footer')

<script src="/public/js/jquery-3.2.1.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-slick@1.1.15/dist/slickCarousel.umd.min.js"></script>

<script rel="preload" src="{{ asset('js/product.js') }} " ></script>
</body>
</html>
