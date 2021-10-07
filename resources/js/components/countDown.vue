<template>
    <ul class="vuejs-countdown">
        <li v-if="days > 0">
            <p class="digit">{{ days | twoDigits }}</p>
            <p class="text">{{ days > 1 ? 'дней' : 'день' }}</p>
        </li>
        <li>
            <p class="digit">{{ hours | twoDigits }}</p>
            <p class="text">{{ hours > 1 ? 'часов' : 'час' }}</p>
        </li>
        <li>
            <p class="digit">{{ minutes | twoDigits }}</p>
            <p class="text">Мин</p>
        </li>
        <li>
            <p class="digit">{{ seconds | twoDigits }}</p>
            <p class="text">Сек</p>
        </li>
    </ul>
</template>

<script>
    let interval = null;
    export default {
        name: 'countDown',
        props: {
            deadline: {
                type: String
            },
            end: {
                type: String
            },
            stop: {
                type: Boolean
            }
        },
        data() {
            return {
                now: Math.trunc((new Date()).getTime() / 1000),
                date: null,
                diff: 0
            }
        },
        created() {
            if (!this.deadline && !this.end) {
                throw new Error("Missing props 'deadline' or 'end'");
            }
            let endTime = this.deadline ? this.deadline : this.end;
            this.date = Math.trunc(Date.parse(endTime.replace(/-/g, "/")) / 1000);
            if (!this.date) {
                throw new Error("Invalid props value, correct the 'deadline' or 'end'");
            }
            interval = setInterval(() => {
                this.now = Math.trunc((new Date()).getTime() / 1000);
            }, 1000);
        },
        computed: {
            seconds() {
                return Math.trunc(this.diff) % 60
            },
            minutes() {
                return Math.trunc(this.diff / 60) % 60
            },
            hours() {
                return Math.trunc(this.diff / 60 / 60) % 24
            },
            days() {
                return Math.trunc(this.diff / 60 / 60 / 24)
            }
        },
        watch: {
            now(value) {
                this.diff = this.date - this.now;
                if(this.diff <= 0 || this.stop){
                    this.diff = 0;
                    // Remove interval
                    clearInterval(interval);
                }
            }
        },
        filters: {
            twoDigits(value) {
                if ( value.toString().length <= 1 ) {
                    return '0'+value.toString()
                }
                return value.toString()
            }
        },
        destroyed() {
            clearInterval(interval);
        }
    }
</script>
<style>
    .vuejs-countdown {
        display: block;
        list-style-type: disc;
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 0px;
    }
    .vuejs-countdown li {
        display: inline-block;
        margin: 0 8px;
        text-align: center;
        position: relative;
    }
    .vuejs-countdown li p {
        margin: 0;
    }
    .vuejs-countdown li:after {
        content: ":";
        position: absolute;
        top: 0;
        right: -13px;
        font-size: 32px;
    }
    .vuejs-countdown li:first-of-type {
        margin-left: 0;
    }
    .vuejs-countdown li:last-of-type {
        margin-right: 0;
    }
    .vuejs-countdown li:last-of-type:after {
        content: "";
    }
    .vuejs-countdown .digit {
        font-size: 32px;
        font-weight: 300;
        line-height: 1.4;
        margin-bottom: 0;
    }
    .vuejs-countdown .text {
        text-transform: uppercase;
        margin-bottom: 0;
        font-size: 10px;
    }
</style>
