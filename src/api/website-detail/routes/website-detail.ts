/**
 * website-detail router
 */


export default {
  routes: [
    {
      method: 'GET',
      path: '/website-details/:slug',
      handler: 'website-detail.getWebsiteDetailBySlug',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/website-details',
      handler: 'website-detail.create',
    },
    {
      method: 'GET',
      path: '/website-details',
      handler: 'website-detail.find',
    },
    {
      method: 'PATCH',
      path: '/website-details/:id',
      handler: 'website-detail.findOne',
    },
  ],
};
