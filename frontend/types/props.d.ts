import type { LanguageData } from './data';


interface ProgressItem extends LanguageData { type: string; percentage: number; }

export interface ProgressProps { data: ProgressItem; cls?: string[]; }