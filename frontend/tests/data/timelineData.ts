import type { TimelineItem, TimelineProps, TimelineCardProps, FilterProps } from '@/types/timeline';

// 1. Mock List Data for Card Component (testing every conditional statement in timeline/Card.vue)
export const dummyTimelineCard: TimelineCardProps[] = [
  {
    // Scenario 1: All conditional checks evaluate to true (Header hrefs, body, subject body, end date, techStack)
    cls: ['timeline-card', 'timeline-active'],
    isVisible: true,
    data: {
      id: 1,
      isVisible: true,
      title: {
        label: "Connected Learning Institute",
        href: "https://example.com/academy"
      },
      location: {
        label: "Oslo, Norway",
        href: "https://maps.example.com/oslo"
      },
      date: {
        created: { current: "2025" },
        end: { current: "2026" }
      },
      body: {
        type: "root",
        children: [
          {
            type: "element",
            tag: "p",
            children: [{ type: "text", value: "This is a full-featured mock body text." }]
          }
        ]
      },
      subjects: [
        {
          title: {
            label: "Advanced Full-Stack Engineering",
            href: "https://example.com/courses/fullstack"
          },
          date: {
            created: { current: "2025" },
            end: { current: "2026" }
          },
          body: "Module details with complete descriptions.",
          techStack: [
            { src: "/icons/vue.svg", alt: "Vue Icon", type: "frontend" }
          ]
        }
      ]
    }
  },
  {
    // Scenario 2: All optional branches/else blocks are triggered (no title/location hrefs, no body, sub date end missing -> "Pågående", no sub body, no techStack)
    cls: ['timeline-card'],
    isVisible: false,
    data: {
      id: 2,
      isVisible: false,
      title: {
        label: "Static Vocational School"
      },
      location: {
        label: "Remote / Online Only"
      },
      date: {
        created: { current: "2024" }
      },
      body: {
        type: "root",
        children: [
          {
            type: "element",
            tag: "p",
            children: [{ type: "text", value: "Fallback content for Scenario 2." }]
          }
        ]
      },
      subjects: [
        {
          title: {
            label: "Basic Web Layouts"
          },
          date: {
            created: { current: "2024" }
          }
        }
      ]
    }
  },
  {
    // Scenario 3: Body present, empty subjects, location missing
    cls: ['timeline-card'],
    isVisible: true,
    data: {
      id: 3,
      isVisible: true,
      title: {
        label: "Body Only Card Scenario"
      },
      body: {
        type: "root",
        children: [
          {
            type: "element",
            tag: "p",
            children: [{ type: "text", value: "Mock innhold for å simulere tilstede body utan subjects." }]
          }
        ]
      },
      subjects: []
    }
  },
  {
    // Scenario 4: Multiple subjects with mixed expandable bodies and missing dates
    cls: ['timeline-card', 'timeline-active'],
    isVisible: true,
    data: {
      id: 4,
      isVisible: true,
      title: {
        label: "Multi-Subject Specialization",
        href: "https://example.com/specialization"
      },
      location: {
        label: "Bergen, Norway"
      },
      subjects: [
        {
          title: { label: "Subject A - Has Body & Tech", href: "https://example.com/sub-a" },
          date: { created: { current: "2023" }, end: { current: "2024" } },
          body: "Detailed markdown description for subject A.",
          techStack: [
            { src: "/icons/ts.svg", alt: "TypeScript Icon", type: "language" },
            { src: "/icons/nuxt.svg", alt: "Nuxt Icon", type: "framework" }
          ]
        },
        {
          title: { label: "Subject B - No Body, Ongoing" },
          date: { created: { current: "2025" } } // Triggers "Pågående"
        }
      ]
    }
  },
  {
    // Scenario 5: Missing / omitted body property (testing fallback when body is forgotten)
    cls: ['timeline-card'],
    isVisible: true,
    data: {
      id: 5,
      isVisible: true,
      title: {
        label: "Card With Forgotten Body"
      },
      location: {
        label: "Online"
      },
      subjects: []
    }
  }
];

// 2. Mock List Data for Filter Component (testing conditionals in Filter.vue)
export const dummyTimelineFilter: FilterProps[] = [
  {
    // Scenario 1: Has title, rangeMax > 0 (renders title and range slider controls)
    cls: ['timeline-filter', 'active-slider', 'input-custom'],
    data: {
      title: "Active Timeline Filter",
      range: {
        value: "2",
        step: 1,
        type: 'range',
        name: "timeline-input",
        rangeMax: 5
      }
    }
  },
  {
    // Scenario 2: No title (triggers fallback 'Untitled Timeline'), rangeMax <= 0 (skips rendering range input)
    cls: ['timeline-filter', 'static-filter'],
    data: {
      title: "",
      range: {
        value: "0",
        step: 0,
        type: 'range',
        name: "timeline-input",
        rangeMax: 0
      }
    }
  },
  {
    // Scenario 3: Empty string title, rangeMax > 0 (tests fallback 'Untitled Timeline' WITH active range input)
    cls: ['timeline-filter', 'fallback-title-active-slider'],
    data: {
      title: "",
      range: {
        value: "1",
        step: 0.5,
        type: 'range',
        name: "timeline-input",
        rangeMax: 3
      }
    }
  }
];

// 3. Mock List Data for Timeline Component (testing list states in Timeline.vue)
export const dummyTimeline: TimelineProps[] = [
  {
    // Scenario 1: Standard timeline container with active/inactive items (triggers auto-select first item if none visible)
    title: "Primary Educational Journey",
    cls: ['component-blue', 'timeline-container'],
    data: [
      {
        id: 1,
        isVisible: true,
        title: { label: "GET Academy", href: "https://getacademy.no" },
        location: { label: "Larvik" },
        date: { created: { current: "2025" } },
        body: {
          type: "root",
          children: [
            {
              type: "element",
              tag: "p",
              children: [{ type: "text", value: "Primary education timeline item body." }]
            }
          ]
        },
        subjects: []
      },
      {
        id: 2,
        isVisible: false,
        title: { label: "Harvard Online" },
        location: { label: "Remote" },
        date: { created: { current: "2024" } },
        body: {
          type: "root",
          children: [
            {
              type: "element",
              tag: "p",
              children: [{ type: "text", value: "Secondary education timeline item body." }]
            }
          ]
        },
        subjects: []
      }
    ]
  },
  {
    // Scenario 2: All items initially invisible (tests auto-initialization in Timeline.vue setup)
    title: "Uninitialized Timeline",
    cls: ['component-green', 'timeline-container-alt'],
    data: [
      {
        id: 10,
        isVisible: false,
        title: { label: "Self-Taught Development" },
        body: {
          type: "root",
          children: [
            {
              type: "element",
              tag: "p",
              children: [{ type: "text", value: "Self taught study body." }]
            }
          ]
        },
        subjects: []
      },
      {
        id: 11,
        isVisible: false,
        title: { label: "Open Source Contributions" },
        subjects: []
      }
    ]
  },
  {
    // Scenario 3: Empty timeline data array (edge case testing empty list)
    title: "Empty Timeline",
    cls: ['component-gray'],
    data: []
  }
];
