<template>
    <section class="flex-wrap-row-align-items-center-justify-space-around">
        <section>
            <NavigationNavMenu :data="[logo.anchor]" />
        </section>
        <section class="flex-wrap-row-align-items-center-justify-center">
            <NavigationNavMenu :data="menu"/>
            <NavigationNavMenu :data="anchorMenu" :cls="['anchor-nav']"/>
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
                    <h3 class="flex-wrap-row-justify-center slogan"> <span v-for="text in logo.title" :key="text">{{ text }} </span> </h3>
                    <p> Forener min akademiske reise fra bygg, helse og IT. Til å skape løsninger gjennom samarbeid. For meg er utfordringer en felles reise </p>
                </section>
                <section class="flex-column-align-items-center some">
                    <h3>Sosial media Linker / Kontakt</h3>
                    <NavigationNavMenu :data="SocialMedia" :cls="['some-nav']"/>
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
    import type { AnchorItem, RouterItem } from '~/types/navigation';

    const logo = computed(() =>
    {
        const title: string[] = [ 'Logic', 'Meets', 'Creative', 'Solutions']
        const image:string = '/media/images/logo/logic-meets-creative-solutions.png'
        const anchor: AnchorItem =  { href: '/', media: { caption:' ', src: image, srcset: image, type: 'png', alt: `${image.split('/').pop()?.split('.').shift()} logo` } };
        
        return { title: title, anchor: anchor};
    });
    const anchorMenu:AnchorItem[] = [{ label: 'CV & Portefølje ', href: 'https://krigjo25.no/media/documents/CV-Portofolio.pdf', type: ['pdf'] }];
    const menu: RouterItem[] = [{ order: 0, type: ['router'], path: '/', label: 'Portfolio' }, { order: 1, type: ['router'], path: '/dev', label: 'Dev Profile' }, { order: 2, type: ['router'], path: '/personal', label: 'Om Kristoffer' }];
    const SocialMedia: AnchorItem[] = [ { type: ['linkedin'], href: 'https://www.linkedin.com/in/krigjo25' }, { type: ['github'],  href: 'https://www.github.com/krigjo25' }, { type: ['mail','external'], href: 'mailto:krigjo25@outlook.com' }, { type: ['ytube','external'], href: 'https://www.youtube.com/@krigjo25' }, { type: ['facebook'], href: 'https://www.facebook.com/krigjo25' }, { type: ['instagram'], href: 'https://www.instagram.com/krigjo25' } ];

    const referencePath = 'reference';
    const referenceCache = 'referenceCache';
    const reference = await fetchCollection<ReferenceCollectionItem>(referencePath, referenceCache);
    const media = { type: 'jpg', src: 'media/images/carousel/20240903_165612.jpg', srcset: 'media/images/carousel/20240903_165612.jpg', alt: 'Portrett av Kristoffer Gjøsund'}

    const activeIndex = ref(0);
    const sortedReference = computed(() => { const data = mapReference(reference); return data.sort((a, b) => a.id - b.id); });
    //  --- Timer Logic
    const { index, start } = useCarousel(sortedReference.value.length, 10000);

    // --- Lifecycle Logic
    watch(index, (newIndex) => { activeIndex.value = newIndex; });
    onMounted(() => { start(); });
</script>