/**
 * service-detail controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::service-detail.service-detail',
  ({ strapi }) => ({
    async getServiceDetailBySlug(ctx) {
      const { slug } = ctx.params;
      const serviceDetail = await strapi.db
        .query('api::service-detail.service-detail')
        .findOne({
          where: { slug },
        });
      ctx.body = {
        serviceDetail,
      };
    },
  }),
);
