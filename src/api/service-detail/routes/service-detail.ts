/**
 * service-detail router
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/service-details/:slug',
      handler: 'service-detail.getServiceDetailBySlug',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/service-details/:slug',
      handler: 'service-detail.findOne',
      config: {
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/service-details',
      handler: 'service-detail.create',
    },
  ],
};
