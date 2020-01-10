<template>
    <div class="addParticiant">
        <div class="addParticiant__headline">
            <b-badge
                    variant="success"
                    @click="showForm"
            >
                {{ title }}

            </b-badge>
            <b-button-close
                    @click="hideForm"
                    v-if="formStatus"/>
        </div>
        <div class="addParticiantForm" v-if="formStatus">
            <b-form-input
                    v-model="name"
                    placeholder="Name"
                    type="text"
                    @keypress.enter="addParticiant"
            >
            </b-form-input>
            <b-button
                    variant="success"
                    @click="addParticiant"
            >
                Hinzufügen
            </b-button>

        </div>
    </div>

</template>

<script>
    import {particiantClass} from "@/objects";

    export default {
        data: function () {
            return {
                formStatus: true,
                name: ''
            }
        },
        props: {
            title: {
                type: String
            }
        },
        methods: {
            showForm: function () {
                this.formStatus = true
            },
            hideForm: function () {
                this.formStatus = false;
            },
            addParticiant: function () {
                this.$emit('createparticiant', new particiantClass(this.name))
            }
        }
    };
</script>

<style lang="scss">
    @import "./_addParticiant.scss";
</style>
