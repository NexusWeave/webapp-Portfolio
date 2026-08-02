export interface InputField {
    id?: string;
    name: string;
    step?: number;
    type?: string;
    pattern?: string;
    rangeMin?: number;
    rangeMax?: number;
    readonly?: boolean;
    required?: boolean;
    disabled?: boolean;
    multiple?: boolean;
    autofocus?: boolean;
    placeholder?: string;
    size?: string | number;
    width?: string | number;
    height?: string | number;
    maxlength?: string | number;
    minlength?: string | number;
    value?: string | number | boolean;
    label?: { name:string; label:string; }
}

export interface SelectonOption {
    id: number | string;
    value: string | number;
}

export interface FormSelection {
    multiple?: boolean;
    id: number | string;
    label?: { name:string; label:string; }
}

export interface FormTextarea {
    id?: string;
    name: string;
    required?: boolean;
    placeholder?: string;
    rows?: number | string;
    cols?: number | string;
    maxlength?: number | string;
    label?: { name:string; label:string; }
}

export interface FormDataList {
    id?: string;
    name: string;
    list: string;
    required?: boolean;
    placeholder?: string;
    options: SelectonOption[];
    label?: { name:string; label:string; }
}

export interface FormOutput {
    id?: string;
    name: string;
    for?: string;
    label?: { name:string; label:string; }
}

export interface FormItem {
    name?: string;
    method?: string;
    title: string;
    rel?: string;
    action?: string;
    target?: string;
    encrypted?: boolean;
    novalidate?: boolean;
    outputs?: FormOutput;
    inputs?: InputField[];
    autocomplete?: string;
    acceptcharset?: string;
    textarea?: FormTextarea;
    dataList?: FormDataList;
    selections?: FormSelection[];
    selectionOptions?: SelectonOption[];
}

export interface FormProps { data: FormItem; }

export interface InputProps {
    cls?: string[];
    data: InputField;
    modelValue?: string | number | boolean;
}
