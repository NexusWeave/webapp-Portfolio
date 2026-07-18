import { createPinia, setActivePinia } from 'pinia';
import { it, describe, expect, beforeEach } from 'vitest';
import { useLanguageStore } from '@/stores/languageBytesStore';

describe('Nuxt Store Tests', () => {

    let increment: Function;
    let languages: Record<string,number>;
    let store: ReturnType<typeof useLanguageStore>;

    beforeEach(() => {
        setActivePinia(createPinia());

        store = useLanguageStore();
        languages = store.allLanguages;
        increment = (key:string, value:number) => store.increment(key, value)        
    });

    it('Should initialize the store', () => {
        const configured = store.configuredLanguages;

        expect(languages).toEqual({});
        expect(configured).toEqual([]);
    });

    it('Should format language names correctly', () => {
        increment('cs', 102400);
        increment('python', 100);

        const configured = store.configuredLanguages;
        expect(configured.length).toBe(1);
        expect(configured[0]?.bytes).toBe(100);
        expect(configured[0]?.label).toEqual('C#');        
    });
    describe('Test increment', () => {

        it('Should increment language bytes correctly', () => {

            increment("cs", 102400);
            expect(languages).toEqual({"cs":102400});

            const configuredLanguages = store.configuredLanguages;            
            expect(configuredLanguages.length).toBe(1);
        });

        it('Should throw Error', () => {
            expect(() => increment('', 102400)).toThrow(`Key is none otherwise value might not be a number`)
            expect(() => increment('cs', "key")).toThrow(`Key is none otherwise value might not be a number`)
        });
    });

    it('Should reset language bytes correctly', () => {
        
        const reset = () => store.resetBytes();

        increment('cs', 102400);
        increment('python', 51200);

        reset();

        expect(languages).toEqual({cs: 0, python:0})
    });

    it('Should update from repositories correctly', () => {
        // 1. Arrange: Opprett simulert data (dummy-data) for GitHub-repos
        const dummyRepos = [
            {
                languages: [
                    { label: 'TypeScript', bytes: 102400 },
                    { label: 'CSS', bytes: 51200 }
                ]
            },
            {
                languages: [
                    { label: 'JavaScript', bytes: 51200 }
                ]
            }
        ] as any; // Vi bruker "as any" for å slippe å fylle ut alle påkrevde GitHub-felter vi ikke tester her

        store.updateFromRepositories(dummyRepos);

        expect(languages).toEqual({TypeScript:102400, CSS:51200, JavaScript: 51200});

        const configured = store.configuredLanguages;
        expect(configured.length).toBe(1);
    });
});