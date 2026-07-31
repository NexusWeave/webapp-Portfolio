export interface InputField {
    id?: string;
    name: string;
    label?: string;
    placeholder?: string;
    type?: string;
    value?: string | number | boolean;
    size?: string | number;
    width?: string | number;
    height?: string | number;
    pattern?: string;
    readonly?: boolean;
    required?: boolean;
    disabled?: boolean;
    maxlength?: string | number;
    minlength?: string | number;
    autofocus?: boolean;
    multiple?: boolean;
    rangeMin?: number;
    rangeMax?: number;
    step?: number;
}

export interface SelectOption {
    id: number | string;
    value: string | number;
    label: string;
}

export interface FormSelection {
    id: number | string;
    label: string;
    multiple?: boolean;
}

export interface FormTextarea {
    id?: string;
    name: string;
    label?: string;
    placeholder?: string;
    rows?: number | string;
    cols?: number | string;
    maxlength?: number | string;
    required?: boolean;
}

export interface FormDataList {
    id?: string;
    name: string;
    label?: string;
    list: string;
    placeholder?: string;
    required?: boolean;
    options: SelectOption[];
}

export interface FormOutput {
    id?: string;
    name: string;
    label?: string;
    for?: string;
}

export interface FormItem {
    name?: string;
    title: string;
    action?: string;
    rel?: string;
    target?: string;
    novalidate?: boolean;
    encrypted?: boolean;
    autocomplete?: string;
    acceptcharset?: string;
    fields?: InputField[];
    selections?: FormSelection[];
    selectOptions?: SelectOption[];
    textarea?: FormTextarea;
    dataList?: FormDataList;
    outputs?: FormOutput;
}

export interface FormProps {
    data: FormItem;
}

export interface InputProps {
    data: InputField;
    cls?: string[];
    modelValue?: string | number | boolean;
}
