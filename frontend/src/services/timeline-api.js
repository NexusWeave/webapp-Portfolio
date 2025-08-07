const timeline =
[
    {
        id: 0,
        year: 2010,
        title: 'Bygg og Anlegg',
        description: 'Fullført Bygg og Anlegg med gode resultater.',

        content:
        {
            school:
            {
                name: 'Borgund VGS',
                location: 'Ålesund, Norge',
                anchor:
                {
                    label: 'Borgund VGS Skole',
                    href: 'https://example.com/',
                },
            },

            anchor:
            {
                label: 'Vitnemål',
                href: 'https://example.com/vitnemal',
            },
        },
    },
    {
        id: 1,
        year: 2012,
        title: 'Helsefag',
        description: 'Fullført Helsefag med gode resultater.',

        content:
        {
            school :
            {
                name: 'Borgund VGS',
                location: 'Ålesund, Norge',
                anchor:
                {
                    label: 'Borgund VGS Skole',
                    href: 'https://example.com/',
                },
            },

            anchor:
            {
                label: 'Vitnemål',
                href: 'https://example.com/vitnemal',
            },
        },
    },
    {
        id: 2,
        year: 2022,
        title: 'CS50x :Introduction To Computer Science',
        description: 'Fullført Introduction To Computer Science with Python med gode resultater.',

        content:
        {
            school :
            {
                end: 2022,
                start: 2022,
                name: 'HarvardX',
                location: 'Nettbasert',
                description: 'Professional Certificate in Computer Science',

                anchor:
                {
                    type: ['external'],
                    label: 'HarvardX',
                    href: 'https://www.edx.org/school/harvardx',
                },
            },

            anchor:
            {
                label: 'Certified Certificate',
                href: 'https://courses.edx.org/certificates/cc7f7cb258a24538af14c876023cf932',
            },
        },
    },
    {
        id: 4,
        year: 2024,
        title: 'It- Utviklings faget',
        description: 'Fullført GetAcademy med gode resultater.',

        content:
        {
            school :
            {
                name: 'GetAcademy',
                location: 'Larvik, Vestfold, Norge',
                description: 'OnCampus / Nettbasert kurs fra GetAcademy',

                anchor:
                {
                    type: ['external'],
                    label: 'GetAcademy',
                    href: 'https://example.com/',
                },
            },

            anchor:-
            {
                label: 'Vitnemål',
                href: 'https://example.com/vitnemal',
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