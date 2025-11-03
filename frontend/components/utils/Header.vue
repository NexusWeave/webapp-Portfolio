<template>
    <section class="flex-wrap-row-justify-space-around">
        <section>
            <NavigationNavMenu :data="data.logo" :cls="['logo-bar', 'logo-list', 'logo-item']" toggle="anchor" />
        </section>
        <NavigationNavMenu :data="data.menu" toggle="router"/>

        <section class="flex-column-justify-center-align-center">
            <h2>Social Media Links / Contact</h2>
        <NavigationNavMenu :data="SocialMedia"
            toggle="anchor"
            :cls="[['some-bar', 'flex-wrap-row'],['some-ul', 'flex-wrap-row'],'some-li']"
        />
        </section>
    </section>
    
    <section class="slogan-wrapper">
        <h1>
            <span v-for="text in data.title" :key="text">{{ text }} </span>
        </h1>
    </section>

    
</template>

<script lang="ts" setup>

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
                label: 'Portfolio',
            },

            {
                href: '/dev',
                label: 'Dev Profile',
            },
            {
                href: '/personal',
                label: 'Om Kristoffer',
            },
        ]
    }

    const SocialMedia =
    [
        {
            type: ['linkedin','external'],
            href: 'https://www.linkedin.com/in/krigjo25',
        },
        {
            type: ['github','external'],
            href: 'https://www.github.com/krigjo25',
        },
        {
            type: ['mail','external'],
            href: 'mailto:krigjo25@outlook.com',
        },
        {
            type: ['ytube','external'],
            href: 'https://www.youtube.com/@krigjo25',
        },
        {
            type: ['facebook','external'],
            href: 'https://www.facebook.com/krigjo25',
        },
        {
            type: ['instagram','external'],
            href: 'https://www.instagram.com/krigjo25',
        }
    ];
</script>