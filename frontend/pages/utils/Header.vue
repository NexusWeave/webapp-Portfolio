<template>
    <section class="flex-wrap-row-align-items-center">
        <section>
            <NavMenu :data="data.logo" :cls="['logo-bar', 'logo-list', 'logo-item']" toggle="anchor" />
        </section>
        <NavMenu :data="data.menu" toggle="router"/>
    </section>
    <section class="slogan-wrapper">
            <h1>
                <span v-for="text in data.title" :key="text">
                    {{ text }}
                </span>
            </h1>
        </section>
</template>

<script setup>

    import NavMenu from '$src/components/navigation/NavMenu.vue';

    const data =
    {
        title:
        [
            'Logic', 'Meets',
            'Creative', 'Solutions',
        ],
        logo: 
        {
            anchor:
            {
                href: '/',
                cls: ['nav-link-logo'],
                
                img:
                {
                    type: 'png',
                    cls: ['k-logo-img'],
                    alt: 'logic-meets-creative-solutions.png',
                    src: '/media/images/logo/logic-meets-creative-solutions.png',
                }
            },
            
            
        },
        menu:
        [
            {
                href: '/',
                label: 'Portefølje',
            },
            {
                href: '/about',
                label: 'About',
            },
            {
                href: '/dev',
                label: 'Dev profile',
            }
        ]
    }
</script>