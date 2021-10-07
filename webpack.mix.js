const mix = require('laravel-mix');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.webpackConfig ({
    plugins: [
        new UglifyJsPlugin()
    ]
});
mix
    .js('resources/js/footer.js', 'public/js')
    .js('resources/js/product.js', 'public/js')
    .js('resources/js/main.js', 'public/js')
    .js('resources/js/sell.js', 'public/js')
    .js('resources/js/cart.js', 'public/js')
    .js('resources/js/lid.js', 'public/js')

    .sass('resources/sass/fonts.scss', 'public/css')
    .sass('resources/sass/main.scss', 'public/css')
    .sass('resources/sass/lid.scss', 'public/css')
    .sass('resources/sass/style.scss', 'public/css')
    .sass('resources/sass/product.scss', 'public/css')
    .sourceMaps()

    .browserSync('applesale');


