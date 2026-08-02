export function generateHexID()
{    
    const ch: string = '0123456789abcdef';
    
    let result: string = '';
    const n: number = ch.length;
    for (let i = 0; i < n; i++) result += ch.charAt(Math.floor(Math.random() * n));

    return result;
}