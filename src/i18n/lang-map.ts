export const langMap = {
  "/": {
    about: { title: "[string]", description: "[string]", contact: "[string]" },
    expertise: {
      title: "[string]",
      description: "[string]",
      areas: [
        {
          title: "[string]",
          description: "[string]",
          icon: "[string]",
        },
      ],
    },
    services: {
      title: "[string]",
      description: "[string]",
      learnMore: "[string]",
      items: [
        {
          title: "[string]",
          description: "[string]",
          icon: "[string]",
          features: ["[string]"],
          href: "[string]",
        },
      ],
    },
    blog: {
      title: "[string]",
      description: "[string]",
      readMore: "[string]",
      viewAll: "[string]",
    },
    contact: {
      title: "[string]",
      description: "[string]",
      getInTouch: "[string]",
    }
  },
  "/consulting": {
    about: {
      title: "[string]",
      description: "[string]",
      exploreServices: "[string]",
      requestConsultation: "[string]",
    },
    expertise: {
      title: "[string]",
      description: "[string]",
      areas: [
        {
          title: "[string]",
          description: "[string]",
          icon: "[string]",
        },
      ],
    },
    engagementModels: {
      title: "[string]",
      description: "[string]",
      getStarted: "[string]",
      tabs: [
        {
          title: "[string]",
          items: [
            {
              isMostPopular: true as boolean,
              title: "[string]",
              description: "[string]",
              price: "[string]",
              modifier: "[string]",
              features: ["[string]"],
              timeline: "[string]",
            },
          ],
        },
      ],
    },
    faq: {
      title: "[string]",
      description: "[string]",
      items: [
        {
          question: "[string]",
          answer: "[string]",
        },
      ],
    },
    contact: {
      title: "[string]",
      description: "[string]",
      getInTouch: "[string]",
    },
  },
  "/mentorship": {
    about: {
      title: "[string]",
      description: "[string]",
      exploreMentorshipPlans: "[string]",
      requestMentorship: "[string]",
    },
    expertise: {
      title: "[string]",
      description: "[string]",
      areas: [
        {
          title: "[string]",
          description: "[string]",
          icon: "[string]",
        },
      ],
    },
    mentorshipPlans: {
      title: "[string]",
      description: "[string]",
      getStarted: "[string]",
      tabs: [
        {
          title: "[string]",
          items: [
            {
              isMostPopular: true as boolean,
              title: "[string]",
              description: "[string]",
              price: "[string]",
              modifier: "[string]",
              features: ["[string]"],
              timeline: "[string]",
            },
          ],
        },
      ],
    },
    successStories: {
      title: "[string]",
      description: "[string]",
      items: [
        {
          name: "[string]",
          photoUrl: "[string]",
          role: "[string]",
          feedback: "[string]",
        },
      ],
    },
    faq: {
      title: "[string]",
      description: "[string]",
      items: [
        {
          question: "[string]",
          answer: "[string]",
        },
      ],
    },
    contact: {
      title: "[string]",
      description: "[string]",
      getInTouch: "[string]",
    },
  },
  "/contact": {
    about: {
      title: "[string]",
      description: "[string]",
      getInTouch: "[string]",
    },
    contactMe: {
      letsConnect: "[string]",
      description: "[string]",
      contactInfo: {
        email: "[string]",
        emailValue: "[string]",
        phone: "[string]",
        phoneValue: "[string]",
        location: "[string]",
        locationValue: "[string]",
      },
      contactForm: {
        title: "[string]",
        description: "[string]",
        name: { label: "[string]", placeholder: "[string]" },
        email: { label: "[string]", placeholder: "[string]" },
        message: { label: "[string]", placeholder: "[string]" },
        subject: {
          label: "[string]",
          placeholder: "[string]",
          options: [
            {
              label: "[string]",
              value: "[string]",
            },
          ],
        },
        sendMessage: "[string]",
        successMessage: "[string]",
        errorMessage: "[string]",
      },
    },
  },
} as const;

export type LangMap = typeof langMap;
