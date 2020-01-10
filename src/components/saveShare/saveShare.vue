<template>
    <div class="saveShare">

        <b-badge
                :variant="type"
                @click="save"
        >
            {{ title }}

        </b-badge>
    </div>
</template>

<script>
    export default {
        name: "saveShare",
        props: {
            type: {
                type: String
            },
            title: {
                type: String
            }
        },
        methods: {
            save: function () {
                this.$store.dispatch("saveData");
            }
        }
    }
</script>


<style lang="scss">
    @import "./saveShare.scss";
</style>