interface LabelItem
{
    id: string;
    label: string;
    cls?: string[];
    isIcon?: Boolean;    
}

export interface InputProps 
{
    data: Record<string, string>;
    cls?: Array<string | string[]>;
    modelValue?: string | Number | Boolean;
}

export interface LabelProps { data: LabelItem; cls?: string[]; }
export interface SchemaProps { cls?: Array<any>; data: Record<string, any> }