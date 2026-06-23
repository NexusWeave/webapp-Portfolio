import { createApp } from 'vue';

export function dummyApp<T> (composable: () => T): [T, ReturnType<typeof createApp>] {
    let result: T;
    const app = createApp({
        
        setup() {
            result = composable();
            return () => {};
        }
    });
    app.mount(document.createElement('div'))

    return [result, app];
};