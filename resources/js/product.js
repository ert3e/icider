
Vue.config.productionTip = false;
Vue.config.devtools = false;
import VueSwal from 'sweetalert2'
import StarRating from 'vue-star-rating'
import countDown from './components/countDown'
const productSlider = {
    props: ['productItem', 'loading'],
    components: {
        'slick': vueSlickCarousel
    },
    data() {
        return {
            product: 0,
            slickOptions1: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                asNavFor: '.slider-nav',
                rows: 0 ,
                fade: true,


            },
            slickOptions2: {
                slidesToShow: 3,
                rows: 0 ,
                slidesToScroll: 1,
                asNavFor: '.slider-for',
                dots: false,
                focusOnSelect: true,
                centerMode: true,
                arrows: false,
                responsive: [
                    {
                        breakpoint: 1430,
                        settings: {
                            arrows: true,
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: true,
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            arrows: false,
                            slidesToShow: 3
                        }
                    }
                ]
            },
        }
    },
    beforeUpdate() {
        if (this.$refs.slick1) {
            this.$refs.slick1.destroy();
        }
        if (this.$refs.slick2) {
            this.$refs.slick2.destroy();
        }
    },
    updated() {
        this.$nextTick(function () {

            if (this.$refs.slick1) {
                this.$refs.slick1.create();
            }
            if (this.$refs.slick2) {
                this.$refs.slick2.create();
            }
        });
    },
    methods: {
        beforeUrl(u) {
            return u.replace(/\\/g, "/");
        },
        handleAfterChange(event, slick, currentSlide) {
        },
        handleBeforeChange(event, slick, currentSlide, nextSlide) {
        },
        handleBreakpoint(event, slick, breakpoint) {
        },
        handleDestroy(event, slick) {
        },
        handleEdge(event, slick, direction) {
        },
        handleInitFor(event, slick) {

        },
        handleInit(event, slick) {
        },
        handleReInitNav(event, slick) {

        },
        handleReInitFor(event, slick) {
        },
        handleSetPosition(event, slick) {
        },
        handleSwipe(event, slick, direction) {
        },
        handleLazyLoaded(event, slick, image, imageSource) {
        },
        handleLazeLoadError(event, slick, image, imageSource) {
        },
    },
    template:  `
            <div class="col-lg-6">
                <slick
                    ref="slick1"
                    class="slider-for"
                    :options="slickOptions1"
                    @afterChange="handleAfterChange"
                    @beforeChange="handleBeforeChange"
                    @breakpoint="handleBreakpoint"
                    @destroy="handleDestroy"
                    @edge="handleEdge"
                    @init="handleInitFor"
                    @reInit="handleReInitFor"
                    @setPosition="handleSetPosition"
                    @swipe="handleSwipe"
                    @lazyLoaded="handleLazyLoaded"
                    @lazyLoadError="handleLazeLoadError"
                >
                    <div
                        class="img"
                        v-for="(item, index) in productItem.images"
                        v-bind:style='{ backgroundImage : "url(" + productItem.url + "/storage/"+ beforeUrl(item) + ")" }'
                    >
                        <img style="visibility: hidden" :src="productItem.url + '/storage/' + item" />
                    </div>
                </slick>
                <div class="row">
                    <div class="col-sm-8 offset-sm-2">
                        <div>
                            <slick
                                ref="slick2"
                                class="slider-nav"
                                :options="slickOptions2"
                                @afterChange="handleAfterChange"
                                @beforeChange="handleBeforeChange"
                                @breakpoint="handleBreakpoint"
                                @destroy="handleDestroy"
                                @edge="handleEdge"
                                @init="handleInit"
                                @reInit="handleReInitNav"
                                @setPosition="handleSetPosition"
                                @swipe="handleSwipe"
                                @lazyLoaded="handleLazyLoaded"
                                @lazyLoadError="handleLazeLoadError"
                            >
                                <div class="img" v-for="(item, index) in productItem.images">
                                    <img  :src="productItem.url + '/storage/' + beforeUrl(item)" />
                                </div>
                            </slick>
                        </div>
                    </div>
                </div>
            </div>
        `
}
const productSliderLike = {
    props: ['productItem'],
    components: {
        'slick': vueSlickCarousel
    },
    data() {
        return {
            url: '',
            product: 0,
            slickOptions: {
                slidesToShow: 4,
                slidesToScroll: 4,
                rows: 0 ,
                dots: true,
                responsive: [
                    {
                        breakpoint: 1430,
                        settings: {
                            arrows: true,
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: true,
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            arrows: false,
                            slidesToShow: 2
                        }
                    }
                ]
            },
        }
    },
    beforeUpdate() {
        if (this.$refs.slick) {
            this.$refs.slick.destroy();
        }
    },
    updated() {
        this.$nextTick(function () {
            if (this.$refs.slick) {
                this.$refs.slick.create();
            }
        });
    },
    created: function () {
        let pathname = window.location.origin;

        this.url = pathname+'/storage/';
    },
    methods: {
        handleAfterChange(event, slick, currentSlide) {},
        handleBeforeChange(event, slick, currentSlide, nextSlide) {},
        handleBreakpoint(event, slick, breakpoint) {},
        handleDestroy(event, slick) {},
        handleEdge(event, slick, direction) {},
        handleInitFor(event, slick) {},
        handleInit(event, slick) {},
        handleReInitNav(event, slick) {},
        handleReInitFor(event, slick) {},
        handleSetPosition(event, slick) {},
        handleSwipe(event, slick, direction) {},
        handleLazyLoaded(event, slick, image, imageSource) {},
        handleLazeLoadError(event, slick, image, imageSource) {},
    },
    template:  `<slick
                    ref="slick"
                    class="cross-sale-products-list"
                    :options="slickOptions"
                    @afterChange="handleAfterChange"
                    @beforeChange="handleBeforeChange"
                    @breakpoint="handleBreakpoint"
                    @destroy="handleDestroy"
                    @edge="handleEdge"
                    @init="handleInit"
                    @reInit="handleReInitNav"
                    @setPosition="handleSetPosition"
                    @swipe="handleSwipe"
                    @lazyLoaded="handleLazyLoaded"
                    @lazyLoadError="handleLazeLoadError"
                ><div v-for="(item, index) in productItem">
                        <div class="cr-sale-item">
                            <div class="item-image">
                                <img :src="url + '/' + item.img" />
                            </div>
                            <div class="item-description">
                                <p v-html="item.name">
                                </p>
                            </div>
                        </div>
                    </div>
                </slick>`
}

