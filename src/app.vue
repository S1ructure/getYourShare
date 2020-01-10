<template>
    <div id="app">
        <b-navbar type="dark" variant="dark">
            <b-navbar-brand href="#">Share!</b-navbar-brand>
            <b-nav-text>Kompliziert Geld aufteilen? War gestern!</b-nav-text>
        </b-navbar>
        <router-view></router-view>
        <router-link to="/test?id=5">:)</router-link>
    </div>
</template>
<script>
    export default {
        name: 'app'
    }
</script>
<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }
</style>