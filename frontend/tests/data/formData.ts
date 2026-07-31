import type { InputField, FormItem } from '@/types/forms';

// ----------------------------------------------------------------------
// 1. Testdata for inputs.vue (liste med alle varianter)
// ----------------------------------------------------------------------
export const dummyInputsData: InputField[] = [
    // 0: Fullversjon med alle valgfrie egenskaper satt
    {
        id: 'input-full-id',
        name: 'fullname',
        label: 'Fullt navn',
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
    // 1: Range input (rangeMin, rangeMax, step)
    {
        id: 'input-range-id',
        name: 'volume',
        label: 'Volum',
        type: 'range',
        rangeMin: 10,
        rangeMax: 90,
        step: 5,
        value: 50
    },
    // 2: File input med multiple
    {
        id: 'input-file-id',
        name: 'documents',
        label: 'Last opp filer',
        type: 'file',
        multiple: true
    },
    // 3: Minimal input (bruker standard fallbacks)
    {
        name: 'username'
    }
];

// ----------------------------------------------------------------------
// 2. Testdata for Form.vue (liste med alle varianter)
// ----------------------------------------------------------------------
export const dummyFormData: FormItem[] = [
    // 0: Fullstendig Form-objekt med alle valgfrie egenskaper og seksjoner
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
        fields: [
            {
                id: 'field-1',
                name: 'full_name',
                label: 'Navn',
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
                label: 'Vedlegg',
                type: 'file',
                multiple: true
            }
        ],
        selections: [
            {
                id: 'sel-1',
                label: 'Emneområde',
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
            label: 'Melding',
            placeholder: 'Beskriv henvendelsen i detalj...',
            rows: 8,
            cols: 60,
            maxlength: '500',
            required: true
        },
        dataList: {
            id: 'dl-1',
            name: 'preferred_tool',
            label: 'Foretrukket verktøy',
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
            label: 'Beregnet resultat',
            for: 'field-1'
        }
    },
    // 1: Minimalt Form-objekt (bruker standard fallbacks som rel='noopener', target='_self')
    {
        name: 'minimal-form',
        title: 'Enkel form',
        action: '/api/simple',
        fields: [
            { id: 'f-min', name: 'simple_input', label: 'Enkelt felt' }
        ]
    }
];
