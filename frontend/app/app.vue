<template>
    <header>
        <Header />
    </header>
    <main>
        <NuxtPage />
    </main>
    <footer>
        <Footer />
    </footer>
</template>
<script setup>
    import Footer from '$src/views/utils/Footer.vue';
    import Header from '$src/views/utils/Header.vue';
</script>
