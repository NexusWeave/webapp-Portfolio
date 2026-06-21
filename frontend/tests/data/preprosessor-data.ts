import type { DateItem } from '~/types/date';


export const sortObject = [
    { created: new Date('2024-02-01') },
    { created: new Date('2024-11-01') },
    { created: new Date('2024-03-01') },
    { created: new Date('2024-04-01') },
    { created: new Date('2024-12-01') },
    { created: new Date('2024-06-01') },
    { created: new Date('2024-10-28') },
    { created: new Date('2024-10-01') },
    { created: new Date('2024-08-01') },
    { created: new Date('2024-01-01') },
];

export const expectedSort = [
    { created: new Date('2024-01-01') },
    { created: new Date('2024-02-01') },
    { created: new Date('2024-03-01') },
    { created: new Date('2024-04-01') },
    { created: new Date('2024-06-01') },
    { created: new Date('2024-08-01') },
    { created: new Date('2024-10-01') },
    { created: new Date('2024-10-28') },
    { created: new Date('2024-11-01') },
    { created: new Date('2024-12-01') },
];

// SetDateFormat data
export const setDateFormatData: DateItem = { date: new Date('1994-02-25T14:00:00.000Z').toISOString() }
export const setDateFormatData_1: DateItem = {
    date: new Date('1994-02-25T14:00:00.000Z').toISOString(),
    updated: new Date('1994-03-01T14:00:00.000Z').toISOString()
}

// SetDateFormat expected
export const setDateFormatExpected: DateItem = {
    updated: null,
    time: '15:00',
    delimiter : 'dot',
    text : 'Publisert',
    date: 'fre. 25. feb. 1994'
};

export const setDateFormatExpected_1: DateItem = {
    time: '15:00',
    text : 'Oppdatert',
    delimiter : 'dot',
    date: 'fre. 25. feb. 1994',
    updated: 'tir. 1. mars 1994'
};