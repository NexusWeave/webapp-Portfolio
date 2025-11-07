<template>
    <a
        :class="cls[0]"
        :href="data.href"
        :aria-disabled="!!isDisabled()"
        :data-external-link="!!isExternal()"
        :target="isExternal() ? '_blank' : '_self'"
        :rel="isExternal() ? 'noopener noreferrer' : null"
        :download="isMedia() === 'download' ? data.label + '.' + data.type[0] : null"
        >

        <template v-if="isMedia() === 'img'">
            <MediaFigure :data="img" :cls="img.cls" />
        </template>

        <template v-else-if="isMedia() == cls[cls.length - 1]">
            <MediaIcon :type="data.type[0]" :label="data.label" :cls="[cls[cls.length - 1], data.type[0]]"/>
            {{ data.label }}
        </template>

        <template v-else>
                {{ data.label }}
        </template>
    </a>

</template>

<script setup>

    import { defineProps } from 'vue';

    const props = defineProps({
        data: {
            type: Object,
            required: true
        },
        cls: {
            type: [Array],
            required: false,
        },
        img: {
            type: Object,
            required: false,
        }
    });

    const media = 
    {
        files: ['pdf'],
        images: ['jpg', 'jpeg', 'png', 'svg', "webp"],
        downloadFiles: ['docx', 'xlsx', 'csv'],
        icons: ['mail', 'telephone', 'school', 'globe', 'map-pin', 'diploma', 'github', 'ytube', 'linkedin', 'facebook', 'instagram'],
    }

    const data = props.data;
    const img = !!data.img ? data.img : null;

    const classList = () => {
        const cls = (Array.isArray(data.cls) ? data.cls : [data.cls]);
        cls.push('icon');

        return cls;
    };
    
    const cls = classList();
    
    const isExternal = () => {
        if (!data.type) return false;

        const external = 'external';
        return !!Array.isArray(data.type) ? data.type.includes(external) : data.type === external;
    };

    const isDisabled = () => {
        if (!data.type) return false;
        return !!Array.isArray(data.type) ? data.type.includes('disabled') : data.type === 'disabled';
    };

    const isMedia = () => {

        if (!data.type && !img) return false;

        const search = Array.isArray(data.type) ? data.type[0] : data.type ? data.type : img.type ?? null

        if (!search) return false;
        else if (search === 'external') return false;

        const files = media.files.find(item => item === search);
        const icons = media.icons.find(item => item === search);
        const images = media.images.find(item => item === search);
        const download = media.downloadFiles.find(item => item === search);
        //console.log("Search type:", search, "Data type:", data.type, "Image type:", img ? img.type : 'No image');
        
        switch (search)
        {
            case files || icons:
                return cls[cls.length - 1];

            case download:
                return 'download';

            case images:
                return 'img';

            default:
                //console.warn('Data type is Not a media type:', search, data);
                return false;
        }
    };
    //  --- Debug logic
    //console.log("Link component loaded with data: ", data, img);
</script>