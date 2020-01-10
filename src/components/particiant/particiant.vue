<template>
    <div class="particiant">
        <b-card
                no-body
                class="overflow-hidden"
                bg-variant="secondary"
        >
            <div
                    class="card-header"
                    @click="toggle()"
            >
                <div class="card-header--75">
                    {{ particiant.name }}
                    <b-badge variant="success" v-if="particiant.isActive">
                        nimmt teil
                    </b-badge>
                    <b-badge variant="danger" v-if="!particiant.isActive">
                        nimmt nicht teil
                    </b-badge>

                </div>
                <div class="card-header--25">
                    <b-badge
                            variant="primary"
                            @click.stop="addRow"
                    >
                        Ausgabe hinzufügen
                    </b-badge>
                </div>
            </div>
            <b-row no-gutters v-show="particiant.isActive">
                <b-col md="12">
                    <b-card-body>

                        <template v-for="amount in particiant.amounts">
                            <template>
                                    <amount
                                            :key="amount.id"
                                            :placeholder=placeholderConcat
                                            :amount="amount"
                                            @amountchanged="updateParticiant"
                                            @amount_removed="removeAmount"
                                    />
                            </template>

                        </template>

                        <div :key="transaction.amount" v-for="transaction in particiant.transactions">
                            <payflow :transaction="transaction"/>
                        </div>

                    </b-card-body>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>

    import amount from "@/components/amount/amount";
    import Payflow from "@/components/payflow/payflow";
    import {amountClass} from "@/objects";

    export default {
        components: {
            Payflow,
            amount: amount,
        },
        props: {
            particiant: {
                type: Object,
            }
        },
        methods: {
            toggle: function () {
                this.particiant.isActive = !this.particiant.isActive;
                this.$emit('particiantchanged')
            },
            updateParticiant: function () {
                this.particiant.updateAmounts();
                this.$emit('particiantchanged')
            },
            addRow() {
                this.particiant.addAmount(new amountClass(null, null))
            },
            removeAmount(id) {
                this.particiant.removeAmount(id);
                this.$emit('particiantchanged')
            }

        },
        computed: {
            placeholderConcat: function () {
                return this.particiant.name + '\'s Ausgaben'
            },
        }

    };
</script>
<<<<<<< HEAD
=======
<style lang="scss">
    @import "./particiant.scss";
</style>
>>>>>>> b2de001 (Update README.md)
