<template>
    <a
        :class="cls"
        :href="data.href"
        :aria-label="data.label"
        :aria-disabled="!!isDisabled()"
        :download="isDownload() ? '' : null"
        :data-external-link="!!isExternal()"
        :target="isExternal() ? '_blank' : '_self'"
        :rel="isExternal() ? 'noopener noreferrer' : undefined"
    >
        <span v-if="isImage()"> <MediaFigure :data="media" :cls="cls" /> </span>
        <span v-else-if="isIcon()" class="icon">
            {{ data.label }}
            <MediaIcon :cls="data.type"/>
        </span>
        <span v-else> {{ data.label }} </span>
    </a>
</template>

<script lang="ts" setup>

    //  --- Importing dependencies & type definitions
    import { computed } from 'vue';

    import type { AnchorProps } from '~/types/navigation';

    //  --- Defining Props
    const props = withDefaults(defineProps<AnchorProps>(), { cls: () => [], type: () => [], img: () => null, isDisabled: () => false });
    const cls = computed(() => props.cls);
    const data = computed(() => props.data);
    const media = computed(() => data.value.media?? null);

    /// --- Computed Flags
    const isExternal = () => { const dataProps = data.value; if (!dataProps.href) return false; const external_links = ['https://', 'http://', 'mailto:', 'tel:']; return external_links.some(link => dataProps.href.includes(link)); };

    const isDisabled = () => { const dataProps = data.value; if (!dataProps.isDisabled) return false; return dataProps.isDisabled  };

    const isDownload = () => {
        const dataProps = data.value;
        if (!Array.isArray(dataProps.type)) return;

        const downloadAble: string[] = ['docx', 'xlsx', 'csv' ];

        return downloadAble.some(type => dataProps.type && dataProps.type.includes(type));
    };

    const isImage = () => {
        const imgProps = media.value;
        const dataProps = data.value;

        if (!dataProps.type && !imgProps) return false;

        const imageTypes = ['jpg', 'jpeg', 'png', 'svg', "webp"];

        if (imageTypes.some(type => dataProps.type && dataProps.type.includes(type))) return true;
        if (imgProps && imgProps.type) return imageTypes.some(type => imgProps.type && imgProps.type.includes(type));

        return false;
    };

    const isIcon = () => { const dataProps = data.value; if (!dataProps.type) return false; const iconTypes = ['docs', 'pdf', 'mail', 'telephone', 'school', 'globe', 'map-pin', 'diploma', 'github', 'ytube', 'linkedin', 'facebook', 'instagram']; return iconTypes.some(type => dataProps.type && dataProps.type.includes(type)); };

    //  --- Debug logic
    //console.log("Anchor component loaded with data: ", img.value, isImage());
    //console.log("Link component loaded with data: ", data.value);
</script>