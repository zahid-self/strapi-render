/**
 * scraping-attempt router
 */


export default {
  routes: [
    {
      method: 'GET',
      path: '/scraping-attempts/count',
      handler: 'scraping-attempt.countAttempts',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/scraping-attempts',
      handler: 'scraping-attempt.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/scraping-attempts',
      handler: 'scraping-attempt.create',
    },
    {
      method: 'GET',
      path: '/scraping-attempts/filter',
      handler: 'scraping-attempt.getAttemptsByWebsite',
      config: {
        auth: false,
      },
    },
  ],
};

