interface inputItem extends inputBase
{
    size?: number;
    step?: number;
    width?: string;
    height?: string;
    prompt?: string;
    rangeMin?: number;
    rangeMax?: number;
    multiple?: boolean;
    required?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    minlength?: number;
    maxlength?: number;
    autofocus?: boolean;
    placeholder?: string;
    autocomplete?: string;
}
export interface InputProps
{
    data: inputItem; cls?: Array<string | string[]>;
}

interface LabelItem { id: string; label: string; cls?: string[]; isIcon?: Boolean; }
interface inputBase { id: string; cls?: string[]; type?: string; name: string; label?: LabelItem; modelValue?: string | Number | Boolean; }

export interface LabelProps { data: LabelItem; cls?: string[]; }
export interface SchemaProps { cls?: string[];  data: SchemaItem; }
interface SchemaItem { name: string; rel?: string; title?: string; action?: string; encrypted?: string; autocomplete?: 'on'; novalidate?: boolean; acceptcharset?: string; btn?: Array<Record<string, any>>; method?: 'post' | 'put' | 'delete'; target?: '_blank' | '_parent' | '_top'; inputControl?: inputItem[]; }