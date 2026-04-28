export function generateHexID()
{    
    const ch: string = '0123456789abcdef';
    
    let result: string = '';
    const n: number = ch.length;
    for (let i = 0; i < n; i++) result += ch.charAt(Math.floor(Math.random() * n));

    return result;
}

export function truncateText(text: string, limit: number): string {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
}

export function getFallbackText(text: string | undefined | null, fallback: string = 'Bilde mangler'): string {
    return text && text.trim() !== '' ? text : fallback;
}