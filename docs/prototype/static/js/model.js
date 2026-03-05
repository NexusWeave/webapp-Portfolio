//  Model tree

const model =
{
    // Application state
    app: 
        {
            currentPage: "",
            currentCarosel:
                {
                    src: "./static/img/images/klar00.jpg",
                    alt: "Fra Klar kompetanse - fotograf Vestbris AS",
                    caption: "",
                },
        },


    //  Header, nav, main and footer
    header:
    {
        title: "Logic meets Emotions",
        cls: "container flex-wrap-row-justify-center",

    },
    nav:
    {
        cls : "navbar bg-brown flex-wrap-row-align-items-center",
        pages:
        [
            {
                id: 0,
                type: "button",
                name: "portefolio",
                title: "Portefølje",
            },
            {
                id: 1,
                name: "aboutMe",
                type: "button",
                title: "Om Kristoffer",
            },
            {
                id: 2,
                type: "button",
                name: "dev",
                title: "Dev",
            },
        ],
    },
    main:
    {
        cls:"main-container flex-wrap-column-align-items-center",
    },
    footer:
    {
        

        cls: "bg-brown footer-container flex-wrap-column-align-items-center-justify-space-evenly",
        contact:
        {
            cls: "contact-container flex-wrap-row-justify-space-evenly",
        },
    },

    
    //  Datasets for the webapplication
    data:
    {
        carousel:
        [

            {
                src: "./static/img/images/klar01.jpg",
                alt: "Fra Klar kompetanse - fotograf Vestbris AS",
                caption: "",
            },
            {
                src: "./static/img/images/klar02.jpg",
                alt: "Fra Klar kompetanse - kokk - Fotograf Karina Lange",
                caption: "",
            },
            {
                src: "./static/img/images/klar03.jpg",
                alt: "Fra Klar kompetanse - sveiser - Fotograf Karina Lange",
                caption: "",
            },
            {
                src: "./static/img/images/klar04.jpg",
                alt: "Teamet i KLAR kompetanse av Ellen Seljestokken, Rhonda Helen Nes Lothe, Hilde Vikse og Elina Tomren. Fotograf Benjamin Vikse",
                caption: "",
            },
        ],
        pages:
        [
            {
                id: 0,
                name: "portofolio",
                content:
                {
                    cls: "about-container flex-wrap-column-align-items-center",
                    headline: "SOSENT- Norge Sammen for et bærekraftig Norge",
                    text: "Kontakt oss gjerne for en kaffe prat",
                    banner:
                    {
                        src: "./static/img/sosent/Gemini_Generated_Image_opf6gwopf6gwopf6.jpeg",
                        alt: "SOSENT-Team.jpg",
                    },

                    paragraphs: 
                        [
                            {
                                heading:"Om oss",
                                paragraph: 
                                [
                                    `SosEnt Norge – Landsforeningen for sosiale entreprenører – er en interessepolitisk forening
                                    som søker å styrke og påvirke rammebetingelser og regelverk til beste for sosiale entreprenører i Norge.`,

                                    `Vi arbeider for å få etablert forståelsen og aksepten for denne 4. sektoren hos myndigheter,
                                    beslutningstakerne og de andre sektorene; offentlig, privat og frivillig.`,

                                    `Foreningen ønsker å være en kunnskapsbank for sosiale entreprenører, og
                                    en høringsinstans for saker som angår sosialt entreprenørskap. Vi vil rådgi
                                    våre medlemmer, gjøre tilgjengelig informasjon om støtte- og
                                    tilskuddsordninger og bidra med aktuelle tolkninger av forskrifter og
                                    regelverk. Vi vil også arrangere møteplasser og nettverk for sosiale
                                    entreprenører og andre som er interessert i sosialt entreprenørskap.`,

                                    `Foreningen etablerer fordelsprogram med aktuelle leverandører av varer,
                                    programvare og forsikringsordninger. Et medlemskap i SosEnt Norge lønner seg!`,

                                    `Foreningen ble stiftet i april 2025. Samfunnsbedriftene ivaretar foreningens
                                    sekretariat/sekretariatsfunksjoner, og generalsekretæren har sin ansettelse der`,

                                ] 
                            },
                    ],
                    constitution:
                    [
                        {
                            headline: "Virkeområde / Formål",
                            paragraphs: 
                            [
                                `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et eros vel
                                nunc scelerisque bibendum. Mauris et maximus diam, vitae convallis sem. In quis
                                porttitor purus. Proin eget erat sed libero vestibulum venenatis quis a dui.
                                Vestibulum fermentum diam vitae lorem maximus, ac elementum nulla rutrum. Aliquam
                                erat volutpat. Nam ac massa vel nunc scelerisque bibendum.`,
                            ],
                        },
                        {
                            headline: "Medlemskap",
                            paragraphs: [
                                `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et eros vel
                                nunc scelerisque bibendum. Mauris et maximus diam, vitae convallis sem. In quis
                                porttitor purus. Proin eget erat sed libero vestibulum venenatis quis a dui.
                                Vestibulum fermentum diam vitae lorem maximus, ac elementum nulla rutrum. Aliquam
                                erat volutpat. Nam ac massa vel nunc scelerisque bibendum.`,
                            ],
                        },
                        {
                            headline: "Organisasjonens styre",
                            paragraphs: [
                                `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et eros vel
                                nunc scelerisque bibendum. Mauris et maximus diam, vitae convallis sem. In quis
                                porttitor purus. Proin eget erat sed libero vestibulum venenatis quis a dui.
                                Vestibulum fermentum diam vitae lorem maximus, ac elementum nulla rutrum. Aliquam
                                erat volutpat. Nam ac massa vel nunc scelerisque bibendum.`,
                            ],
                        },
                        {
                            headline: "årsmøte",
                            paragraphs: [
                                `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et eros vel
                                nunc scelerisque bibendum. Mauris et maximus diam, vitae convallis sem. In quis
                                porttitor purus. Proin eget erat sed libero vestibulum venenatis quis a dui.
                                Vestibulum fermentum diam vitae lorem maximus, ac elementum nulla rutrum. Aliquam
                                erat volutpat. Nam ac massa vel nunc scelerisque bibendum.`,
                            ],
                        },
                        {
                            headline: "Aktiviteter",
                            paragraphs: [
                                `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et eros vel
                                nunc scelerisque bibendum. Mauris et maximus diam, vitae convallis sem. In quis
                                porttitor purus. Proin eget erat sed libero vestibulum venenatis quis a dui.
                                Vestibulum fermentum diam vitae lorem maximus, ac elementum nulla rutrum. Aliquam
                                erat volutpat. Nam ac massa vel nunc scelerisque bibendum.`,
                            ],
                        },
                        {
                            headline: "Forvaltning",
                            paragraphs: [
                                `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et eros vel
                                nunc scelerisque bibendum. Mauris et maximus diam, vitae convallis sem. In quis
                                porttitor purus. Proin eget erat sed libero vestibulum venenatis quis a dui.
                                Vestibulum fermentum diam vitae lorem maximus, ac elementum nulla rutrum. Aliquam
                                erat volutpat. Nam ac massa vel nunc scelerisque bibendum.`,
                            ],
                        },
                        {
                            headline: "Oppløsning",
                            paragraphs: [
                                `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et eros vel
                                nunc scelerisque bibendum. Mauris et maximus diam, vitae convallis sem. In quis
                                porttitor purus. Proin eget erat sed libero vestibulum venenatis quis a dui.
                                Vestibulum fermentum diam vitae lorem maximus, ac elementum nulla rutrum. Aliquam
                                erat volutpat. Nam ac massa vel nunc scelerisque bibendum.`,
                            ],
                        }, 
                    ],
                },
            },
            {
                id: 1,
                name: "aboutMe",
                content:
                {
                    cls: "news-container flex-wrap-row-justify-space-evenly",
                    headline:"SOSENT - Norge Nyheter",
                },
            },
            {
                id: 2,
                name: "dev",
                title: "Dev",
                content:
                {
                    updated: "2023",
                    cls: "vedtekter-article",
                    headline:"Vår fordelsprogram",
                    description: "Her finner du informasjon og ressurser for våre medlemmer.",
                    paragraphs:
                    [
                        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis arcu at eros sagittis fermentum.
                        Suspendisse sed libero interdum, placerat tellus at, congue libero. Pellentesque habitant morbi
                        tristique senectus et netus et malesuada fames ac turpis egestas. Proin lacus lorem, ultrices pharetra
                        vehicula vitae, placerat pellentesque massa. Quisque molestie nulla nibh, et malesuada augue consectetur
                        vitae. Pellentesque massa enim, pharetra et nisi non, sodales bibendum orci. Nunc magna augue, convallis
                        id quam at, imperdiet condimentum mauris. Sed lorem libero, porta ac magna et, efficitur accumsan nisi.
                        Proin eu orci viverra, interdum ligula eget, congue mauris. Praesent nulla augue, bibendum id quam non,
                        scelerisque auctor lorem. Morbi scelerisque, felis vestibulum commodo faucibus, est mauris accumsan turpis,
                        nec cursus mi massa in risus.`, 

                        `Etiam pharetra ligula at nibh rhoncus aliquet. Sed nec massa vulputate metus facilisis vestibulum.
                        Suspendisse bibendum ac magna vitae finibus. Aliquam ornare auctor enim eget feugiat. Maecenas justo elit,
                        commodo non pharetra non, elementum sed ipsum. Curabitur at libero eget erat aliquam pretium id id risus.
                        Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam at metus iaculis, imperdiet nibh eu,
                        iaculis orci. Quisque nec mi vel orci eleifend finibus. Nullam a porttitor mi. Aliquam consequat sodales
                        est sit amet ultrices. Mauris placerat tempor rutrum.`,

                        `Curabitur non imperdiet ligula. Etiam varius massa cursus nunc pulvinar, eget iaculis est venenatis.
                        Mauris dolor turpis, congue in tortor id, gravida ornare mauris. Nam tristique mattis est, vel vulputate
                        est mattis nec. Ut rhoncus interdum pharetra. Fusce tristique, metus fermentum accumsan posuere, enim lorem
                        gravida mauris, eget aliquam tortor metus id ipsum. Etiam sit amet placerat justo. Fusce quis elit ac leo
                        elementum aliquam. Nunc ac convallis augue, quis sagittis felis. Aenean mattis, dolor in dictum congue,
                        augue lorem condimentum lacus, in malesuada ante risus non nisl. Vestibulum dictum auctor augue, a faucibus
                        quam sodales vitae. In tincidunt nulla hendrerit, porttitor augue ut, faucibus lacus.`,

                        `Pellentesque consectetur felis sit amet vulputate condimentum. Sed accumsan nunc in dui tempor mollis.
                        Aenean suscipit ornare felis, vel luctus nibh. Nullam in velit eu ex tincidunt hendrerit eget nec urna.
                        Nulla tellus nisl, gravida eu ultricies vitae, tempor vitae velit. Phasellus ultricies sapien sed diam
                        elementum, quis dapibus eros luctus. Aenean consequat efficitur eros, sed lacinia mauris vulputate quis.
                        Sed tempor arcu sed sem tristique tempor. Maecenas vestibulum convallis erat, ac dignissim leo dignissim ac.
                        Integer a efficitur metus. Aliquam accumsan dignissim nunc, sed feugiat lectus sollicitudin id.`,

                        `Nulla laoreet orci libero, sit amet imperdiet diam dignissim sed. Proin molestie metus eu maximus accumsan.
                        Suspendisse mattis felis sed facilisis pharetra. Suspendisse eu purus in massa hendrerit fermentum. Etiam a mi
                        enim. In accumsan, ex eu tincidunt condimentum, sem tellus dignissim augue, vel eleifend arcu erat a lectus.
                        Donec non pellentesque mauris. Aenean vel pellentesque turpis. Maecenas ut nibh sed arcu imperdiet pretium.
                        In finibus eu sem et bibendum. Cras volutpat non felis in placerat. Integer aliquet euismod tincidunt. Duis
                        in elementum felis, vitae varius diam. Donec aliquet, libero vestibulum pretium suscipit, nibh ante eleifend
                        eros, eu suscipit felis diam vel neque. Nunc malesuada felis vitae imperdiet rhoncus. Aliquam quam lorem,aliquet at tristique quis, tristique id neque.`,
                    ]
                },

                credentials:
                {
                    password: "x",
                },
                loggedIn: false,
                archive:
                [
                ],
            },

        ],
        contact:
        {
            cls: "contact-container flex-wrap-row-justify-space-evenly",
            content:
            [
                {
                    name: "Helle V. Rødahl",
                    title: "Styreleder",
                    phone: "+47 12 34 56 78",
                    email: "helle@sosent.no",
                    image:
                        {
                            cls: "",
                            alt: "Helle V. Rødahl",
                            src: "./static/img/team/profil-helle-privat.jpg",
                        },
                },
                {
                    cls: "contact-container ",
                    name: "Rune J. Kvarme",
                    title: "Generalsekretær",
                    phone: "+47 12 34 56 78",
                    email: "rune@sosent.no",
                    image:
                        {
                            cls: "",
                            alt: "Rune J. Kvarme",
                            src: "./static/img/team/52700234381_5e75074f92_q.jpg",
                        },
                },
            ],
        },
        media:
        {
            images:
            {
                contact:
                [
                    {
                        id: 0,
                        alt: "contact",
                        cls:"card-img-top",
                        src: "./static/media/team/profil-helle-privat.jpg",
                    },
                    {
                        id: 1,
                        alt: "contact",
                        cls:"card-img-top",
                        src: "./static/media/team/52700234381_5e75074f92_q.jpg",
                    },
                ],

                logo:
                [
                    {
                        id: 0,
                        alt: "logic-meets-creativity.png",
                        src: "./static/media/logo/logic-meets-creative-solutions.png",
                        cls: "logo-container flex-wrap-row-align-items-center-justify-space-between",
                    },
                    {
                        id: 1,
                        alt: "SosEnT-favicon.png",
                        cls: "article-image",
                        src: "./static/media/logo/SosEnT-favicon.png",
                    },   
                ],

                partners:
                [
                    {
                        id: 0,
                        alt: "SosEnT Logo.png",
                        href: "https://sosent.no/",
                        src: "./static/media/partners/SosEnT-favicon.png",
                    },
                    {
                        id: 1,
                        alt: "SosEnT Logo.png",
                        href: "https://sosent.no/",
                        src: "./static/media/partners/SosEnT-favicon.png",
                    },
                ],

                news:
                [
                    {
                        id: 0,
                        cls: "article-image",
                        alt: "Styremøte-referat.jpeg",
                        category: ["styremøte", "referat"],
                        src: "./static/media/images/news/Gemini_Generated_Image_opf6gwopf6gwopf6.jpeg",
                    },
                    {
                        id: 1,
                        cls: "article-image",
                        category: ["default"],
                        alt: "SosEnT-favicon.png",
                        src: "./static/media/images/news/SosEnT-favicon.png",
                    },

                ],

                carousel:
                [
                    {
                        id: 0,
                        cls: "carousel-image",
                        alt: "SOSENT Banner",
                        src: "./static/media/images/carousel/klar00.jpg",
                    },
                    {
                        id: 1,
                        alt: "SOSENT Banner",
                        src: "./static/media/images/carousel/klar01.jpg",
                    },
                ]
            },

            files:
            [
                {
                    id: 0,
                    name: "Vedtekter",
                    date: "01.05.2025",
                    cls: "flex-column documents",
                    description: "PDF av organisasjonens vedtekter",
                    src: "./static/media/pdf/vedtekter.pdf",
                },
                {
                    id: 1,
                    name: "Organisasjons Kart",
                    date: "01.05.2025",
                    cls: "flex-column documents",
                    src: "./static/media/pdf/hierarki.pdf",
                    description: "PDF av organisasjonens Hieraki",
                },
            ],
        },
    },
} 