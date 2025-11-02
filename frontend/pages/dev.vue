<template>
    <section class="flex-wrap-row-justify-space-evenly">
        <section class="dev-profile">
            <MediaFigure
                :data="{
                    type: 'jpg',
                    src: 'media/images/carousel/20240903_165612.jpg',
                    alt: 'Portrett av Kristoffer Gjøsund',
                }"
                :cls="['dev-avatar']"
            />
            <section>
                <h2> Attest sitater </h2>
                <section v-for="(data, i) in sortedReference" :key="i">
                    <article v-if="data.isVisible"class="bio">
                        <h3>
                            <NavigationAnchor 
                                :data="data.anchor"
                            />
                        </h3>
                        <p><i>{{ data.quote }}</i></p>
                    </article>
                </section>
            </section>
            <section>
                <h2> Skill Bar</h2>

                <UtilsProgress 
                    :value="totalProgress"
                    label="Fullstack Utvikler"
                />
                <UtilsProgress v-for="(data, i) in sortedProgressList" :key="i" 
                    :value="data.value"
                    :label="data.name"
                />
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
    

    //  --- Progress Bar Logic
    const progressList =
    [
        { name:'C', value: 25 },
        { name:'GO', value: 5 },    
        { name:'Python', value: 40 },
        { name:'C# / .NET', tech:"c", value: 25 },
        { name:'SQL / Databaser', value: 50 },
        { name:'Javascript / TypeScript', tech:"javascript", value: 26 },
        
        
    ];

    const n = progressList.length;
    const totalProgress = computed(() => (progressList.reduce((acc, item) => acc + item.value, 0) + n) / n);
    const sortedProgressList = computed(() => progressList.slice().sort((a, b) => b.value - a.value));


    //  --- Dev Data Logic
    const devPath = 'dev';
    const referencePath = 'reference';

    const dev = await fetchCollection<DevCollectionItem>(devPath, devPath);
    const reference = await fetchCollection<ReferenceCollectionItem>(referencePath, referencePath);

    const sortedReference = reactive(mapReference(reference));

    onMounted(() => {
        //  Start the reference timer
        startTimer(sortedReference);

    });

    //  --- Debugging Logic ---
    //console.warn('Reference Data:', sortedReference.value);
    //console.log(dev.value);
</script>