Vue.component('accordion-product', {
    props: {
        content: {
            type: Array,
            required: true
        },
        multiple: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            groupId: null
        }
    },
    template: `
        <div class="as-l-container selfclear">
            <ul class="as-accordion-list as-pdp-accordionlist">
                <accordion-item-product
                    v-for="item in content"
                    :multiple="multiple"
                    :item="item"
                    :groupId="groupId"
                    :key="item.id">
                </accordion-item-product>
            </ul>
        </div>
    `,
    mounted() {
        this.groupId = this.$el.id
    }
})
Vue.component('accordion-item-product', {
    props: ['item', 'multiple', 'groupId'],
    template: `
        <li :id="groupId + '-' + item.id" class="as-accordion-item as-pdp-accordionbox as-pdp-productinfosection">
            <div class="as-accordion-sectionheading">
                <h2 @click="toggle" class="as-accordion-header as-pdp-accordionboxtitle">
                    <button class="as-pdp-accordionboxbutton as-accordion-button" :class="{'as-accordion-isexpanded as-accordion-item-isexpanded': item.active}" >
                        <span class="as-accordion-title">{{item.title}}</span>
                        <span class="icon icon-plus as-accordion-plusicon as-pdp-accordionbutton"></span>
                    </button>
                </h2>
            </div>
            <transition
                name="accordion-item"
                @enter="startTransition"
                @after-enter="endTransition"
                @before-leave="startTransition"
                @after-leave="endTransition"
                >
                <div v-if="item.active"  :class="[ item.active ? 'ase-materializer ase-materializer-show' : 'ase-materializer ase-materializer-hide ase-materializer-gone' ,'accordion-item-details']">
                    <div class="as-accordion-content as-pdp-accordionboxanimation">
                        <div v-for="(items, index) in item.details" class="as-productinfosection-panel">
                            <div class="as-productinfosection-sidepanel column large-3 small-12">
                                <h3> {{ items.title }} </h3>
                            </div>
                            <div class="column large-9 small-12">
                                <div class="para-list as-pdp-lastparalist">
                                    <p> {{ items.description }} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </transition>
      </li>
    `,
    methods: {
        toggle(event) {
            if (this.multiple) this.item.active = !this.item.active
            else {
                this.$parent.$children.forEach((item, index) => {
                    if (item.$el.id === event.currentTarget.parentElement.parentElement.id) item.item.active = !item.item.active
                    else item.item.active = false
                })
            }
        },

        startTransition(el) {
            el.style.height = el.scrollHeight + 'px'
        },

        endTransition(el) {
            el.style.height = ''
        }
    }
});
Vue.component("accordion-comment", {
    props: ['comment', 'product'],
    data () {
        return {
            comments: [],
            loading: false,
            info: this.product
        }
    },
    template: `
        <div class="tab-content as-l-container">
                <div class="comment-list">
                    <span v-show="loading" class="spinner"></span>
                    <ul class="coments">
                      <accordion-item-comment v-for="comment in comments" :comment="comment"></accordion-item-comment>
                    </ul>
                </div>
                <accordion-comment-form v-on:commented="updateComment" :product="this.info"></accordion-comment-form>
        </div>
`,
    created () {
        this.loading = true;
        let _origin =  window.location.origin;
        _origin = _origin + '/api/products/' + this.product.id +'/comments';
        fetch(_origin).then(
            response => response.json()
        ).then(
            json => {
            this.comments = json;
            this.loading = false;
        }, (response) => {
            // error callback
            console.log(response);
            this.loading = false;
        });
    },
    methods: {
        updateComment (comment) {
            this.comments.push(comment);
        }
    }
});
Vue.component("accordion-item-comment", {
    props: ['comment'],
    components :  {
        StarRating
    },
    data () {
        return {
            comment: this.comment,
        }
    },
    template: `
        <li transition="slide" class="comment">
            <div class="msg">
                <div class="msg-body">
                    <p class="name">{{ comment.name }} </p>
                    <p class="text" v-html="comment.text"></p>
                    <label class="advantages_label" v-if="comment.advantages">Достоинства:</label>
                    <p class="advantages" v-if="comment.advantages"  v-html="comment.advantages"></p>
                    <label class="disadvantages_label" v-if="comment.disadvantages">Недостатки:</label>
                    <p class="disadvantages" v-if="comment.disadvantages" v-html="comment.disadvantages"></p>
                    <star-rating
                        class="justify-content-end"
                        v-bind:increment="1"
                        v-bind:max-rating="5"
                        active-color="#ffa801"
                        v-bind:star-size="15"
                        :read-only="true"
                        :rating="this.comment.rating"
                    >
                    </star-rating>
                </div>
            </div>
        </li>
    `,
});
Vue.component("accordion-comment-form", {
    template: `
    	<div id="comment">
            <div class="loader" v-show="loading" >
              <span class="spinner"></span>
            </div>
            <form id="form-review" action="" class="needs-validation" method="post" @submit.prevent="submit">
                <div class="write_review">
                    <h2 id="review-title">Написать отзыв</h2>
                    <div class="form-group row">
                        <div class="col-sm-12 col-md-6 col-lg-6">
                            <label class="control-label" for="name">Ваше имя</label>
                            <input
                                v-model="data.name"
                                :class="[ errors.name ? 'is-invalid' : '' ,'form-control']"
                                type="text"
                                id="name"
                                name="name"
                                required
                            >
                            <div v-if="errors.name" class="invalid-feedback">
                                {{ errors.name[0] }}
                            </div>
                        </div>

                        <div class="col-sm-12 col-md-6 col-lg-6">
                            <label class="control-label" for="phone">Ваш телефон</label>
                            <input
                                v-model="data.phone"
                                :class="[ errors.phone ? 'is-invalid' : '' ,'form-control']"
                                type="number"
                                name="phone"
                                id="phone"
                                required
                            >
                            <div v-if="errors.phone" class="invalid-feedback">
                                {{ errors.phone[0] }}
                            </div>
                        </div>

                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12 col-md-6 col-lg-6">
                            <label class="control-label" for="advantages">Достоинства</label>
                            <input
                                v-model="data.advantages"
                                class="form-control"
                                type="text"
                                id="advantages"
                                name="advantages"
                            >
                        </div>
                        <div class="col-sm-12 col-md-6 col-lg-6">
                            <label class="control-label"  for="disadvantages">Недостатки</label>
                            <input
                                v-model="data.disadvantages"
                                class="form-control"
                                type="text"
                                name="disadvantages"
                                id="disadvantages"
                            >
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label" for="input-review">Что можете сказать людям, которые сомневаются?</label>
                        <textarea
                            v-model="data.text"
                            rows="8"
                            id="input-review"
                            :class="[ errors.text ? 'is-invalid' : '' ,'input-message']"
                            class="input-message"
                            name="message"
                            style="width: 100%;resize: none;"
                            required
                        >

                        </textarea>
                        <div v-if="errors.text" class="invalid-feedback">
                            {{ errors.text[0] }}
                        </div>
                    </div>
                    <div class="write_review_bottom">
                        <div class="form-group">
                            <div class="col-sm-12 col-md-6 text-right">
                                <div class="write_rev_mark">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-6">
                            <input :disabled="loading" id="button-review" class="orange-button" type="submit" value="Отправить">
                        </div>
                        <!-- /.col-sm-6 -->
                        <div class="col-sm-6">
                            <star-rating
                                class="justify-content-end"
                                v-bind:increment="1"
                                v-bind:max-rating="5"
                                inactive-color="#53c347"
                                active-color="#ffa801"
                                v-bind:star-size="20"
                                @rating-selected="setRating"
                            >
                            </star-rating>
                        </div>
                    </div>

               </div>
            </form>
        </div>
    `,
    props: ['comment', 'product'],
    components :  {
        StarRating
    },
    data() {
        return {
            product_id: this.product,
            loading: false,
            data: {},
            errors: {}
        }
    },
    methods: {
        setRating: function(rating){
            this.data.rating = rating;
        },
        submit() {
            this.loading = true;

            try {
                fetch(
                    '/api/products/' + this.product_id.id + '/comments',
                    {
                        method: 'POST',
                        body: JSON.stringify(this.data),
                        headers: {'content-type': 'application/json'}
                    })
                    .then(response => response.json()).then(json => {
                        this.$emit('commented', json);
                        console.log(json);
                        if (json.errors){
                            this.errors = json.errors;
                        }
                        if(json.name){
                            VueSwal.fire({
                                icon: 'success',
                                title: 'Отзыв был добавлен',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            // Clear the message
                            this.data = {}
                        }

                        this.loading = false;
                    });
            } catch (e) {
                console.log(e)
            }
        }
    },

    computed: {

    }
});
new Vue({
    template: `
    <div class="product">
        <div class="container">
            <h1 class="clearfix">
                <div class="pull-center">
                    <span>{{ good.card_name }}</span>
                </div>
                <div class="icons text-right"></div>
            </h1>
            <div class="row">
                <productSlider :productItem="good" :loading="loading"></productSlider>
                <div class="col-lg-6">
                    <div class="list-anchors">
                        <div class="row">
                            <div class="col-lg-8 col-sm-6">
                                <span role="button">Характеристики</span>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <div class="row">
                                    <i class="productpage-i-info-header_eye productpage-i-info-header"></i>
                                    <p class="count_views">Просмотров: {{ good.count_views }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="list-anchors">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="count-down">
                                     До конца акции осталось:
                                    <countDown deadline="August 22, 2022"></countDown>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="description accessory">
                        <div class="header clearfix" style="">
                            <span>Производитель:</span>
                            <span class="sku">MRXJ2RU/A</span>
                            <span class="sku">Артикул:</span>
                        </div>
                        <div class="text">APPLE</div>
                        <div class="description-total js-description-total">
                            <div class="prices-section">
                                <div class="price-item">
                                    <span class="price-label">Цена</span>
                                    <div class="price-wrapper">
                                        <p class="description-price">
                                            <span>{{good.cost}}</span>
                                            <span>грн</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="order-section">
                                <span class="description-buttons-wrapper" style="">
                                    <button class="button" >
                                        <span v-on:click="addInCart(id)">
                                            В корзину
                                        </span>
                                    </button>
                                     <div class="kaspi-widget">
                                        <div class="ks-widget"></div>
                                     </div>
                                </span>
                            </div>
                        </div>
                        <div class="product-credit-text-wrapper"></div>
                            <div class="product-cross-sale-section">
                                <div class="productpage-info-block clearfix">
                                <div class="productpage-info-item">
                                    <div class="productpage-i-info-header productpage-i-info-header_ico1">Доставка</div>
                                        <div class="productpage-i-info-body">
                                            <p><strong>Курьером по Киеву</strong>
                                            <span><br>Привезем до трех товаров на выбор. Бесплатная доставка при заказе от 500грн.</span></p>
                                            <p>
                                            <strong>Бесплатная доставка при сумме Вашего заказа от 1000 грн.</strong>
                                            <br>Бесплатная доставка при сумме Вашего заказа от 1000 грн.</p>
                                            <p><strong>Самовывоз</strong><br>Самовывоз заказа с магазина</p>
                                        </div>
                                    </div>
                                    <div class="productpage-info-item">
                                        <div class="productpage-i-info-header productpage-i-info-header_ico2">Оплата</div>
                                        <div class="productpage-i-info-body">
                                            <p> - Наличными<br>
                                                - Наложенный платеж<br>
                                                - Privat 24<br>
                                                - Безначилный расчет с НДС<br>
                                                - Безналичный расчет без НДС
                                            </p>
                                        </div>
                                    </div>
                                <div class="productpage-info-item">
                                    <div class="productpage-i-info-header productpage-i-info-header_ico3">Возврат/обмен</div>
                                    <div class="productpage-i-info-body">
                                            <p>Бесплатный возврат и обмен в течение 14 дней. Мы не возьмем с Вас ни копейки, если:<br>
                                            - купленный Вами товар плохого качества;<br>
                                            - Вам не понравился наш сервис;<br>
                                            - просто хотите вернуть свои деньги</p><a href="/garantiya">Подробнее</a>
                                    </div>
                                </div>
                            </div>
                            <productSliderLike :productItem="goods"></productSliderLike>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div id="dynamic-component-demo" class="demo">
                        <ul class="nav nav-tabs md">
                            <li v-for="tab in tabs" v-bind:class="[ { active: currentTab === tab.name }]" v-on:click="currentTab = tab.name">
                                <a href="#tab-description" data-toggle="tab" aria-expanded="false">
                                    {{ tab.value }}
                                </a>
                            </li>
                        </ul>
                        <component v-bind:is="currentTabComponent" :content="info" :product="good" class="tab"></component>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    el: '#product',
    components: {
        'productSlider': productSlider,
        'productSliderLike': productSliderLike,
        'countDown':  countDown
    },
    data(){
        return {
            info: [],
            cart: {},
            trade: {},
            good: {},
            goods: {},
            loading: true,
            result: '',
            origin: '',
            id: 0,
            check: false,
            currentTab: "accordion-product",
            tabs: {
                "0": {
                    "value" : "Характеристики",
                    "name" : "accordion-product"

                },
                "1":  {
                    "value" : "Отзывы",
                    "name" : "accordion-comment"

                }
            },
            today: ''
        }
    },
    created: function () {
        this.urlplace = window.location.pathname;
        let _this = this;
        let _cart = _this.cart;
        let pathname = window.location.pathname;
        let _origin = window.location.origin;
        _origin = _origin + '/api/product';
        this.today = new Date();
        this.today.setHours(today.getHours() + 4);
        fetch(_origin)
            .then(response => response.json()).then(json => {
            _this.good = json;
            let result = pathname.split('/');
            _this.id = result[2];
            _this.goods = json;

            _this.good = _this.good.filter(a => a.id == result[2]);
            _this.good = _this.good[0];
            this.setViewProducts();
            _this.info = [
                {
                    id: 1,
                    active: false,
                    title: 'Информация',
                    details: {
                        0: {
                            title: "Описание",
                            description: _this.good.specifications
                        }
                    }
                },
            ];
            _this.good.url = window.location.origin;
            _this.good.images = JSON.parse(_this.good.images);
            _this.good.name = _this.good.name.replace(/<\/?[^>]+(>|$)/g, "");
            _this.loadCart();
            vm.loading = false
        }).catch(function () {
        });

        _cart = JSON.parse(localStorage.getItem('product'));
        let _trade = JSON.parse(localStorage.getItem('trade'));
        let out = 0;
        for (let key in _cart) {
            out += _cart[key];
        }
        if(_trade){
            out++;
        }
        _this.html('.ac-gn-bag-badge',out)

    },
    computed: {
        currentTabComponent: function() {
            return "" + this.currentTab;
        }
    },
    methods: {
        html: function(el,html) {
            let element = document.querySelector(el);
            if (element) { document.querySelector(el).innerHTML = html; }
        },
        setViewProducts: function () {
            this.urlplace = window.location.pathname;
            let _this = this;
            let pathname = window.location.pathname;
            let _origin = window.location.origin;
            _origin = _origin + '/api/product/'+_this.good.id;
            fetch(_origin,
                {
                    method: 'PUT',
                    body: _this.good
                }
            ).then(response => response.json()).then(json => {

            }).catch(function () {

            });
        },
        addInCart: function(id) {
            //добавляет товар в корзине
            let _cart = JSON.parse(localStorage.getItem('product'));
            VueSwal.fire({
                icon: 'success',
                title: 'Товар был добавлен в корзину',
                showConfirmButton: false,
                timer: 1500
            });
            if (_cart == null) {
                _cart = {};
                _cart[id] = 1; //если в корзине нет товара - делаем равным 1
            }
            else {
                _cart[id]++; //если такой товар есть - увеличиваю на единицу
            }
            this.saveCart(_cart);
            this.showMiniCart();
            window.location.replace("/cart");
        },
        saveCart(_cart) {
            localStorage.setItem('product', JSON.stringify(_cart)); //корзину в строку
        },
        showMiniCart() {
            let _cart = JSON.parse(localStorage.getItem('product'));
            let _trade = JSON.parse(localStorage.getItem('trade'));
            let out = 0;
            for (let key in _cart) {
                out += _cart[key];
            }
            if(_trade){
                out++;
            }
            this.html('.ac-gn-bag-badge',out);
        }
    },
});
