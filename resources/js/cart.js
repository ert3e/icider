Vue.component("v-select", VueSelect.VueSelect);
import VueSwal from 'sweetalert2'
function formatNumber(n, c, d, t){
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d === undefined ? '.' : d,
        t = t === undefined ? ',' : t,
        s = n < 0 ? '-' : '',
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
}

// Allow the formatNumber function to be used as a filter
Vue.filter('formatCurrency', function (value) {
    return formatNumber(value, 2, '.', ' ');
});

// The shopping cart component
Vue.component('shopping-cart', {
    props: ['productItem','tradeItem'],
    computed: {
        Total() {
            let total = 0;
            this.productItem.forEach(item => {
                total += (item.cost * item.qty);
            });
            this.tradeItem.forEach(item => {
                total += item.cost;
            });
            try {
                init.total = total;
            } catch (error) {

            }
            return total;
        },

    },
    methods: {

        plusGoods:function(id) {
            this.$root.plusGoods(this.productItem[id].id);
            this.productItem[id].qty++;
        },
        minusGoods:function(id) {
            if(this.productItem[id].qty !== 1){
                this.$root.minusGoods(this.productItem[id].id);
                this.productItem[id].qty--;
            }
        },
        removeItem(index, item) {
            if(item == 'trade'){
                this.$root.delGoods(index.id);
                this.tradeItem.splice(index, 1);
            } else {
                this.$root.delGoods(index.id);
                this.productItem.splice(index, 1);
            }
        },
        validate() {
            if(this.$root.validateForm()){
                if(this.$root.sendValid){
                    this.$root.send();
                    this.$root.delAllGoods();
                    this.productItem.splice(0);
                    this.tradeItem.splice(0);
                }
            }
        }
    }
});

