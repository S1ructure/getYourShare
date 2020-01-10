<template>
    <div class="payflow">

        <div v-if="transaction.amount > 0">
            <b-badge variant="danger" >
                {{ transaction.amount | toCurrency }}
            </b-badge>
            an {{ transaction.counterPartName }}
        </div>

        <div v-if="transaction.amount < 0">
            <b-badge variant="success" >
                {{ transaction.amount | abs | toCurrency }}
            </b-badge>
            von {{ transaction.counterPartName }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            transaction: {
                type: Object
            },
        },
    };
</script>
