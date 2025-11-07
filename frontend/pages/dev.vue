<template>
    <section class="flex-wrap-row-justify-space-evenly">
        <section class="dev-bar">
            <MediaFigure
                :data="{
                    type: 'jpg',
                    src: 'media/images/carousel/20240903_165612.jpg',
                    alt: 'Portrett av Kristoffer Gjøsund',
                }"
                :cls="['dev-avatar']"
            />
            <section class="dev-references">
                <h2> Attest sitater </h2>
                <section v-for="(data, i) in sortedReference" :key="i">
                    <article v-if="data.isVisible" class="dev-quote">
                        
                        <p><q>{{ data.quote }}</q>
                        - </p>
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
            <section class="dev-skill flex-column-justify-center-align-center">
                <h2> Mine Kode Ferdigheter</h2>

                <section class="flex-wrap-row-justify-space-evenly">
                    <UtilsProgress 
                        :value="totalCodeSkills"
                        label="Fullstack Utvikler"
                    />
                    <UtilsProgress v-for="(data, i) in codeSkills" :key="i" 
                        :value="data.value"
                        :label="data.name"
                        :tech="data.tech"
                    />
                </section>

                <h2> Verktøy Ferdigheter</h2>

                <section class="flex-wrap-row-justify-space-evenly">
                        <UtilsProgress v-for="(data, i) in toolSkills" :key="i" 
                            :value="data.value"
                            :label="data.name"
                            :tech="data.tech"
                        />
                </section>
            </section>
        </section>

        <section class="flex-column-justify-space-evenly">
            <article v-for="(data, i) in dev" :key="i" class="bio">
                <h3 v-if="i === 1">{{ data.title }}</h3>
                <ContentRenderer v-if="i === 1" :value="data" />
            </article>

            <article v-for="(data, i) in dev" :key="i" class="bio">
                <h3 v-if="i !== 1">{{ data.title }}</h3>
                <ContentRenderer v-if="i !== 1" :value="data"/>
            </article>
        </section>

    
    </section>
    
</template>

<script setup lang="ts">

    //  --- Import & types logic
    import { onMounted } from '#imports';
    import { startTimer } from '~/utils/utils';
    import { fetchCollection } from '#imports';
    
    import type { DevCollectionItem, ReferenceCollectionItem } from '@nuxt/content';

    //  --- Dev Data Logic
    const devPath = 'dev';
    const referencePath = 'reference';

    const dev = await fetchCollection<DevCollectionItem>(devPath, devPath);
    const reference = await fetchCollection<ReferenceCollectionItem>(referencePath, referencePath);

    const sortedReference = reactive(mapReference(reference));

    //  --- Progress Bar Logic
    const codeProsessionList =
    [
        { name:'C',  tech:"c", value: 25 },
        { name:'GO-Lang',  tech:"go", value: 10 },    
        { name:'SASS', tech:"sass", value: 30 },
        { name:'Python', tech:"python", value: 40 },
        { name:'C#', tech:"cs", value: 25 },
        { name:'SQL / Databaser', tech:"sqlite", value: 50 },
        { name:'TypeScript', tech:"typescript", value: 26 },
    ];

    const toolList =
    [
        { name:'GIT',  tech:"workflow", value: 50 },
        { name:'Agile',  tech:"workflow", value: 25 },    
        { name:'Docker', tech:"workflow", value: 5 },
        { name:'CI/CD', tech:"workflow", value: 15 },
        { name:'Linux', tech:"workflow", value: 45 },
        { name:'AI & ML', tech:"workflow", value: 50 },
        { name:'DevOps', tech:"workflow", value: 25 },
        { name:'Unit Testing', tech:"workflow", value: 40 },
    ];

    const n = codeProsessionList.length;
    const totalCodeSkills = computed(() => (codeProsessionList.reduce((acc, item) => acc + item.value, 0) + n) / n);
    const codeSkills = computed(() => codeProsessionList.slice().sort((a, b) => b.value - a.value));
    const toolSkills = computed(() => toolList.slice().sort((a, b) => b.value - a.value));


    onMounted(() => {
        //  Start the reference timer
        startTimer(sortedReference);

    });

    //  --- Debugging Logic ---
    //console.warn('Reference Data:', sortedReference.value);
    //console.log(dev.value);
</script>