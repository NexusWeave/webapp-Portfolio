import { computed } from 'vue'
import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('tech-language', () => {

  const languages: Record<string, number> = reactive<Record<string, number>>({})

  const allLanguages = computed(() => languages)
  const formattedLanguages = computed(() => {
    const object = sortByBytes();
    const kb = 1024;

    return Object.entries(object).filter(([_, bytes]) => bytes >= (kb*100)).map(([language, x]) => {
      const bytes: number = 1024;
      const kb: number = x / bytes;
      const mb: number = kb / bytes;

      return {
        type: 'KB',
        bytes: Number(kb.toFixed(2)),
        label: language.charAt(0).toUpperCase() + language.slice(1),
        percentage: Object.values(object).reduce((acc, val) => acc + val, 0) > 0 ? (kb / Object.values(object).reduce((acc, val) => acc + val, 0)) * 100 : 0
      }
    })
  });


  function increment(key:string, value: number) : void {
    if (!key || typeof value !== 'number') return;

    if (!languages[key]) languages[key] = 0;
    
    languages[key] += value;
  }

  function sortByBytes(): Record<string, number> {
    const sorted = Object.entries(languages).sort((a, b) => b[1] - a[1]);
    return Object.fromEntries(sorted);
  }


  return {
    languages,
    increment,
    allLanguages,
    formattedLanguages
  }
})