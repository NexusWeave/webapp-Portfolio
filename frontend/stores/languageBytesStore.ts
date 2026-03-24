import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLanguageStore = defineStore('tech-language', () => {

  const languages: Record<string, number> = reactive<Record<string, number>>({})

  const allLanguages = computed(() => languages)
  const formattedLanguages = computed(() => {
    const object = sortByBytes();
    const kb = 1024;
    return Object.entries(object).filter(([_, bytes]) => bytes >= (kb*100)).map(([language, bytes]) => {
      const kiloBytes: number = 1024;
      const kb: number = bytes / kiloBytes;

      return {
        label: language.charAt(0).toUpperCase() + language.slice(1),
        bytes: Number(kb.toFixed(2)),
        percentage: Object.values(object).reduce((acc, val) => acc + val, 0) > 0 ? (kb / Object.values(object).reduce((acc, val) => acc + val, 0)) * 100 : 0
      }
    })
  });


  function increment(key:string, value: number) : void {
    if (!key || typeof value !== 'number') return;

    if (!languages[key]) languages[key] = 0;
    
    languages[key] += value;
    //console.log(`Updated ${key}: ${languages[key]} bytes`);
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