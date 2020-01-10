<template>
    <div class="amount col-md-12 col-sm-12">

        <div class="amount__value col-md-5 col-sm-12">
            <b-form-input
                    v-model.number="amount.amount"
                    :placeholder="placeholder"
                    type="number"
                    @change="$emit('amountchanged')"
            />
        </div>
        <div class="amount__reason col-md-5 col-sm-12">
            <b-form-input
                    v-model.number="amount.use"
                    placeholder="Für was?"
                    type="text"
            />
        </div>

        <div class="amount__remove col-md-2 col-sm-12">
            <b-badge
                    variant="danger"
                    @click="$emit('amount_removed', amount.id)"
            >
                entfernen
            </b-badge>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            placeholder: {
                type: String
            },
            amount: {
                type: Object
            },
            hideButton: {
                type: String,
                default: "no"
            }
        }
    };
</script>

<style lang="scss">
    @import "amount.scss";
</style>
