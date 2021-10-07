
@include('header')

<main>
    <div class="album">
        <div class="container-fluid album-image">
            <div class="flex-wrapper figure-wrapper">
                <a href="/change-battery">
                    <figure class="hero-bgimage"></figure>
                </a>
            </div>
        </div>
        <div class="container">
            <div class="alert alert-success alert-dismissible fade d-none" role="alert" id="buttonAlert">
                Товар добавлен в <strong> <a href="/cart">корзину</a></strong>.
            </div>
            <br>
            <h3 class="text-center">Аксуссуары для iPhone.</h3>
            <br>
            <div class="row goods-out">
                @foreach ($products as $product)
                    <div class="col-md-4 col-sm-6 col-6">
                        <div class="as-pinwheel-tile">
                            <div>
                                <div class="as-pinwheel-tilehero">
                                    <a href="/product/{{  $product->id  }}">
                                        <img src="//cdn.optipic.io/site-872/storage/app/public/{{ $product->img }}" alt=""  class="as-pinwheel-tileheroimage" data-scale-initial="1"/>
                                     </a>
                                </div>
                                <div class="as-pinwheel-infosection" style="min-height: 115px;">
                                    <div class="as-pinwheel-tileheader " style="min-height: 32px;">
                                        <div class="violator-wrapper"></div>
                                    </div>
                                    <h3 class="as-pinwheel-tiletitle">
                                        <a href="" class="as-pinwheel-tilelink" >{!!  $product->name  !!}</a>
                                    </h3>
                                </div>
                                <div class="as-pinwheel-info">
                                    <div class="as-pinwheel-price">
                                        <span class="as-pinwheel-pricecurrent">
                                            {{ $product->cost }}.00 грн.
                                        </span>
                                        <div class="as-price-savings">
                                            <span></span>
                                        </div>
                                        <a href="#" role="button" data-id="{{ $product->id }}" class="button add-to-cart">Купить</a>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</main>
@include('footer')

</body>
</html>
