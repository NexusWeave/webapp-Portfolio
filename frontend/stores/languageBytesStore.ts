import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { GithubData } from '~/types/props'

export const useLanguageStore = defineStore('tech-language', () => {

  const languages: Record<string, number> = reactive<Record<string, number>>({})

  const allLanguages = computed(() => languages)

  const formatLanguageName = (name: string): string => {
    const mapping: Record<string, string> = {
      'cs': 'C#',
      'cp': 'C++',
      'jupyter': 'Jupyter Notebook',
      'typescript': 'TypeScript',
      'javascript': 'JavaScript',
      'css': 'CSS',
      'html': 'HTML',
      'vue': 'Vue',
      'sass': 'Sass',
      'scss': 'SCSS',
      'php': 'PHP',
      'sql': 'SQL',
      'python': 'Python'
    };

    const key = name.toLowerCase();
    return mapping[key] || name.charAt(0).toUpperCase() + name.slice(1);
  };

  const formattedLanguages = computed(() => {
    const object = sortByBytes();
    const totalBytes = Object.values(object).reduce((acc, val) => acc + val, 0);

    return Object.entries(object).map(([language, x]) => {
      const bytesPerKB: number = 1024;
      const kb: number = x / bytesPerKB;
      const mb: number = kb / 1024;

      const isMB = kb > 999;

      return { 
        type: isMB ? 'MB' : 'KB', 
        bytes: isMB ? Number(mb.toFixed(2)) : Number(kb.toFixed(2)), 
        label: formatLanguageName(language),
        original: kb,
        percentage: totalBytes > 0 ? (x / totalBytes) * 100 : 0
      }
    }).filter((item) => item.original >= 100)
  });


  function resetBytes(): void {
    for (const key in languages) languages[key] = 0;
  }

  function increment(key:string, value: number) : void {
    if (!key || typeof value !== 'number') return;

    if (!languages[key]) languages[key] = 0;
    
    languages[key] += value;
  }

  function updateFromRepositories(repos: GithubData[]): void {
    resetBytes();
    repos.forEach((repo) => {
      if (repo.languages) {
        repo.languages.forEach((lang) => {
          increment(lang.label, lang.bytes);
        });
      }
    });
  }

  function sortByBytes(): Record<string, number> {
    const sorted = Object.entries(languages).sort((a, b) => b[1] - a[1]);
    return Object.fromEntries(sorted);
  }


  return {
    resetBytes,
    languages,
    increment,
    updateFromRepositories,
    allLanguages,
    formattedLanguages
  }
})