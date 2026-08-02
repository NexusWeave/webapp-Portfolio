import type { TimelineItem, TimelineProps, TimelineCardProps, FilterProps } from '@/types/timeline';

// 1. Mock List Data for Card Component (testing every conditional statement in timeline/Card.vue)
export const dummyTimelineCard: TimelineCardProps[] = [
  {
    // Scenario 1: All conditional checks evaluate to true
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
    // Scenario 2: All optional branches/else blocks are triggered
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
  }
];

// 2. Mock List Data for Filter Component (testing conditionals in Filter.vue)
export const dummyTimelineFilter: FilterProps[] = [
  {
    // Scenario 1: Has title, rangeMax > 0 (renders range slider controls)
    cls: ['timeline-filter', 'active-slider'],
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
    // Scenario 2: No title (triggers fallback 'Untitled Timeline'), rangeMax <= 0 (skips rendering input)
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
  }
];

// 3. Mock List Data for Timeline Component (testing list states in Timeline.vue)
export const dummyTimeline: TimelineProps[] = [
  {
    title: "Primary Educational Journey",
    cls: ['component-blue', 'timeline-container'],
    data: [
      {
        id: 1,
        isVisible: true,
        title: { label: "GET Academy", href: "https://getacademy.no" },
        location: { label: "Larvik" },
        date: { created: { current: "2025" } },
        subjects: []
      },
      {
        id: 2,
        isVisible: false,
        title: { label: "Harvard Online" },
        location: { label: "Remote" },
        date: { created: { current: "2024" } },
        subjects: []
      }
    ]
  }
];
