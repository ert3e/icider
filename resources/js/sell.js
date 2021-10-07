new Vue({
    el: '#app',
    template: `
    <form id="validated-form">
        <div class="form-row justify-content-center">
            <div v-if="urlplace === '/trade'" class="form-group col-md-6">
                <label for="phone">Телефон:</label>
                <select v-model="selectedPhone" id="phone" placeholder="Выберите телефон" class="form-control form-control-lg">
                    <option value="">Выберите телефон</option>
                    <option v-for="(obj, phone) in places" :value="phone">{{obj.name}}</option>
                </select>
            </div>
            <div v-if="urlplace === '/change-battery'" class="form-group col-md-6">
                <label for="phone">Телефон:</label>
                <select v-model="selectedPhone" id="phone" placeholder="Выберите телефон" class="form-control form-control-lg">
                    <option value="">Выберите телефон</option>
                    <option v-for="(obj, phone) in change" :value="phone">{{obj.name}}</option>
                </select>
            </div>
            <div v-if="urlplace === '/display-service'" class="form-group col-md-6">
                <label for="phone">Телефон:</label>
                <select v-model="selectedPhone" id="phone" placeholder="Выберите телефон" class="form-control form-control-lg">
                    <option value="">Выберите телефон</option>
                    <option v-for="(obj, phone) in akb" :value="phone">{{obj.name}}</option>
                </select>
            </div>
            <div v-if="urlplace === '/trade'" class="form-group col-md-6">
                <label for="memory">Память:</label>
                <select :disabled="memori.length == 0" id="memory" v-model="selectedMemory" class="form-control form-control-lg">
                    <option value="">Выберите обьем памяти</option>
                    <option v-for="(obj, memory) in memori.size" :value="memory">{{memory}}</option>
                </select>
            </div>
        </div>
        <div v-if="urlplace === '/display-service' && selectedPhone" class="container">
            <div class="row justify-content-md-center">
                <div class="form-group col-md-6">
                    <label for="selectedChange">Что заменить:</label>
                    <select v-model="selectedChange" id="selectedChange" placeholder="Что заменить?" class="form-control form-control-lg">
                        <option value="">На замену</option>
                        <option value="glass">Разбитое стекло</option>
                        <option value="screen">Дисплей не работает</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="form-group">
                <h3 class="text-center">
                    <p style="float:left">{{price ? price : 0}}</p>
                    <p style="float:left">грн</p>
                </h3>
            </div>
        </div>
        <div v-if="urlplace === '/display-service' && price != 0" class="container">
            <div class="row justify-content-md-center">
                <div class="form-group col-md-6">
                    <label for="name">Имя</label>
                        <input id="name" type="text" class="form-control form-control-lg" name="name" v-model="form.name" placeholder="Имя"  required>
                        <span class="text-danger" v-if="validationErrors.phone" style="width: 100%;" v-text="validationErrors.name"></span>
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <div class="form-group col-md-6">
                        <label for="phone">Телефон</label>
                        <input type="number" class="form-control form-control-lg" name="phone" id="phone" v-model="form.phone" placeholder="Телефон" title="Введите номер" required>
                        <span class="text-danger" v-if="validationErrors.phone" style="width: 100%;" v-text="validationErrors.phone"></span>
                    </div>
                </div>
                <div class="row justify-content-md-center">
                    <div class="form-group col-md-6">
                        <label for="comment">Коментарий</label>
                        <textarea  type="text" class="form-control form-control-lg" id="comment" name="comment" v-model="form.comment" placeholder="Коментарий" ></textarea>
                        <span class="text-danger" v-if="validationErrors.comment" style="width: 100%;" v-text="validationErrors.comment"></span>
                    </div>
                </div>
            </div>
        <div v-if="urlplace === '/change-battery' && price != 0" class="container">
            <div class="row justify-content-md-center">
                <div class="form-group col-md-6">
                    <label for="name">Имя</label>
                        <input id="name" type="text" class="form-control form-control-lg" name="name" v-model="form.name" placeholder="Имя"  required>
                        <span class="text-danger" v-if="validationErrors.phone" style="width: 100%;" v-text="validationErrors.name"></span>
                    </div>
                </div>
            <div class="row justify-content-md-center">
                <div class="form-group col-md-6">
                    <label for="phone">Телефон</label>
                    <input type="number" class="form-control form-control-lg" name="phone" id="phone" v-model="form.phone" placeholder="Телефон" title="Введите номер" required>
                    <span class="text-danger" v-if="validationErrors.phone" style="width: 100%;" v-text="validationErrors.phone"></span>
                </div>
            </div>
            <div class="row justify-content-md-center">
                <div class="form-group col-md-6">
                    <label for="comment">Коментарий</label>
                    <textarea  type="text" class="form-control form-control-lg" id="comment" name="comment" v-model="form.comment" placeholder="Коментарий" ></textarea>
                    <span class="text-danger" v-if="validationErrors.comment" style="width: 100%;" v-text="validationErrors.comment"></span>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <button href="#" role="button" class="button add-to-cart"  v-on:click="add" @click.prevent="validateForm()" :disabled='isDisabled'>Купить</button>
        </div>
    </form>
    `,
      data () {
        return {
            places: [],
            memori: [],
            change: [],

            akb: [],

            price: 0,
            phones: [],

            selectedPhone: "",
            selectedMemory: "",
            selectedChange: "",

            terms: false,
            cart:{},
            phoneValue:[],
            urlplace:"",
            change_battery:[],
            validationErrors: {
                name: null,
                phone: null
            },
            form: {
                name: "",
                phone: "",
                comment: ""
            },
            validation: false

        }
    },
    created: function () {
        this.urlplace = window.location.pathname;
        var _this = this;
        $.getJSON('goods.json', function (json) {
                _this.change = json.change_battery;
                _this.akb = json.akb_change;
                _this.places = json.trade;

        });
        console.log(this.urlplace);
           cart = JSON.parse(localStorage.getItem('product'));
           trade = JSON.parse(localStorage.getItem('trade'));
           var out = 0;
           for (var key in cart) {
               out += cart[key];
           }

           if(trade){
               out++;
           }
           $('.ac-gn-bag-badge').html(out);
    },
    methods: {
        validateForm (formId = 'validated-form', errorObjectName = 'validationErrors') {
            var nodes = document.querySelectorAll(`#${formId} :invalid`);
            var vm = this; //current vue instance;
            console.log(vm);
            Object.keys(this[errorObjectName]).forEach(key => {
                this[errorObjectName][key] = null
            });
            if (nodes.length > 0) {
                nodes.forEach(node => {
                    if (node.title) {
                        this[errorObjectName][node.name] = node.title;
                    }
                    else {
                        this[errorObjectName][node.name] = node.validationMessage;
                    }
                    node.addEventListener('change', function (e) {
                        vm.validateForm(formId, errorObjectName);
                    });
                });
                this.validation = false;
                return false;
            }
            else {
                this.validation = true;
                return true;
            }
        },
        postMethod(){
            $.post(
                "/api/telegram",
            {
                "change" : this.selectedChange,
                "name" : this.form.name,
                "phone" : this.form.phone,
                "comment" : this.form.comment,
                "phone_mark" : this.memori.name,
                "price" : this.price
            },
            function(data){
                    if (data==1) {
                        localStorage.clear();
                        $("#alertCart").removeClass('d-none');
                        $("#alertCart").removeClass('fade');

                    }
                }
            );
        },
        add: function (event) {
            if(this.urlplace === '/trade') {
                this.cart[this.selectedPhone] = this.selectedMemory;
                localStorage.setItem('trade', JSON.stringify(this.cart));
                $("#buttonAlert").removeClass('d-none');
                $("#buttonAlert").addClass('show');
                setTimeout(function () {
                    $("#buttonAlert").removeClass('show');
                    $("#buttonAlert").addClass('d-none');
                },7000);
            } else {
                if(this.validateForm() && this.urlplace === '/change-battery'){
                    this.postMethod()
                    $("#buttonAlert").removeClass('d-none');
                    $("#buttonAlert").addClass('show');
                    this.price = 0;
                    this.memori = [];
                    this.form.phone = "";
                    this.form.name = "";
                    this.form.comment = "";
                    this.selectedPhone = "";
                }
                if(this.validateForm() && this.urlplace === '/display-service'){
                    this.postMethod()
                    $("#buttonAlert").removeClass('d-none');
                    $("#buttonAlert").addClass('show');
                    this.price = 0;
                    this.memori = [];
                    this.form.phone = "";
                    this.form.name = "";
                    this.form.comment = "";
                    this.selectedPhone = "";
                    this.selectedChange  = "";
                }
            }
        }
    },
    watch: {
        selectedPhone: function() {
            this.memori = [];
            this.phones = [];
            this.selectedMemory = "";
            if (this.selectedPhone.length > 0) {
                this.memori = this.places[this.selectedPhone]
            }
            if(this.urlplace == '/change-battery'){
                price = this.change[this.selectedPhone] ?  this.change[this.selectedPhone].price : 0;
                this.terms =  price ?  true : false;
                this.price = parseInt(price).toLocaleString('ru-RU');
            }
        },
        selectedChange: function() {
         let _selectedChange = this.selectedChange;
            if(this.urlplace == '/display-service'){
                price = this.akb[this.selectedPhone][_selectedChange] ? this.akb[this.selectedPhone][_selectedChange] : 0;
                console.log(price);
                this.terms =  price ?  true : false;
                this.price = parseInt(price).toLocaleString('ru-RU');
            }
        },
        selectedMemory: function() {
            this.phones = [];
            this.terms = true;
            price = this.selectedMemory ?  this.places[this.selectedPhone].size[this.selectedMemory] : 0;
            this.price =  parseInt(price).toLocaleString('ru-RU');
        }
    },
    computed: {
        isDisabled: function(){
          return !this.terms;
      }
    }
})
