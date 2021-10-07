<template>
    <dl class="accordion box" role="presentation">
        <accordion-item
            v-for="item in content"
            :multiple="multiple"
            :item="item"
            :groupId="groupId"
            :key="item.id">
        </accordion-item>
    </dl>
</template>

<script>
    export default {
        name: "AccordionFooter",
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
        mounted() {
            this.groupId = this.$el.id
        }

    }
</script>

<style scoped>

</style>
