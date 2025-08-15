const timeline =
[
    {
        id: 0,
        year: 2010,
        title: 'Bygg og Anlegg',

        description: 
        {
            summary: 'Utviklet praktisk forståelse for byggeprosesser og materialer.',
        },

        content:
        {
            school:
            {
                start: 2010,
                end: 2011,
                name: 'Borgund VGS',
                location: ['Ålesund, Norge'],
                anchor:
                {
                    type: ['external'],
                    label: 'Borgund VGS Skole',
                    href: 'https://borgund.vgs.no/',
                },
            },
        },
    },
    {
        id: 1,
        year: 2011,
        title: 'Helse og Oppvekstfag',
        description:
        {
            summary: 'Utviklet grunnleggende kunnskap om helse, etikk, og mellommenneskelig kommunikasjon.',
        },

        content:
        {
            school :
            {
                end: 2014,
                start: 2011,
                name: 'Borgund VGS',
                location: ['Ålesund, Norge'],
                
                anchor:
                {
                    type: ['external'],
                    label: 'Borgund VGS Skole',
                    href: 'https://borgund.vgs.no/',
                },
            },
        },
    },
    {
        id: 2,
        year: 2022,
        title: 'CS50x :Introduction To Computer Science',
        description:
        {
            summary: 'Videre utviklet praktisk forståelse for programmering, algoritmer, og datastrukturer.',
        },

        content:
        {
            school :
            {
                end: 2022,
                start: 2022,
                name: 'HarvardX',
                location: ['Nettbasert'],
                tech: ['C', 'python', 'js', 'flask', 'Github'],
                description: 'Profesjonell sertifikat i Computer Science',

                anchor:
                {
                    type: ['external'],
                    label: 'HarvardX',
                    href: 'https://www.edx.org/school/harvardx',
                },
            },

            anchor:
            {
                label: 'Sertifisert sertifikat',
                href: 'https://courses.edx.org/certificates/cc7f7cb258a24538af14c876023cf932',
            },
        },
    },
    {
        id: 3,
        year: 2024,
        title: 'It- Utviklings faget',
        description:
        {
            summary: 'Godkjent kurs.',
        },

        content:
        {
            school :
            {
                end: 2024,
                start: 2024,
                name: 'GetAcademy',
                tech: ['C#', 'HTML', 'CSS', 'JS', 'vuejs', 'UML', 'Github'],
                location: ['Larvik, Vestfold, Norge', 'Hybrid undervisning'],
                description: '20 ukers hybrid intens undervisning',

                anchor:
                {
                    type: ['external'],
                    label: 'GetAcademy',
                    href: 'https://example.com/',
                },
            },
        },
    },
    {
        id: 4,
        year: 2025,
        title: 'Intern',
        description: {
            summary: 'Oppnådde praktisk erfaring med full-stack IT-utvikling.',
            list: [
                
                `Fikk hands-on erfaring med bruk av C# for backend-utvikling.`,
                `Fikk hands-on erfaring med frontend-utvikling med Vue.js og Sass.`,
                `Bidro aktivt til å etablere en effektiv teamdynamikk og samarbeidskultur`,
                
                
            ]
        },
        content:
        {
            employer :
            {
                start: 2025,
                //end: 2025,
                name: 'GetAcademy',
                location: ['Larvik, Vestfold, Norge', 'Hybrid'],
                tech: ['C#', 'Sass', 'vuejs', 'UML', 'Github'],
 
                anchor:
                {
                    type: ['external'],
                    label: 'GetAcademy',
                    href: 'https://example.com/',
                },
                attest:
                {
                    
                    href: '#',
                    type: ['pdf'],
                    label: 'Attest',
                },
            },

            
        },
    },
]

export const fetchData = async () =>
{
    return new Promise(resolve => {
        setTimeout(() => {resolve(timeline);}, 10);
    })
}