import { dummyApp } from '../utils/utils';
import { sortbyDate, setDateFormat, useNavigation } from '#imports';
import { useRotateCollections } from '~/composables/preprosessor-utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
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

    describe('useRotateCollections()', () => {
        const timer = 1000;
        const index: number = 5;

        beforeEach(() => vi.useFakeTimers() );
        afterEach(() => vi.useRealTimers() );

        it('Initialize random index within bounds', () => {
            const [carousel] = dummyApp(() => useRotateCollections(index))

            const value = carousel.index.value;
            expect(value).toBeLessThanOrEqual(5);
            expect(value).toBeGreaterThanOrEqual(0);

        });

        it('Increase index over time when started', () => {
            const [carousel] = dummyApp(() => useRotateCollections(index, timer));
            const value = carousel.index.value;
            carousel.start()

            vi.advanceTimersByTime(timer * 1);
            expect(value).toBe(value % index);

            vi.advanceTimersByTime(timer * 2);
            expect(value).toBe(value % index);
        });
        
        it('Index does not go out of bound', () => {
            const [carousel] = dummyApp(() => useRotateCollections(index, timer * 6))
            const value = carousel.index.value;
            carousel.start()

            vi.advanceTimersByTime(timer * 1);
            expect(value).greaterThan(-1);
            expect(value).lessThan(index + 1);

            vi.advanceTimersByTime(timer * 6)
            expect(value).greaterThanOrEqual(0);
            expect(value).lessThanOrEqual(index);
        });
    });
    describe('useNavigation()', () => {
        it('', () => {
            expect(true).toBe(true);
        });
    });
});