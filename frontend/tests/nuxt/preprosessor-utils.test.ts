import { describe, it, expect } from 'vitest';
import { sortbyDate, setDateFormat, useCarousel, useNavigation } from '#imports';
import { sortObject, expectedSort, setDateFormatData, setDateFormatData_1, setDateFormatExpected,setDateFormatExpected_1 } from '../data/preprosessor-data';


describe('Preprocessor Utils', () => {
    describe('SortbyDate()', () => {
        it('Should return a sorted ascendig list of dates, based on creation date', () => {
            expect(sortbyDate(sortObject, 'ascending')).toEqual(expectedSort);
        });

        it('Should return a sorted descendig list of dates, based on creation date', () => {
            expect(sortbyDate(sortObject)).toEqual(expectedSort.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()));
        });
    });

    describe('setDateFormat()', () => {
        it('Should return a formated date object', () => {
            expect(setDateFormat(setDateFormatData)).toEqual(setDateFormatExpected);
        });

        it('Should return updated object', () => {
            expect(setDateFormat(setDateFormatData_1)).toEqual(setDateFormatExpected_1);
        });
    });

    describe('useCarosuel()', () => {
        it('', () => {
            expect(true).toBe(true);
        });
    });
    describe('useNavigation()', () => {
        it('', () => {
            expect(true).toBe(true);
        });
    });
});