var init = new Vue({
    el: '#app',
    template:
        `
        <div class="container">
            <shopping-cart inline-template :productItem="productItems" :tradeItem="tradeItems" :batteryItem="batteryItems">
                <div class="row">
                    <div class="col-md-9 col-sm-12 mt-4">
                    <div class="container">
                        <div class="alert alert-success fade d-none" role="alert" id="alertCart">
                            <strong>?????? ?????????? ????????????!</strong> ???????????????? ???? ?? ???????? ????????????????.
                        </div>
                            <table class="table table-hover table-bordered shadow-sm">
                                    <tbody class="main-cart">
                                        <tr v-for="(item, index) in productItem">
                                            <th scope="row">
                                                <button
                                                    type="button"
                                                    style="float: left"
                                                    class="del-goods close"
                                                    ata-dismiss="alert"
                                                    v-on:click="removeItem(item)"
                                                    aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </th>
                                            <td><img :src="'storage/app/public/' + item.img" width="45px"></td>
                                            <td v-html="item.name"> </td>
                                            <td>
                                                <div class="container">
                                                    <div class="row">
                                                        <div class="col-md-4 d-flex justify-content-center">
                                                        <a href="#" class="badge badge-light minus-goods" v-on:click="minusGoods(index)">-</a>
                                                        </div>
                                                        <div class="col-md-4 d-flex justify-content-center">
                                                            <div> {{ item.qty }} </div>
                                                        </div>
                                                        <div class="col-md-4 d-flex justify-content-center">
                                                             <a href="#" class="badge badge-light plus-goods" v-on:click="plusGoods(index)" >+</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{{ item.cost }} ??????</td>
                                        </tr>
                                        <tr v-for="(item, index) in tradeItem">
                                        <th scope="row">
                                            <button
                                                type="button"
                                                style="float: left"
                                                class="del-goods close"
                                                ata-dismiss="alert"
                                                v-on:click="removeItem(item,'trade')"
                                                aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </th>
                                        <td></td>
                                        <td v-html="item.name"> </td>
                                        <td>
                                            <span class="badge badge-primary">??????????</span>
                                        </td>
                                        <td>{{ item.cost }} ??????</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-md-3 d-none d-md-flex mt-4 justify-content-center">
                        <div class="card" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">{{ Total | formatCurrency}}  ??????</h5>
                                <p class="card-text"></p>
                                <button class="btn btn-primary btn-lg send-email" type="submit" @click.prevent="validate()">????????????????</button>
                            </div>
                        </div>
                    </div>
                </div>
                </shopping-cart>
                <div class="row">
                    <div class="col-md-9 col-xl-9 col-sm-12">
                        <form class="needs-validation" id="validated-form" novalidate>
                            <div class="container">
                                <div class="form-group">
                                    <label for="ename">?????? ??????????????</label>
                                    <input type="text" class="form-control" id="ename"  placeholder="?????? ??????????????" v-model="ename" value="" required>
                                    <div class="valid-feedback">
                                        ?????????????? ?????? ??????????????!
                                    </div>
                                    <span class="text-danger" v-if="validationErrors.ename" style="width: 100%;" v-text="validationErrors.ename"></span>
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="text" class="form-control" id="email" placeholder="Email" v-model="email" value="" required>
                                    <div class="valid-feedback">
                                        ?????????????? email!
                                    </div>
                                    <span class="text-danger" v-if="validationErrors.email" style="width: 100%;" v-text="validationErrors.email"></span>
                                </div>
                                <div class="form-group">
                                    <label for="ephone">??????????????</label>
                                    <input type="number" class="form-control"  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" id="ephone" v-model="ephone" placeholder="??????????????" value="" required>
                                    <div class="valid-feedback">
                                        ?????????????? ??????????????!
                                    </div>
                                    <span class="text-danger" v-if="validationErrors.ephone" style="width: 100%;" v-text="validationErrors.ephone"></span>
                                </div>
                                <div class="form-group">
                                    <label for="selectedWayToPay">???????????? ????????????</label>
                                    <select id="selectedWayToPay" class="form-control" v-model="selectedWayToPay" placeholder=""
                                        required
                                    >
                                        <option value="">???????????????? ???????????? ????????????</option>
                                        <option v-for="Pay in ToPay" :value="Pay.value">{{ Pay.label }}</option>
                                        <div slot="no-options">????????????????, ???????? ???????????? ?????????????? ????????????.</div>
                                    </select>
                                    <span class="text-danger" v-if="validationErrors.selectedWayToPay" style="width: 100%;" v-text="validationErrors.selectedWayToPay"></span>
                                </div>
                                <div class="form-group">
                                    <label for="selectedDelivery">????????????????</label>
                                    <select id="selectedDelivery" class="form-control" v-model="selectedDelivery"
                                        placeholder="???????????????? ???????????? ????????????????"
                                        required
                                    >
                                        <option value="">???????????????? ???????????? ????????????????</option>
                                        <option v-for="Deliv in Delivery" :value="Deliv.value">{{ Deliv.label }}</option>
                                    </select>
                                    <span class="text-danger" v-if="validationErrors.selectedDelivery" style="width: 100%;" v-text="validationErrors.selectedDelivery"></span>
                                </div>
                                <div class="form-group" v-if="
                                    Deliver == 'new_post_courier' ||
                                    Deliver == 'new_post_warehouse'"
                                >
                                    <label for="selectCity">??????????</label>
                                    <v-select
                                        v-model="selectCity"
                                        label="name"
                                        :filterable="false"
                                        :options="options"
                                        @search="onSearch"
                                        placeholder="???????????????? ???????????????? ????????????"
                                    >
                                        <template #search="{attributes, events}">
                                            <input
                                                class="vs__search"
                                                :required="!selectCity"
                                                v-bind="attributes"
                                                v-on="events"
                                                id="present"
                                            />
                                        </template>

                                        <template slot="no-options">
                                            ?????????????? ???????????????? ?????????????????????? ????????????
                                        </template>
                                        <template slot="option" slot-scope="option">
                                            <div class="d-center">
                                                {{ option.Present }}
                                            </div>
                                        </template>
                                        <template slot="selected-option" slot-scope="option">
                                            <div class="selected d-center">
                                                {{ option.Present }}
                                            </div>
                                        </template>
                                    </v-select>
                                    <span class="text-danger" v-if="validationErrors.present" style="width: 100%;" v-text="validationErrors.present"></span>
                                </div>

                                <div class="form-group" v-if="
                                    Deliver == 'pickup' ||
                                    Deliver == 'new_post_courier'"
                                >
                                    <label for="adress_delivery">???????????? ????????????????</label>
                                    <input type="text" class="form-control" name="adress_delivery" v-model="adress_delivery" id="adress_delivery" placeholder="???????????? ????????????" value="" >
                                    <div class="valid-feedback">
                                        ?????????????? ???????????? ????????????????!!!
                                    </div>
                                    <span class="text-danger" v-if="validationErrors.adress_delivery" style="width: 100%;" v-text="validationErrors.adress_delivery"></span>
                                </div>
                                <div class="form-group" v-if="Deliver == 'new_post_warehouse'">
                                    <label for="newPoshtaPlace">?????????????????? ??????????</label>
                                    <v-select
                                        v-model="newPoshtaPlace"
                                        placeholder="???????????????? ?????????????????? ??????????"
                                        :filterable="true"
                                        :searchable="true"
                                        :clearSearchOnSelect="true"
                                        :options="poshtaPlace"
                                    >
                                        <template #search="{attributes, events}">
                                            <input
                                                class="vs__search"
                                                :required="!newPoshtaPlace"
                                                v-bind="attributes"
                                                v-on="events"
                                                id="delivery"
                                            />
                                        </template>
                                        <template slot="option" slot-scope="option">
                                            <div class="d-center">
                                                {{ option.DescriptionRu }}
                                            </div>
                                        </template>
                                        <template slot="selected-option" slot-scope="option">
                                            <div class="selected d-center">
                                                {{ option.DescriptionRu }}
                                            </div>
                                        </template>
                                        <div slot="no-options">???????????????? ???????????? ?????????? ??????????????????.</div>
                                    </v-select>
                                    <span class="text-danger" v-if="validationErrors.delivery" style="width: 100%;" v-text="validationErrors.delivery"></span>
                                </div>
                                <div class="alert alert-danger" role="alert" v-if="selectedWayToPay == 'pay_online'">
                                     ???? ?????????????????????? ???????????????? ???? ???? ?????????? ?????????????????? ???????????? ???????????? , ???????? ???? ???????????? ???????????????? ?????????? ???????????? ???????????????? ???????????? ???????????? ??????????????????!
                                </div>
                                <div class="text-cart" >
                                    <p>*?????????????????? ???? ?????? <a href="https://www.instagram.com/icider.com.ua/">Instagram</a> ?? ???????????? ?????????????? ?????? ???????????? ????????????.</p>
                                </div>
                            </div>
                        </form>
                    <div class="form-group">
                        <div style="display:none" v-html="formLiq"></div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="container">
                        <div class="card col-md-12 d-flex d-md-none mt-4 mb-4 justify-content-center shadow-sm">
                            <div class="card-body">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-12 d-flex justify-content-center" v-bind:class="{ 'col-sm-4': newPoshtaPlace }">
                                            <div>
                                                <h5 class="card-title">{{total | formatCurrency}}  ??????</h5>
                                                <p class="card-text"></p>
                                                <button class="btn btn-primary btn-lg send-email" type="submit" @click.prevent="validate()">????????????????</button>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-8 left-line" v-if="newPoshtaPlace">
                                            <div class="ml-3 container">
                                                <div class="row dropdown__header" @click="toggleDropdown($event)">
                                                    <div class="col-md-12">
                                                        <p class="font-weight-ligh text-center"
                                                            style="margin-bottom: .75em;font-size:.75em"

                                                        >
                                                            ?????????????? ???????????? ?????????????????? <span class="dot"><i class="arrow down"></i></span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="dropdown__content">
                                                    <div class="row">
                                                        <p class="font-weight-light text-info">
                                                            <span class="badge badge-primary">????????????: </span>
                                                            {{ schedule_schedule }}
                                                        </p>
                                                    </div>
                                                    <div class="row">
                                                        <p class="font-weight-light text-info">
                                                            <span class="badge badge-primary">????????????: </span>
                                                            {{  schedule_reception }}
                                                        </p>
                                                    </div>
                                                    <div class="row">
                                                        <p class="font-weight-light text-info">
                                                            <span class="badge badge-primary">????????????????: </span>
                                                                {{ schedule_delivery }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    `,
    data () {
        return {

            apiKey:'66a59d1b641c39caa601c03bd09dace1',
            goods:{},
            options:[],

            ename: null,
            email: null,
            ephone: null,

            //cart items
            productItems: [],
            tradeItems: [],
            batteryItems: [],
            cart: {},
            productItem:{},
            tradeItem: [],
            batteryItem: [],

            cartDelivery:[],
            trade: {},
            empty: `<tr><td colspan="5">?????????????? ??????????</td></tr>`,
            addresses: [],
            validationErrors: {
                ename: null,
                email: null,
                ephone: null,
                present: null,
                delivery: null,
                selectedDelivery:null,
                adress_delivery: null,
                selectedWayToPay:null,
            },
            validation: false,
            poshtaPlace:[],
            adress_delivery: "",
            selectCity: "",
            total: "",

            formLiq:"",
            //schedule
            schedule_delivery: "",
            schedule_schedule: "",
            schedule_reception: "",

            Deliver: "",
            selectedDelivery: "",
            selectedWayToPay: "",

            newPoshtaPlace: "",
            form: {
                ename: null,
                email: null,
                ephone: null,
                present: null,
                delivery: null,
                selectedDelivery: null,
                adress_delivery: null,
                selectedWayToPay:null,
                cart: this.cart
            },
            Delivery:[
                {label: '?????????????????????? ????????????', value: 'new_post_warehouse'},
                {label: '???????? ?????????? (????????????)', value: 'new_post_courier'},
                {label: '??????????????????', value: 'pickup'}
            ],
            ToPay:[
                {label: '???????????????????? ????????????', value: 'cash_delivery'},
                {label: '??????????????????', value: 'cash'},
                {label: '???????????? ????????????', value: 'pay_online'}
            ],
            sendValid: false

        }
    },

    created: function () {
        this.urlplace = window.location.pathname;
        let _this = this;
        let _goods = _this.goods;
        let _cart = _this.cart;
        let _trade = _this.trade;
        let pathname = window.location.pathname;
        let _origin = ''
        _origin = _origin + '/api/product';

        fetch(_origin).then(
            response => response.json()
        ).then(json => {
            _this.goods['product'] = json;
            console.log(json);
            this.loadCart();
        }).catch(function () {
            this.dataError = true;
        });
        _cart = JSON.parse(localStorage.getItem('product'));
        _trade = JSON.parse(localStorage.getItem('trade'));
        let out = 0;
        for (let key in _cart) {
            out += _cart[key];
        }
        if(_trade){
            out++;
        }
        this.html('.ac-gn-bag-badge',out);
    },
    methods: {

        html: function(el,html) {
            let element = document.querySelector(el);
            if (element) { document.querySelector(el).innerHTML = html; }
        },
        toggleDropdown (event) {
            event.currentTarget.classList.toggle('is-active')
        },
        onGet(search, loading) {
            loading(true);
            let uri = "https://api.novaposhta.ua/v2.0/json/Address/searchSettlements";
            let data = {
                "modelName": "Address",
                "calledMethod": "getCities",
                "apiKey": this.apiKey

            };
            data.FindByString = search ? search : "????????";

            this.search(loading, data, this, uri);
        },
        delAllGoods() {
            //?????????????? ?????????? ???? ??????????????
            if(this.cart['trade']){
                delete this.cart['trade'];
                localStorage.removeItem('trade');
                this.saveCart();
            }
            if(this.cart['product']) {
                delete this.cart['product'];
                localStorage.removeItem('product');
                this.saveCart();
            }
        },
        loadCart() {
            let _cart = this.cart;
            let _goods = this.goods;
            //???????????????? ???????? ???? ?? localStorage ???????????? cart
            if (localStorage.getItem('product') ||
                localStorage.getItem('trade') ||
                localStorage.getItem('change_battery')
            )
            {
                // ???????? ???????? - ???????????????????????????? ?? ?????????????????? ?? ???????????????????? cart
                _cart['product'] = JSON.parse(localStorage.getItem('product'));
                _cart['trade'] = JSON.parse(localStorage.getItem('trade'));
                _cart['change_battery'] = JSON.parse(localStorage.getItem('change_battery'));
                console.log(_cart)
            } else if (localStorage.getItem('product')) {
                _cart['product'] = JSON.parse(localStorage.getItem('product'));
            } else {
                this.html('.main-cart',empty);
            }
            for (let item in _cart['product']) {
                _goods['product'][item].qty = _cart['product'][item];
                _goods['product'][item].id = item;
                this.productItems.push(Vue.util.extend({}, _goods['product'][item]));

            }
            for (let item in _cart['trade']) {
                _goods['trade'][item].id = item;
                _goods['trade'][item].cost = this.goods['trade'][item].size[_cart['trade'][item]];
                _goods['trade'][item].size = _cart['trade'][item];
                this.tradeItems.push(Vue.util.extend({},_goods['trade'][item]));
            }
            this.form.cart = _cart;

        },
        isEmpty(object) {
            return JSON.stringify(object) == "{}";
        },
        send(){
            if(!this.isEmpty(this.cart['product'])&& !this.isEmpty(this.cart['trade'])){
                VueSwal.fire({
                    title: '????????????!',
                    text: '???????? ???????????? ?? ????????????',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    footer: '<a href="https://icider.com.ua/">???????????????? ?????????? ?? ??????????????!</a>'

                });
            } else {
                fetch(
                    "/api/telegram",
                    {
                        method: 'post',
                        body: JSON.stringify(this.form),

                    }
                ).then((response) => response.text()).then(
                    (responseData) => {
                        if(responseData == "sent") {
                            console.log(responseData);
                            Swal.fire({
                                icon: 'success',
                                title: '?????????? ?????? ?????????????????? ?? ??????????????????!',
                                showConfirmButton: false,
                                timer: 1500
                            })

                            if(this.selectedWayToPay != "pay_online") {
                                let timerInterval
                                Swal.fire({
                                    icon: 'success',
                                    html: '?????????? ?????? ?????????????????? ?? ??????????????????!',
                                    timer: 2000,
                                    timerProgressBar: true,
                                    onBeforeOpen: () => {
                                        Swal.showLoading()
                                        timerInterval = setInterval(() => {
                                            const content = Swal.getContent()
                                            if (content) {
                                                const b = content.querySelector('b')
                                                if (b) {
                                                    b.textContent = Swal.getTimerLeft()
                                                }
                                            }
                                            window.location.replace("/");
                                        }, 100)
                                    },
                                    onClose: () => {
                                        clearInterval(timerInterval)
                                        window.location.replace("/");
                                    }
                                }).then((result) => {
                                    /* Read more about handling dismissals below */
                                    if (result.dismiss === Swal.DismissReason.timer) {
                                        console.log('I was closed by the timer')
                                    }
                                })
                            }
                        } else {
                            console.log(responseData);
                            this.formLiq = responseData;
                            if(this.formLiq){
                                this.submitAuto();
                            }
                        }
                    }
                )
            }

        },
        onSearch(search, loading) {
            loading(true);
            let uri = "https://api.novaposhta.ua/v2.0/json/Address/searchSettlements/";
            let data = {
                "modelName": "Address",
                "calledMethod": "searchSettlements",
                "apiKey": this.apiKey,
                "methodProperties": {
                    "CityName": /^[\u0400-\u04FF]+$/.test(search) ? search.length > 0 ? search : "????????" : "????????",
                    "Limit": 5
                }
            };
            this.search(loading, data, this, uri);
        },
        search: _.debounce((loading, data, vm, uri) => {
            fetch(
                uri,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: {'data': JSON.stringify(data)},
                }
            ).then(res => res.json()).then(
                options => vm.options = options.data[0].Addresses
            )
                .catch(error => console.log(error));
            loading(false)
        }, 350),
        fetchAll(data, uri, vm){
            return fetch(
                uri,
                {
                    method: 'post',
                    body: JSON.stringify(data),
                }
            ).then(res => res.json()).then(
                options => vm.poshtaPlace = options.data,

            )
                .catch(error => console.log(error));
        },
        submitAuto(){
            setTimeout(function(){
                return  document.getElementById('sendLiqpay') ? document.getElementById('sendLiqpay').submit(): ''
            },1000)
        },
        validate() {
            if(this.$root.validateForm()){
                if(this.sendValid) {
                    this.send();
                    this.delAllGoods();
                }
            }
        },
        validateForm (formId = 'validated-form', errorObjectName = 'validationErrors') {
            var nodes = document.querySelectorAll(`#${formId} :invalid`);
            let nodesFpr = document.querySelectorAll(`#${formId}`)[0].elements;

            var vm = this; //current vue instance;
            Object.keys(this[errorObjectName]).forEach(key => {
                this[errorObjectName][key] = null
            });
            if (nodes.length > 0) {
                nodes.forEach(node => {
                    if (node.title) {
                        this[errorObjectName][node.id] = node.title;
                    } else {
                        this[errorObjectName][node.id] = node.validationMessage;
                    }
                    node.addEventListener('change', function (e) {
                        vm.validateForm(formId, errorObjectName);
                    });
                });
                this.sendValid = false;

            } else if(nodes.length == 0) {
                this.sendValid = true;
            } else {
                this.sendValid = false;
            }
            return true;
        },
        delGoods:function(id) {
            //?????????????? ?????????? ???? ??????????????
            if(id == 'trade'){
                delete this.cart['trade'];
                localStorage.removeItem('trade');
                this.saveCart();
            } else {
                delete this.cart['product'][id];
                this.saveCart();
            }
        },
        plusGoods:function(id) {
            this.cart['product'][id]++;
            this.saveCart();
        },
        minusGoods:function(id) {
            //?????????????????? ?????????? ?? ??????????????
            if (this.cart['product'][id]==1) {
                delete this.cart['product'][id];
            }
            else {
                this.cart['product'][id]--;
            }
            this.saveCart();
        },
        saveCart() {
            //???????????????? ?????????????? ?? localStorage
            if(localStorage.getItem('product')) {
                localStorage.setItem('product', JSON.stringify(this.cart['product'])); //?????????????? ?? ????????????
            }
            if(localStorage.getItem('trade')){
                localStorage.setItem('trade', JSON.stringify(this.cart['trade'])); //?????????????? ?? ????????????
            }
        },
        isEmpty(object) {
            //???????????????? ?????????????? ???? ??????????????
            for (var key in object)
                if (object.hasOwnProperty(key)) return true;
            return false;
        },
        nameDayTranslate(name) {
            switch (name) {
                case 'Monday':
                    return '????';
                case 'Tuesday':
                    return '????';
                case  'Wednesday':
                    return '????';
                case  'Thursday':
                    return '????';
                case  'Friday':
                    return '????';
                case 'Saturday':
                    return '????';
                case 'Sunday':
                    return '????';
                default:
                    break;
            }
        },
        valuesFilter(values){
            return Object.values(values).filter(function(value, index, self) {
                return self.indexOf(value.trim()) === index;
            });
        },
        currentDays(deliveryTime, newPoshtaPlace){
            let info = '';

            for(let place in newPoshtaPlace) {
                for(let day in deliveryTime) {
                    if(deliveryTime[day] == newPoshtaPlace[place]){
                        info += " "+ this.nameDayTranslate(day) + ", ";
                    }
                }
                info += "("+newPoshtaPlace[place]+")";
            }
            return info;
        }
    },
    watch: {
        ename: function(){
            this.form.ename = this.ename ? this.ename : "";
        },
        email: function(){
            this.form.email = this.email ? this.email: "";

        },
        ephone: function(){
            this.form.ephone = this.ephone ? this.ephone: "";

        },
        adress_delivery: function() {
            this.adress_delivery = this.adress_delivery ? this.adress_delivery: "";
            this.form.adress_delivery = this.adress_delivery ? this.adress_delivery: "";
        },
        selectCity: function() {
            this.form.present = this.selectCity ? this.selectCity.Present : "";
            this.selectCity = this.selectCity ? this.selectCity : "";
            if(this.selectCity) {
                let data = {
                    "modelName": "AddressGeneral",
                    "calledMethod": "getWarehouses",
                    "methodProperties": {
                        "Language": "ru",
                        "CityRef": this.selectCity.DeliveryCity
                    },
                    "apiKey": this.apiKey
                };
                let url = " https://api.novaposhta.ua/v2.0/json/AddressGeneral/getWarehouses";
                this.fetchAll(data, url,  this);
            } else {
                this.poshtaPlace = [];
                this.newPoshtaPlace = "";
            }
        },
        selectedDelivery: function() {
            this.Deliver = this.selectedDelivery ? this.selectedDelivery ? this.selectedDelivery : "" : "";
            this.form.selectedDelivery =  this.selectedDelivery ? this.selectedDelivery : "";

            this.form.present = "";
            this.form.adress_delivery =  "";
            this.selectCity = "";
            this.delivery = "";
            this.adress_delivery =  "";
        },
        selectedWayToPay: function() {
            this.form.selectedWayToPay = this.selectedWayToPay ? this.selectedWayToPay : "";
        },
        newPoshtaPlace: function() {
            this.form.delivery = this.newPoshtaPlace ? this.newPoshtaPlace.DescriptionRu: "";
            if(this.newPoshtaPlace == null){
                this.newPoshtaPlace = "";
            } else {
                this.validationErrors.delivery = null;
                this.schedule_delivery = this.newPoshtaPlace ? this.currentDays(this.newPoshtaPlace.Delivery, this.valuesFilter(this.newPoshtaPlace.Delivery)) : '';
                this.schedule_schedule = this.newPoshtaPlace ? this.currentDays(this.newPoshtaPlace.Schedule, this.valuesFilter(this.newPoshtaPlace.Schedule)) : '';
                this.schedule_reception = this.newPoshtaPlace ? this.currentDays(this.newPoshtaPlace.Reception, this.valuesFilter(this.newPoshtaPlace.Reception)) : '';
            }
        },
        Total: function() {
            return this.total
        },

    },
})
