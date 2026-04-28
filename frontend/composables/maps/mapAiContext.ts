import type { TimelineItem } from '~/types/timeline';

const extractMiniMarkDown = (text: string) => {
    if (!text) return '';
    const rawString = typeof text === 'string' ? text : JSON.stringify(text);

  // Forbedret vasking for å beholde mer struktur men fjerne JSON-støy
  const cleanText = rawString
    .replace(/"(p|strong|em|type|minimark|value|toc|links|title|depth|children|tag|props)"/g, '')
    .replace(/[\[\]{}:]/g, '')
    .replace(/"/g, '')
    .replace(/\\n/g, '\n') // Behold linjeskift
    .replace(/,/g, ' ')
    .replace(/\s\s+/g, ' ')
    .trim();

  return cleanText;
}

export const mapAiContext = (data: any[]) => {
    
    if (!data || data.length === 0) return 'Ingen relevant informasjon funnet.';
    
    const result = data.map(item => {
        const title = item.title || 'Informasjon';
        const body = item.body ? extractMiniMarkDown(item.body).replace(/searchDepth\d \d/g, '') : '';
        const summary = item.summary || item.ingress || '';
        const date = item.date || item.created || '';
        
        let techSummary = '';
        if (Array.isArray(item.techStack)) {
            if (typeof item.techStack[0] === 'object') {
                const uniqueCategories = [...new Set(item.techStack.map((t: any) => t.category))];
                techSummary = uniqueCategories.map(cat => {
                    const tools = item.techStack
                        .filter((t: any) => t.category === cat)
                        .map((t: any) => t.frameWork || t.label)
                        .join(', ');
                    return `${tools}`;
                }).join(', ');
            } else {
                techSummary = item.techStack.join(', ');
            }
        }

        let contextItem = `### ${title}\n`;
        if (date) contextItem += `- Dato/Periode: ${date}\n`;
        if (summary) contextItem += `- Sammendrag: ${summary.trim()}\n`;
        if (techSummary) contextItem += `- Teknologier: ${techSummary}\n`;
        if (body) contextItem += `\n**Detaljer:**\n${body.trim()}\n`;
        
        return contextItem;
    });

    return result.join('\n\n---\n\n');
}