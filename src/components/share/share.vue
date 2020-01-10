<template>
    <b-jumbotron id="container">

        <addParticiant
                title="Weitere Person hinzufügen"
                @createparticiant="createParticiant"
        />

        <div class="particiantContainer">
            <template v-for="particiant in particiants">
                <div :key="particiant.id" class="col-md-4">
                    <particiant
                            :key="particiant.id"
                            :particiant="particiant"
                            @amountchanged="updateParticipiantsAmount"
                            @particiantchanged="updateParticipiantsAmount"

                    />
                </div>
            </template>
        </div>

        <saveShare title="Speichern" type="success" v-if="getSaveIdentifier === 0"/>
        <saveShare title="Speichern..." type="secondary" v-else-if="getSaveIdentifier === null"/>
        <saveShare title="Aktualisieren" type="success" v-else/>
    </b-jumbotron>
</template>

<script>
    import Particiant from "@/components/particiant/particiant";
    import saveShare from "@/components/saveShare/saveShare";
    import addParticiant from "@/components/addParticiant/addParticiant";

    import {transaction} from "../../objects"

    export default {
        name: 'share',
        components: {
            Particiant,
            addParticiant,
            saveShare
        },
        methods: {
            updateParticipiantsAmount: function () {

                let newAmount = this.totalAmount / this.activeParticiants;
                this.particiants.forEach(function (particiant) {
                    particiant.amountToPay = 0;
                    if (particiant.isActive) particiant.amountToPay = newAmount - particiant.amountPaid
                });

                this.updateTransactions()
            },
            updateTransactions: function () {

                let recievers = [];
                let payers = [];

                this.particiants.forEach(function (particiant) {

                    particiant.transactions = [];
                    if (particiant.isActive && particiant.amountToPay !== 0) {//found active one

                        if (particiant.amountToPay < 0) {
                            recievers.push(particiant)
                        } else {
                            payers.push(particiant)
                        }

                    }
                });

                for (let j = 0; j < recievers.length; j++) {

                    let reciever = recievers[j];

                    for (let i = 0; i < payers.length; i++) {

                        let payer = payers[i];

                        if (reciever.amountToPay != null && reciever.amountToPay === payer.amountToPay * -1) {

                            reciever.addTransaction(new transaction(reciever.amountToPay, payer.name));
                            payer.addTransaction(new transaction(payer.amountToPay, reciever.name));

                            payer.amountToPay = null;
                            reciever.amountToPay = null

                        }
                    }
                }

                recievers.filter(v => v.amountToPay === null).sort((a, b) => a.amountToPay > b.amountToPay ? 1 : -1);
                payers.filter(v => v.amountToPay === null).sort((a, b) => a.amountToPay > b.amountToPay ? 1 : -1);


                for (let j = 0; j < recievers.length; j++) {

                    let reciever = recievers[j];

                    for (let i = 0; i < payers.length; i++) {

                        let payer = payers[i];

                        if (reciever.amountToPay != null) {

                            let transactionAmount = Math.min(reciever.amountToPay * -1, payer.amountToPay);

                            payer.amountToPay -= transactionAmount;
                            reciever.amountToPay += transactionAmount;

                            reciever.addTransaction(new transaction(-1 * transactionAmount, payer.name));
                            payer.addTransaction(new transaction(transactionAmount, reciever.name))

                        }
                    }
                }

            },
            createParticiant: function (particiant) {
                this.particiants.push(particiant)
            }

        },
        computed: {
            getSaveIdentifier: function () {
                return this.$store.state.identifier
            },
            particiants: function () {
                return this.$store.state.particiants
            },
            activeParticiants: function () {
                let count = 0;

                this.particiants.forEach(function (particiant) {
                    if (particiant.isActive) count++
                });

                return count
            },
            totalAmount: function () {
                let totalAmount = 0;

                this.particiants.forEach(function (particiant) {
                    if (particiant.isActive) totalAmount += particiant.amountPaid;
                });
                return parseInt(totalAmount)

            },
        },
        mounted() {
            if (this.$route.params.id) {
                this.$store.dispatch("loadData", {id: this.$route.params.id})
            }
        }

    }
</script>

<style lang="scss">
    @import "./share.scss";
</style>

