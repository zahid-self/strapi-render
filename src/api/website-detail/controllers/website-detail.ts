/**
 * website-detail controller
 */

import { factories } from '@strapi/strapi'


export default factories.createCoreController(
  'api::website-detail.website-detail',
  ({ strapi }) => ({
    async getWebsiteDetailBySlug(ctx) {
      const { slug } = ctx.params;
      const websiteDetail = await strapi.db
        .query('api::website-detail.website-detail')
        .findOne({
          where: { slug },
        });
      ctx.body = {
        websiteDetail,
      };
    },
  }),
);

