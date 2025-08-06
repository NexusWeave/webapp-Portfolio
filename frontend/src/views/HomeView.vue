<template>

    <section>
        <h2>Akademisk Reise</h2>

        <section class ="flex-wrap-row-justify-space-evenly timeline-container">
            <Timeline v-for="data  in timeline" 
            :key="data.id" :data="data"
            @toggle-visibility="toggleVisibility(data.id)"/>
        </section>
    </section>
</template>
<script setup>
    import Timeline from '@/components/academic/Timeline.vue'
import { reactive } from 'vue';

    import { timelineStore } from '@/store/timeline.js';

    const tl = timelineStore();
    const timeline = reactive(
    [
        {
            id: 0,
            year: 2016,
            title: 'Bygg og Anlegg',
            description: 'Fullført Bygg og Anlegg med gode resultater.',

            content:
            {
                isVisable: false,

                school :
                {
                    name: 'Borgund VGS',
                    location: 'Ålesund, Norge',
                    anchor:
                    {
                        label: 'Borgund VGS Skole',
                        href: 'https://example.com/',
                    },
                },

                anchor:
                {
                    label: 'Vitnemål',
                    href: 'https://example.com/vitnemal',
                },
            },
        },
        {
            id: 1,
            year: 2018,
            title: 'Helsefag',
            description: 'Fullført Helsefag med gode resultater.',

            content:
            {
                isVisable: false,

                school :
                {
                    name: 'Borgund VGS',
                    location: 'Ålesund, Norge',
                    anchor:
                    {
                        label: 'Borgund VGS Skole',
                        href: 'https://example.com/',
                    },
                },

                anchor:
                {
                    label: 'Vitnemål',
                    href: 'https://example.com/vitnemal',
                },
            },
        },
        {
            id: 2,
            year: 2022,
            title: 'CS50x :Introduction To Computer Science',
            description: 'Fullført Introduction To Computer Science with Python med gode resultater.',

            content:
            {
                isVisable: false,

                school :
                {
                    end: 2022,
                    start: 2022,
                    name: 'HarvardX',
                    location: 'Nettbasert',
                    description: 'Professional Certificate in Computer Science',

                    anchor:
                    {
                        type: ['external'],
                        label: 'HarvardX',
                        href: 'https://www.edx.org/school/harvardx',
                    },
                },

                anchor:
                {
                    label: 'Certified Certificate',
                    href: 'https://courses.edx.org/certificates/cc7f7cb258a24538af14c876023cf932',
                },
            },
        },

        {
            id: 4,
            year: 2024,
            title: 'It- Utviklings faget',
            description: 'Fullført GetAcademy med gode resultater.',

            content:
            {
                isVisable: false,

                school :
                {
                    name: 'GetAcademy',
                    location: 'Larvik, Vestfold, Norge',
                    description: 'OnCampus / Nettbasert kurs fra GetAcademy',

                    anchor:
                    {
                        type: ['external'],
                        label: 'GetAcademy',
                        href: 'https://example.com/',
                    },
                },

                anchor:
                {
                    label: 'Vitnemål',
                    href: 'https://example.com/vitnemal',
                },
            },
        },
    ]);

    const toggleVisibility = (id) => {
        
        timeline.forEach(item => {
            if (item.id === id) {
                item.content.isVisable = !item.content.isVisable;
            } else {
                item.content.isVisable = false; // Collapse other items
            }
        });
        console.log('Toggling visibility for ID:', id);
    };
</script>