
<template>
    <header>
        <Header />
    </header>
    <main>
        <RouterView />
    </main>
    <footer>
        <Footer />
    </footer>
</template>
<script setup>
    import Footer from './views/utils/Footer.vue';
    import Header from './views/utils/Header.vue';
</script>
