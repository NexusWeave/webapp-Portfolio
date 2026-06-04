export interface DateYearProps{ data: any; isVisible: boolean; }
interface DateProps { cls?: Array<string>; data:DateItem; isArticle?: boolean; };
export interface DateObject { created: any;  end?: any | null; }
export interface DateItem { current?: string ; updated?: string | null; end?: string; time?: string | null; date?: string | null ; text?: string; delimiter?: string; type?: string;}
