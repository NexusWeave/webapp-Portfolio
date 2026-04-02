<template>
    <section class="flex-wrap-row-align-items-center-justify-space-around">
        <section>
            <NavigationNavMenu :data="data.logo" :cls="['logo-bar', 'logo-list', 'logo-item']" toggle="anchor" />
        </section>
        <section class="flex-wrap-row-align-items-center-justify-center">
            <NavigationNavMenu :data="data.menu" toggle="router"/>
            <NavigationAnchor :data="btn"/>
        </section>
        <section class="flex-wrap-row-justify-center profile">
            <section class="profile-bar">
                <section v-for="(data, i) in sortedReference" :key="i">
                        <article v-if="data.isVisible">
                            <MediaFigure
                                :data="{ type: 'jpg', src: 'media/images/carousel/20240903_165612.jpg', alt: 'Portrett av Kristoffer Gjøsund', caption: data.quote}"
                                :cls="['profile-avatar']"
                            />
                            <h3>
                                <cite>
                                    <NavigationAnchor 
                                        :data="data.anchor"
                                    />
                                </cite>
                            </h3>
                        </article>
                    </section>
                
            </section>
            <article class="flex-column">
                <h2>Kristoffer Gjøsund</h2>
                <section class="slogan-wrapper">
                    <h2 class="flex-wrap-row-justify-center slogan">
                        <span v-for="text in data.title" :key="text">{{ text }} </span>
                    </h2>
                    <p>
                        Problemløser som forener bygg, helse og IT. Skaper smarte løsninger gjennom samarbeid. For meg er hver eneste utfordring en felles reise.
                    </p>
                </section>
                <section class="flex-column-align-items-center some">
                    <h3>Sosial media Linker / Kontakt</h3>
                    <NavigationNavMenu :data="SocialMedia"
                        toggle="anchor"
                        :cls="[['some-bar', 'flex-wrap-row'],['some-ul', 'flex-wrap-row'],'some-li']"
                    />
                </section>
            </article>
        </section>
    </section>
    
</template>
<script lang="ts" setup>

    //  --- Import & types logic
    import { startTimer } from '~/utils/utils';
    import { onMounted, onUnmounted, fetchCollection } from '#imports';

    import type { ReferenceCollectionItem } from '@nuxt/content';
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


    //useHead({ script: [ { src: 'https://www.googletagmanager.com/gtag/js?id=G-4XX727FZCG', async: true }, { innerHTML: ` window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-4XX727FZCG'); `, type: 'text/javascript' } ] });

    const referencePath = 'reference';
    const referenceCache = 'referenceCache';
    const reference = await fetchCollection<ReferenceCollectionItem>(referencePath, referenceCache);
    const sortedReference = reactive(mapReference(reference));

    let timerInterval: ReturnType<typeof setInterval> | null = null;

    // --- Lifecycle Logic
    onMounted(() => { timerInterval = startTimer(sortedReference); });
    onUnmounted(() => { if (timerInterval) { clearInterval(timerInterval); }});
</script>