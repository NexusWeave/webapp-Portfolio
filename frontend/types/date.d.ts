export interface DateYearProps{ data: string; isVisible: boolean; }
export interface DateObject { created: string; end?: string | null; updated?: string | null; }
export interface DateItem { time?: string | null; date?: string | null; text?: string; delimiter?: string; updated?: Date | string | null; }