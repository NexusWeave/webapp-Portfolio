<template>
    <section class="flex-wrap-row-align-items-center-justify-space-around">
        <section>
            <NavigationNavMenu :data="data.logo" :cls="['logo-bar', 'logo-list', 'logo-item']" toggle="anchor" />
        </section>
        <section class="flex-wrap-row-align-items-center-justify-center">
            <NavigationNavMenu :data="menu" toggle="router"/>
            <NavigationAnchor :data="btn"/>
        </section>
        <article class="profile-bar flex-wrap-row-align-items-center profile">
            <section class="flex-column-align-items-center">
                <MediaFigure :data="media" />
                <q>{{ sortedReference[activeIndex]?.quote }}</q>
                <cite> <NavigationAnchor :data="sortedReference[activeIndex]?.anchor" /> </cite>
            </section>
            <section class="profile-content flex-column">
                <h2>Kristoffer Gjøsund</h2>
                <section class="slogan-wrapper">
                    <h3 class="flex-wrap-row-justify-center slogan"> <span v-for="text in data.title" :key="text">{{ text }} </span> </h3>
                    <p> Forener min akademiske reise fra bygg, helse og IT. Til å skape løsninger gjennom samarbeid. For meg er utfordringer en felles reise </p>
                </section>
                <section class="flex-column-align-items-center some">
                    <h3>Sosial media Linker / Kontakt</h3>
                    <NavigationNavMenu :data="SocialMedia"
                        toggle="anchor"
                        :cls="[['some-bar', 'flex-wrap-row'],['some-ul', 'flex-wrap-row'],'some-li']"
                    />
                </section>
            </section>
        </article>
    </section>
    
</template>
<script lang="ts" setup>

    //  --- Import & types logic
    
    import { onMounted, fetchCollection } from '#imports';

    import type { ReferenceCollectionItem } from '@nuxt/content';
    import { mapReference } from '~/composables/maps/mapReferences';

    const data = computed(() =>
    {
        const title = [ 'Logic', 'Meets', 'Creative', 'Solutions']
        const image = '/media/images/logo/logic-meets-creative-solutions.png'
        const logo =  { anchor: { href: '/', media: { caption:' ', src: image, type: 'png', cls: ['k-logo-img'], alt: `${image.split('/').pop()?.split('.').shift()} logo` } } };
        
        return { title: title, logo: logo};
    });
    const menu = [{ href: '/', label: 'Portfolio' }, { href: '/dev', label: 'Dev Profile' }, { href: '/personal', label: 'Om Kristoffer' }];
    
    const btn = { id: 0, label: 'CV & Portefølje ', cls: ['btn', 'pdf-btn'], href: '/media/documents/CV-Portofolio.pdf', type: ['pdf'] };
    const SocialMedia = [ { type: ['linkedin'], href: 'https://www.linkedin.com/in/krigjo25' }, { type: ['github'],  href: 'https://www.github.com/krigjo25' }, { type: ['mail','external'], href: 'mailto:krigjo25@outlook.com' }, { type: ['ytube','external'], href: 'https://www.youtube.com/@krigjo25' }, { type: ['facebook'], href: 'https://www.facebook.com/krigjo25' }, { type: ['instagram'], href: 'https://www.instagram.com/krigjo25' } ];

    const referencePath = 'reference';
    const referenceCache = 'referenceCache';
    const reference = await fetchCollection<ReferenceCollectionItem>(referencePath, referenceCache);
    const media = { type: 'jpg', src: 'media/images/carousel/20240903_165612.jpg', srcset: 'media/images/carousel/20240903_165612.jpg', alt: 'Portrett av Kristoffer Gjøsund'}

    const activeIndex = ref(0);
    const sortedReference = computed(() => {
        const data = mapReference(reference);
        return data.sort((a, b) => a.id - b.id);
    });
    const { index, start } = useCarousel(sortedReference.value.length, 10000);

    // --- Lifecycle Logic
    watch(index, (newIndex) => { activeIndex.value = newIndex; //console.log('Current index:', newIndex);
    });
    onMounted(() => { start(); });
</script>