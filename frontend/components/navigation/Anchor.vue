<template>
    <a
        :class="cls[0]"
        :href="data.href"
        :aria-disabled="!!isDisabled()"
        :download="isDownload() ? '' : null"
        :data-external-link="!!isExternal()"
        :target="isExternal() ? '_blank' : '_self'"
        :rel="isExternal() ? 'noopener noreferrer' : undefined"
        >

        <span v-if="isImage()">
            <MediaFigure v-if="img" :data="img" :cls="img.cls" />
        </span>

        <span v-else-if="isIcon()" class="icon">
            <MediaIcon :label="data.label" :cls="data.type[0]"/>
            {{ data.label }}
        </span>

        <span v-else> {{ data.label }} </span>
    </a>

</template>

<script lang="ts" setup>

    //  --- Importing dependencies
    import { computed } from 'vue';

    //  --- Importing Types
    import type { FigureItem } from '~/types/props';


    interface AnchorProps
    {
        data: {
            href: string;
            label: string;
            type?: string[];
            img?: FigureItem;
            isDisabled?: boolean;
        };
        cls?: string[];
    }

    //  --- Defining Props
    const props = withDefaults(defineProps<AnchorProps>(), {
        cls: () => [],
        type: () => [],
        img: () => null, isDisabled: () => false,
    });

    const data = computed(() => props.data);
    const img = computed(() => data.value.img ?? null);
    const cls = computed(() => Array.isArray(props.cls) ? props.cls : [props.cls]);
    
    const isExternal = () => {
        const dataProps = data.value;
        if (!dataProps.href) return false;

        const external_links = ['https://', 'http://', 'mailto:', 'tel:'];
        return external_links.some(link => dataProps.href.includes(link));
    };

    const isDisabled = () => {
        const dataProps = data.value;
        if (!dataProps.isDisabled) return false;

        return !!dataProps.isDisabled 
    };

    const isDownload = () => {
        const dataProps = data.value;
        if (!Array.isArray(dataProps.type)) return;

        const downloadAble: string[] = ['docx', 'xlsx', 'csv' ];
        return downloadAble.some(type => dataProps.type && dataProps.type.includes(type));
    };

    const isImage = () => {
        const dataProps = data.value;
        if (!dataProps.type) return false;

        const imageTypes = ['jpg', 'jpeg', 'png', 'svg', "webp"];
        return imageTypes.some(type => dataProps.type && dataProps.type.includes(type));
    };

    const isIcon = () => {
        const dataProps = data.value;
        if (!dataProps.type) return false;

        const iconTypes = ['mail', 'telephone', 'school', 'globe', 'map-pin', 'diploma', 'github', 'ytube', 'linkedin', 'facebook', 'instagram'];
        return iconTypes.some(type => dataProps.type && dataProps.type.includes(type));
    };

    //  --- Debug logic
    //console.log("Link component loaded with data: ", data, img);
</script>