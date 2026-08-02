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

export const routerItem = (path:string, order:number, label:string) => { return { path: path, type: ['router'], order: order, label: label } };
export const mockRoutes = (path:string, metadata: Record<string, string | number>, params: Record<string,string> = {}) => { return { path: path, params: params, meta: metadata }; };
