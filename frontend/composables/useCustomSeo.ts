import type { SeoOptions } from "~/types/utils";

export function useCustomSeo(options: SeoOptions = {})
{
  const baseUrl = 'https://krigjo25.no';

  // computed/unref gjør at både statiske strenger og reaktive ComputedRef/Ref fungerer sømløst
  const fullUrl = computed(() => {
    const rawPath = toValue(options.urlPath);
    return rawPath ? `${baseUrl}${rawPath.startsWith('/') ? '' : '/'}${rawPath}` : baseUrl;
  });

  const rawTitle = computed(() => toValue(options.title));
  const rawDescription = computed(() => toValue(options.description));
  const rawImage = computed(() => toValue(options.image));
  const rawType = computed(() => toValue(options.type));

  const type = computed(() => rawType.value || 'website');
  const image = computed(() => rawImage.value || `${baseUrl}/og-image.png`);
  const description = computed(() => rawDescription.value || "Portefølje side for Kristoffer Gjøsund");
  const title = computed(() => rawTitle.value ? `${rawTitle.value} - Kristoffer Gjøsund` : "Portefølje - Kristoffer Gjøsund");

  useSeoMeta({
    title,
    description,
    robots: 'index, follow',
    googleSiteVerification: '8gvx99aCgKbc489qfagbKyJyY9Wv4KUKC9AAk8fLxUs',
  
    ogType: type,
    ogTitle: title,
    ogUrl: fullUrl,
    ogImage: image,
    ogDescription: description,

    twitterTitle: title,
    twitterImage: image,
    twitterDescription: description,
    twitterCard: 'summary_large_image',  
  });

  useHead({
    link: [{ rel: 'canonical', href: fullUrl }]
  });
}
