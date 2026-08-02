<template>
    <section :class="cls[0]" >
        <h3 v-if="data.name">
            <NavigationAnchor :data="data.anchor"/>
        </h3>
        <h3 v-else>{{ data.name }}</h3>
        <p>
            <Date :data="data.date"/> 
        </p>
        <p v-if="!!data.summary.body"> {{data.summary.body}} </p>
        <ul v-if="!!data.summary.list">
            <li v-for="bullet in data.summary.list">
                {{ bullet }}
            </li>
        </ul>

        <section v-if="data.tech.length > 0" :class="cls[1]">
            <h4>Teknologi</h4>
            <ul :class="['flex-wrap-row-align-items-center-justify-space-evenly', cls[1]]">
                <li v-for="tech in data.tech" :class="tech.type">{{ tech.label }}</li>
            </ul>
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