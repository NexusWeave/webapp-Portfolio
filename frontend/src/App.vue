
<template>
    <header>
        <Header />
    </header>
    <main>
        <RouterView />

    </main>
    <footer>
    </footer>
</template>
<script setup>
    
    //  Importing components
    import Footer from './views/utils/Footer.vue';
    import Header from './views/utils/Header.vue';
</script>
