<template>
    <div>

        <md-divider />
        <div class="block">
            <h3>String</h3>
            <md-datepicker v-model="string"  :md-open-on-focus="false"
                           :md-immediately="true" />
            <div class="value">value: {{string}}</div>
        </div>
        <md-divider />

        <md-divider />

        <md-divider />

    </div>
</template>

<script>
    import format from 'date-fns/format'
    export default {
        data () {
            let dateFormat = this.$material.locale.dateFormat || 'yyyy-MM-dd'
            let now = new Date()
            return {
                string: format(now, dateFormat),
            }
        },
        computed: {
            dateFormat () {
                return this.$material.locale.dateFormat || 'yyyy-MM-dd'
            },

        },

    }
</script>