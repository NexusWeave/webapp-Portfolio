import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';
import type { GithubData } from '~/types/props';

export const useLanguageStore = defineStore('tech-language', () => {

  const languages: Record<string, number> = reactive<Record<string, number>>({})

  const allLanguages = computed(() => languages)

  const configureLanguageName = (name: string): string => {
    const mapping: Record<string, string> = {
      
      'c': 'c', 'cs': 'C#', 'cp': 'C++',
      'css': 'CSS', 'vue': 'Vue', 'php': 'PHP',
      'sql': 'SQL', 'html': 'HTML', 'sass': 'Sass', 'scss': 'SCSS',
      'python': 'Python', 'typescript': 'TypeScript', 'javascript': 'JavaScript',
      'jupyter': 'Jupyter Notebook'
    };

    const key = name.toLowerCase();
    return mapping[key] || name.charAt(0).toUpperCase() + name.slice(1);
  };

  const configuredLanguages = computed(() => {
    const object = sortByBytes();
    const totalBytes = Object.values(object).reduce((acc, val) => acc + val, 0);

    return Object.entries(object).map(([language, x]) => {
      const bytesPerKB: number = 1024;
      const kb: number = x / bytesPerKB;
      const mb: number = kb / 1024;
      const gb: number = mb / 1024;

      const isMB = kb >= 1024;
      const isGB = mb > 10224;

      return { 
        type: isGB ? 'GB' : isMB ? 'MB' : 'KB', 
        bytes: isGB ? Number(gb.toFixed(2)) : isMB ? Number(mb.toFixed(2)) : Number(kb.toFixed(2)), 
        label: configureLanguageName(language),
        original: kb,
        percentage: totalBytes > 0 ? (x / totalBytes) * 100 : 0
      }
    }).filter((item) => item.original >= 100)
  });

  function resetBytes(): void {
    for (const key in languages) languages[key] = 0;
  };

  function increment(key:string, value: number) : void {
    try {if (!key || typeof value !== 'number') throw new Error("Key is none otherwise value might not be a number")}
    catch (e) {throw e}

    if (!languages[key]) languages[key] = 0;
    
    languages[key] += value;
  }

  function updateFromRepositories(repos: GithubData[]): void {
    resetBytes();
    repos.forEach((repo) => {
      if (repo.languages) {
        repo.languages.forEach((lang) => {
        if (lang.label && lang.bytes) increment(lang.label, lang.bytes);
        });
      }
    });
  }

  function sortByBytes(): Record<string, number> {
    const sorted = Object.entries(languages).sort((a, b) => b[1] - a[1]);
    return Object.fromEntries(sorted);
  }

  return {
    increment,
    resetBytes,
    allLanguages,
    configuredLanguages: configuredLanguages,
    updateFromRepositories
  }
})