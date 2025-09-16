<template>
    <section v-if="env === 'development'">
        <form action="https://validator.w3.org/check" class="text-center" enctype="multipart/form-data" method="post" target="_blank">
                    <input name="doctype" type="hidden" value="HTML5">
                    <input name="fragment" type="hidden">
                    <input alt="Validate" src="/static/I_heart_validator.png" type="image"> <!-- https://validator.w3.org/ -->
                </form>

    </section>
    <section class="copy" v-else>
        <p>&copy; 2024 - {{date}}. All rights reserved. By <a href="/"><span>@krigjo25</span></a></p>
    </section>

</template>

<script setup>

//  Importing dependencies
import { onMounted } from 'vue';
const date = new Date().getFullYear();
const env = process.env.NODE_ENV;

onMounted(() => {
    // Adapted from https://stackoverflow.com/a/10162353
    const html = '<!DOCTYPE ' +
    document.doctype.name +
    (document.doctype.publicId ? ' PUBLIC "' + document.doctype.publicId + '"' : '') +
    (!document.doctype.publicId && document.doctype.systemId ? ' SYSTEM' : '') +
    (document.doctype.systemId ? ' "' + document.doctype.systemId + '"' : '') +
        '>\\n' + document.documentElement.outerHTML;
    const fragmentInput = document.querySelector('form[action="https://validator.w3.org/check"] > input[name="fragment"]');
    if (fragmentInput) {
        fragmentInput.value = html;
    }
    });
</script>