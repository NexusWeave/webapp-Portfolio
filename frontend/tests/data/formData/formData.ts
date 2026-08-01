import type { InputField, FormItem, FormDataList, FormOutput, FormSelection, SelectonOption, FormTextarea } from '@/types/form';

// ----------------------------------------------------------------------
// 1. Testdata for inputs.vue
// ----------------------------------------------------------------------
export const dummyInputsData: InputField[] = [
    {
        id: 'input-full-id',
        name: 'fullname',
        label: { name: 'fullname', label: 'Fullt navn' },
        placeholder: 'Skriv ditt fulle navn',
        type: 'text',
        value: 'Ola Nordmann',
        size: '40',
        width: '300',
        height: '40',
        pattern: '[A-Za-z ]+',
        readonly: true,
        required: true,
        disabled: false,
        maxlength: '50',
        minlength: '2',
        autofocus: true
    },
    {
        id: 'input-range-id',
        name: 'volume',
        label: { name: 'volume', label: 'Volum' },
        type: 'range',
        rangeMin: 10,
        rangeMax: 90,
        step: 5,
        value: 50
    },
    {
        id: 'input-file-id',
        name: 'documents',
        label: { name: 'documents', label: 'Last opp filer' },
        type: 'file',
        multiple: true
    },
    {
        name: 'username'
    }
];

// ----------------------------------------------------------------------
// 2. Testdata for Form.vue
// ----------------------------------------------------------------------
export const dummyFormData: FormItem[] = [
    {
        name: 'comprehensive-contact-form',
        title: 'Kontakt og tilbakemelding',
        action: '/api/contact/submit',
        rel: 'external',
        target: '_blank',
        novalidate: true,
        encrypted: true,
        autocomplete: 'on',
        acceptcharset: 'ISO-8859-1',
        inputs: [
            {
                id: 'field-1',
                name: 'full_name',
                label: { name: 'full_name', label: 'Navn' },
                type: 'text',
                placeholder: 'Ditt navn',
                size: '35',
                width: '250',
                height: '35',
                pattern: '[A-Z][a-z]+',
                readonly: false,
                required: true,
                disabled: false,
                maxlength: '40',
                minlength: '2',
                autofocus: true
            },
            {
                id: 'field-2',
                name: 'attachment',
                label: { name: 'attachment', label: 'Vedlegg' },
                type: 'file',
                multiple: true
            }
        ],
        selections: [
            {
                id: 'sel-1',
                label: { name: 'sel-1', label: 'Emneområde' },
                multiple: true
            }
        ],
        selectOptions: [
            { id: 1, value: 'tech', label: 'Teknisk støtte' },
            { id: 2, value: 'billing', label: 'Fakturering' }
        ],
        textarea: {
            id: 'txt-1',
            name: 'message_body',
            label: { name: 'message_body', label: 'Melding' },
            placeholder: 'Beskriv henvendelsen i detalj...',
            rows: 8,
            cols: 60,
            maxlength: '500',
            required: true
        },
        dataList: {
            id: 'dl-1',
            name: 'preferred_tool',
            label: { name: 'preferred_tool', label: 'Foretrukket verktøy' },
            list: 'tools-list',
            placeholder: 'Velg eller skriv inn verktøy',
            required: true,
            options: [
                { id: 1, value: 'nuxt', label: 'Nuxt 3' },
                { id: 2, value: 'vue', label: 'Vue.js' }
            ]
        },
        outputs: {
            id: 'out-1',
            name: 'calculation_output',
            label: { name: 'calculation_output', label: 'Beregnet resultat' },
            for: 'field-1'
        }
    },
    {
        name: 'minimal-form',
        title: 'Enkel form',
        action: '/api/simple',
        inputs: [
            { id: 'f-min', name: 'simple_input', label: { name: 'simple_input', label: 'Enkelt felt' } }
        ]
    }
];

// ----------------------------------------------------------------------
// 3. Testdata for FormDatalist
// ----------------------------------------------------------------------
export const dummyDatalistData: FormDataList = {
    id: 'dl-test',
    name: 'test-datalist',
    list: 'options-list',
    options: [
        { id: 1, value: 'val-1', label: 'Label 1' },
        { id: 2, value: 'val-2', label: 'Label 2' }
    ],
    label: { name: 'test-datalist', label: 'Datalist Label' }
};

// ----------------------------------------------------------------------
// 4. Testdata for FormOutput
// ----------------------------------------------------------------------
export const dummyOutputData: FormOutput = {
    id: 'out-test',
    name: 'test-output',
    for: 'field-id',
    label: { name: 'test-output', label: 'Output Label' }
};

// ----------------------------------------------------------------------
// 5. Testdata for FormSelection
// ----------------------------------------------------------------------
export const dummySelectionData: FormSelection = {
    id: 'select-test',
    multiple: false,
    label: { name: 'select-test', label: 'Select Label' }
};

export const dummySelectOptions: SelectonOption[] = [
    { id: 1, value: 'opt-1', label: 'Option 1' },
    { id: 2, value: 'opt-2', label: 'Option 2' }
];

// ----------------------------------------------------------------------
// 6. Testdata for FormTextarea
// ----------------------------------------------------------------------
export const dummyTextareaData: FormTextarea = {
    id: 'text-test',
    name: 'test-textarea',
    placeholder: 'Type here...',
    rows: 5,
    cols: 40,
    required: true,
    label: { name: 'test-textarea', label: 'Textarea Label' }
};
