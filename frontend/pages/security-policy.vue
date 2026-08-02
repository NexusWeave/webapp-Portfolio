<template>
  <article class="article-wrapper flex-col">
    <header class="flex-col flex-center">
      <h2>{{ page?.title }}</h2>
      <p class="slogan">{{ page?.description }}</p>
    </header>

    <section class="flex-col flex-center margin-top-md">
      <Suspense>
        <template #default>
          <ContentRenderer v-if="page" :value="page" class="bio flex-col" />
        </template>
        <template #fallback>
          <section class="alert-info"><p>Laster innhold...</p></section>
        </template>
      </Suspense>
    </section>
  </article>
</template>

<script setup lang="ts">
import { useCustomSeo } from '~/composables/useCustomSeo';
import type { SeoOptions } from '~/types/utils';

// Ved å IKKE angi 'label' i definePageMeta, ekskluderes siden automatisk fra hovedmenyen (useNavigation)
definePageMeta({
  order: 99
});

const { data: page } = await useAsyncData('security-policy', () =>
  queryCollection('content').path('/security-policy').first()
);

const seoData: SeoOptions = {
  title: page.value?.title ?? 'Sikkerhet & Ansvarlig Rapportering',
  description: page.value?.description ?? 'Informasjon om ansvarlig rapportering av sikkerhetshull og sårbarheter.',
  urlPath: '/security-policy'
};

useCustomSeo(seoData);
</script>
