<template>

</template>

<script>
    export default {
        name: "footer",
        data () {
            example1 :
                [
                    {
                        id: 1,
                        active: false,
                        title: 'Информация',
                        details: `
                                <ul>
                                     <li> <a href="/Shipping-and-payment">Доставка и Оплата</a> </li>
                                     <li> <a href="/order">Умови продажу</a> </li>
                                     <li> <a href="/return">Условия возврата</a> </li>
                                </ul>
                              `
                    },
                    {
                        id: 2,
                        active: false,
                        title: 'Сервис',
                        details: `
                              <ul>
                                  <li> <a class="icon-href" href="/trade"><p>Обмен</p></a></li>
                                  <li> <a class="icon-href" href="/change-battery"><p>Замена аккумулятора</p></a></li>
                                  <li><a class="icon-href" href="/display-service"><p>Ремонт Дисплеев</p></a></li>
                              </ul>
                            `
                    }
                ]
        }
    }
</script>
