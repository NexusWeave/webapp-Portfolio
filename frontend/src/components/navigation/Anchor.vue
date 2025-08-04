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
            <Figure :data="img" :cls="img.cls" />
        </template>

        <template v-else-if="isMedia() == cls[cls.length - 1]">
            <span :class="cls[0]">
            <i :class="cls[cls.length - 1]" :aria-label="data.label"></i> 
                {{ data.label }}
            </span>
        </template>

        <template v-else>
                {{ data.label }}
        </template>
        
    </a>

</template>

<script setup>

    import { defineProps } from 'vue';

    import Figure from '@/components/media/Figure.vue';

    const props = defineProps({
        data: {
            type: Object,
            required: true
        },
        Cls: {
            type: [String, Array],
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
        contact: ['email', 'telephone'],
        images: ['jpg', 'jpeg', 'png', 'svg'],
        downloadFiles: ['docx', 'xlsx', 'csv'],
    }

    const data = props.data;
    const img = !!data.img ? data.img : null;

    const classList = () => {
        const cls = props.Cls ? props.Cls : (Array.isArray(data.cls) ? data.cls : [data.cls]);
        cls.push('icon');

        return cls;
    };
    
    const cls = classList();
    
    const isExternal = () => {
        if (!data.type) return false;
        return Array.isArray(data.type) ? data.type.includes('external') : data.type === 'external';
    };

    const isDisabled = () => {
        if (!data.type) return false;
        return !!Array.isArray(data.type) ? data.type.includes('disabled') : !!data.type === 'disabled';
    };

    const isMedia = () => {

        if (!data.type && !img) return false;

        const search = Array.isArray(data.type) ? data.type[0] : data.type ? data.type : img.type ?? null

        const files = media.files.find(item => item === search);
        const images = media.images.find(item => item === search);
        const contact = media.contact.find(item => item === search);
        const download = media.downloadFiles.find(item => item === search);
        console.log("Search type:", search, "Data type:", data.type, "Image type:", img ? img.type : 'No image');
        
        switch (search)
        {
            case files || contact:
                return cls[cls.length - 1];

            case download:
                return 'download';

            case images:
                return 'img';

            default:
                console.warn('Data type is illegal:', search, data);
                return false;
        }
    };

    //console.log("Link component loaded with data: ", data, img);
</script>