<template>
    <section class="flex-wrap-row-justify-space-around">
        <section>
            <NavigationNavMenu :data="data.logo" :cls="['logo-bar', 'logo-list', 'logo-item']" toggle="anchor" />
        </section>
        <NavigationNavMenu :data="data.menu" toggle="router"/>

        <section class="flex-column-align-items-center">
            <h2>Social Media Links / Contact</h2>
        <NavigationNavMenu :data="SocialMedia"
            toggle="anchor"
            :cls="[['some-bar', 'flex-wrap-row'],['some-ul', 'flex-wrap-row'],'some-li']"
        />
        <NavigationAnchor :data="btn"/>
        </section>
    </section>
    
    <section class="slogan-wrapper">
        <h1 class="flex-wrap-row-justify-center slogan">
            <span v-for="text in data.title" :key="text">{{ text }} </span>
        </h1>
    </section>

    
</template>
<script lang="ts" setup>

    const data =
    {
        title: [ 'Logic', 'Meets', 'Creative', 'Solutions'],
        logo: 
        {
            anchor:
            { href: '/', cls: ['nav-link-logo'],
                img:
                {
                    type: 'png',
                    cls: ['k-logo-img'],
                    alt: 'logic-meets-creative-solutions.png',
                    src: '/media/images/logo/logic-meets-creative-solutions.png',
                }
            },
            
            
        },
        menu: [ { href: '/', label: 'Portfolio' }, { href: '/dev', label: 'Dev Profile' }, { href: '/personal', label: 'Om Kristoffer' } ]
    }
    const btn = { id: 0, label: 'Se min CV', cls: ['btn', 'pdf-btn'], href: '/media/documents/CV-Kristoffer-Gjøsund.pdf', type: ['pdf'] };

    const SocialMedia = [ { type: ['linkedin'], href: 'https://www.linkedin.com/in/krigjo25' }, { type: ['github'],  href: 'https://www.github.com/krigjo25' }, { type: ['mail','external'], href: 'mailto:krigjo25@outlook.com' }, { type: ['ytube','external'], href: 'https://www.youtube.com/@krigjo25' }, { type: ['facebook'], href: 'https://www.facebook.com/krigjo25' }, { type: ['instagram'], href: 'https://www.instagram.com/krigjo25' } ];


    useHead({ script: [ { src: 'https://www.googletagmanager.com/gtag/js?id=G-4XX727FZCG', async: true }, { innerHTML: ` window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-4XX727FZCG'); `, type: 'text/javascript' } ] });
</script>