Vue.component("v-select", VueSelect.VueSelect);

function formatNumber(n, c, d, t){
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d === undefined ? '.' : d,
        t = t === undefined ? ',' : t,
        s = n < 0 ? '-' : '',
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
};

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
})

var init = new Vue({
    el: '#app',
    template:
        `
        <div class="text-center">
            <form class="needs-validation form-send" id="validated-form" novalidate>
                <div class="form-group">
                    <label for="lid_name" class="sr-only">Имя Фамилия</label>
                    <input type="text" class="form-control" id="lid_name"  placeholder="Имя Фамилия" v-model="lid_name" value="" required>
                    <div class="valid-feedback">
                        Введите Имя Фамилию!
                     </div>
                    <span class="text-danger" v-if="validationErrors.lid_name" style="width: 100%;" v-text="validationErrors.lid_name"></span>
                </div>
                <div class="form-group">
                    <label for="lid_phone" class="sr-only">Телефон</label>
                    <input type="number" class="form-control"  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" id="lid_phone" v-model="lid_phone" placeholder="Телефон" value="" required>
                    <div class="valid-feedback">
                        Введите телефон!
                    </div>
                    <span class="text-danger" v-if="validationErrors.lid_phone" style="width: 100%;" v-text="validationErrors.lid_phone"></span>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-lg send-email" type="submit" @click.prevent="validate()">Отправить</button>
                </div>
            </form>
        </div>
    `,
    data () {
        return {
            lid_name: null,
            email: null,
            lid_phone: null,
            //cart items

            addresses: [],
            validationErrors: {
                lid_name: null,
                lid_phone: null
            },
            validation: false,


            newPoshtaPlace: "",
            form: {
                lid_name: null,
                lid_phone: null
            },
        }
    },
    methods: {
        send(){
            fetch(
                "/api/telegram",
                {
                    method: 'post',
                    body: JSON.stringify(this.form),
                }
            ).then((response) => response.text()).then(
                    (responseData) => {
                    console.log(responseData);
                    Swal.fire({
                        icon: 'success',
                        title: 'Заказ был отправлен в обработку!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            )
        },
        validate() {
            if(this.$root.validateForm()){
                if(this.sendValid) {
                    this.send();
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

    },
    watch: {
        lid_name: function(){
            this.form.lid_name = this.lid_name ? this.lid_name : "";
        },

        lid_phone: function(){
            this.form.lid_phone = this.lid_phone ? this.lid_phone: "";

        },

    },
})
