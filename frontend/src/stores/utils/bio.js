import { ReadTime, CalculateAge, CalculateDate } from './bioTools.js';

export function biography()
{
    //  Importing the links
    const mail = import.meta.env.VITE_Mail;
    const youtube = import.meta.env.VITE_Youtube;
    const facebook = import.meta.env.VITE_Facebook;
    const instagram = import.meta.env.VITE_Instagram;

    bio.current = {
        cls: "bio-bar",
        title: "Biography",
        get readtime() { return ReadTime(this.message)},
        headline: "Passionate Programmer And Fitness Enthusiast",                
        links:
        [
            {
                id  :0,
                exist: true,
                url :youtube,
                cls : "bio-link",
                icon:"bi bi-youtube",                        
            },
            {
                id  :1,
                exist: true,
                url :instagram,
                cls : "bio-link",
                icon:"bi bi-instagram",    
            },
            {
                id  :2,
                exist: true,
                url :facebook,
                cls : "bio-link",
                icon:"bi bi-facebook",   
            },
            {
                id  :3,
                url :mail,
                exist: true,
                cls : "bio-link",
                icon:"bi bi-mailbox",
            },                  
        ],

        message:
        [
            `The ideal lifestyle involves a balance between the passion 
            of technology and wellness. The free time is dedicated to
            Software developing, meditation, and physical activity and
            always on the outlook for a new challenge / adventure.`, 

            `In my spare time, I primarily focus on enhancing my proficiency
            in Python libraries, database management, piano, and philosophy.
            I am dedicated to both improving my less stronger areas and
            further developing my existing strengths. To achieve this, I
            regularly leverage a network of developers and online resources.`,

            `Some common opinions which has been encountered through my carerrier.
            Known for my dedication and strong work ethic, my colleagues appreciate
            my presence and contributions to our projects. I'm passionate about
            fostering a supportive work environment and excel at recognizing and
            utilizing the unique strengths of my team members. This makes me a valuable
            asset to the team`,
        ],
        

        author:
        {
            name:"Kristoffer Gjøsund",
            get age() {return CalculateAge([1994, 2, 25])},
            get born() {return CalculateDate([1994, 2, 25, 15])},
        },
    };
    
};

export function workProfile()
{
    // Importing the links
    const CV = import.meta.env.VITE_CV;
    const github = import.meta.env.VITE_Github;
    const linkedin = import.meta.env.VITE_LinkedIn;
            
    bio.current = {
        cls: "bio-bar",
        get readtime() { return ReadTime(this.message)},
        title: "Work Biography",
        
        headline: "Junior Software Developer",

        links:
        [
            {
                id  :0,
                exist: true,
                url :linkedin,
                cls :"bio-link",
                icon:"bi bi-linkedin",
            },
            {
                id  :1,
                exist: true,
                url :github,
                cls :"bio-link",
                icon:"bi bi-github",
            },
            {
                id  :2,
                url :CV,
                exist: true,
                cls :"bio-link",
                icon:"bi bi-file-person",
            },
        ],

        message:[
            `As an Application engineer
            Organization is key to my work, and I am dedicated to delivering
            high-quality code that is easy to read and maintain. I am passionate
            about creating software that is user-friendly and efficient. My
            experience in software development has taught me the importance of
            writing clean code that is easy to understand and maintain. I am
            dedicated to delivering high-quality software that meets the needs.
            of my clients and users. software is organized with comments, to give
            out a greater understanding of the develoment which is written,
            The projects are also organized  with a documentation.
            for a greater understanding of the project. The process of development
            includes a lot of simplicity at first, then Optimizion for a better
            performance. Through the journey as a software engineer, I have
            experienced that the best practice to ensure code quality is through
            test frameworks.`,
        ],
        
        author:
            {
                name:"Kristoffer Gjøsund",
                get age() {return CalculateAge([1994, 2, 25])},
                get born() {return CalculateDate([1994, 2, 25, 15])},

            },
        };
};

export function Journey()
{
    bio.current = {
        cls: "bio-bar",
        title   : "Journey",
        headline: "The Journey So Far",
        get readtime() { return ReadTime(this.message)},
        
        message :
        [
            `The journey into coding began in my teens when I discovered HTML and CSS.
            Joining the SitePoint community fueled the passion for software engineering,
            after a while and I was introduced to JavaScript. While I explored JavaScript,
            I found an amazing calling in back-end development. I chose to specialize in Python
            and database management, gaining practical experience through Discord projects. While
            prosuing the passion of programming I went to Get Academy vocational school To persue
            more complex understanding of fullstack development while doing classes at
            Harvard University' CS50.I am excited to apply my skills to more complex projects and
            continue growing as a developer. As a Get Academy student, I am dedicated to continuous
            learning and growth. I am available for part-time work and seeking a challenging role
            where I can apply my academic knowledge and gain practical experience under the mentorship
            of Industry expertise.`,
                    
            `I'm interested in joining a team that prioritizes continuous learning, mentorship, and
            Agile practices. the ideal career path involves progressing to a Senior Data Scientist
            position within an innovative and collaborative environment.`,
        ],
        author:
        {
            name:"Kristoffer Gjøsund",
            get age() {return CalculateAge([1994, 2, 25])},
            get born() {return CalculateDate([1994, 2, 25, 15])},
        }, 
    };
};

export function WorkoutBlog()
{
    bio.current = {
        title: "Workout Blog",
        headline: "Workout Blog",
        get readtime() { return ReadTime(this.message)},

        links: [],
        message: [],

        author:
        {
            name:"Kristoffer Gjøsund",
            get age() {return CalculateAge([1994, 2, 25])},
            get born() {return CalculateDate([1994, 2, 25, 15])},
        }, 
    };
};

export function PersonalBlog()
{
    bio = {
        title: "Workout Blog",
        headline: "Workout Blog",
        get readtime() { return ReadTime(this.message)},

        links: [],
        message: [],

        author:
        {
            name:"Kristoffer Gjøsund",
            get age() {return CalculateAge([1994, 2, 25])},
            get born() {return CalculateDate([1994, 2, 25, 15])},
        }, 
    };
};
