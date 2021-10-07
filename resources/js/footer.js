const exampleData1 = [
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
          <li><a class="icon-href" href="/trade"><p>Обмен</p></a></li>
          <li><a class="icon-href" href="/change-battery"><p>Замена аккумулятора</p></a></li>
          <li><a class="icon-href" href="/display-service"><p>Ремонт Дисплеев</p></a></li>
      </ul>
      `
    }
  ]

  Vue.component('accordion', {
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
      <dl class="accordion box" role="presentation">
        <accordion-item
          v-for="item in content"
          :multiple="multiple"
          :item="item"
          :groupId="groupId"
          :key="item.id">
        </accordion-item>
      </dl>
    `,
    mounted() {
      this.groupId = this.$el.id
    }
  })

  Vue.component('accordion-item', {
    props: ['item', 'multiple', 'groupId'],
    template: `
      <div :id="groupId + '-' + item.id" class="accordion-item" :class="{'is-active': item.active}">
        <dt class="accordion-item-title">
          <button @click="toggle" class="accordion-item-trigger">
            <span>{{item.title}}</span>
            <i class="accordion-item-trigger-icon"></i>
          </button>
        </dt>
        <transition
          name="accordion-item"
          @enter="startTransition"
          @after-enter="endTransition"
          @before-leave="startTransition"
          @after-leave="endTransition">
          <dd v-if="item.active" class="accordion-item-details">
            <div v-html="item.details"></div>
          </dd>
        </transition>
      </div>
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
  })

  new Vue({
    el: '#footer1',
    data: {
      example1: exampleData1
    }
  })
