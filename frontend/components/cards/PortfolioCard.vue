<template>
    <section :class="cls[0]" >
        <section v-for="content in data.content">
            <h3 v-if="content.anchor">
                <NavigationAnchor :data="content.anchor"/>
            </h3>
            <h3 v-else>{{ content.name }}</h3>
            <p>
                <Date :data="content.date"/> 
            </p>
            <p v-if="!!content.description.summary"> {{content.description.summary}} </p>
            <ul v-if="!!content.description.list">
                <li v-for="bullet in content.description.list">
                    {{ bullet }}
                </li>
            </ul>

            <section v-if="content.tech.length > 0" :class="cls[1]">
                <h4>Teknologi</h4>
                <ul :class="['flex-wrap-row-align-items-center-justify-space-evenly', cls[1]]">
                    <li v-for="tech in content.tech" :class="tech.type">{{ tech.label }}</li>
                </ul>
            </section>
        </section>

    </section>
</template>


<script setup lang="ts">

    interface Props
    {
        cls?: Array<string>;
        data:Record<string, any>;
        
    }

    const props = withDefaults(defineProps<Props>(), {
        cls: ()=> []
    });

    const cls = props.cls;
    const data = props.data;
    
</script>