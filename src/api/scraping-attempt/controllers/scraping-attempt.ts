/**
 * scraping-attempt controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::scraping-attempt.scraping-attempt',
  ({ strapi }) => ({
    async countAttempts(ctx) {
      const { serviceName, targetWebsite } = ctx.query;

      if (!serviceName || !targetWebsite) {
        return ctx.badRequest('Query data is required');
      }

      const totalAttempts = await strapi.db
        .query('api::scraping-attempt.scraping-attempt')
        .count({
          where: {
            serviceName,
            targetUrl: { $contains: targetWebsite }, // Check if targetUrl contains targetWebsite
            published_at: { $ne: null },
          },
        });

      const successfulAttempts = await strapi.db
        .query('api::scraping-attempt.scraping-attempt')
        .count({
          where: {
            serviceName,
            targetUrl: { $contains: targetWebsite }, // Check if targetUrl contains targetWebsite
            success: true,
            published_at: { $ne: null },
          },
        });
      const successPercentage =
        totalAttempts > 0 ? (successfulAttempts / totalAttempts) * 100 : 0;

      ctx.body = {
        totalAttempts,
        successfulAttempts,
        successPercentage: successPercentage.toFixed(2),
      };
    },
    async getAttemptsByWebsite(ctx) {
      const { website } = ctx.query;

      const attempts = await strapi.db
        .query('api::scraping-attempt.scraping-attempt')
        .findMany({
          where: {
            ...(website ? { targetUrl: { $contains: website } } : {}),
            published_at: { $ne: null },
          },
        });

      // Define the type for a single attempt
      type ScrapingAttempt = {
        serviceName: string;
        success: boolean;
        duration: string;
        apiCost: string;
      };

      // Group attempts by service name
      const groupedAttempts = attempts.reduce<
        Record<string, ScrapingAttempt[]>
      >((acc, attempt) => {
        if (!acc[attempt.serviceName]) {
          acc[attempt.serviceName] = [];
        }
        acc[attempt.serviceName].push(attempt);
        return acc;
      }, {});

      // Calculate success rate for each service
      const serviceStatsPromises = Object.entries(groupedAttempts).map(
        async ([name, serviceAttempts]) => {
          const totalAttempts = serviceAttempts.length;
          const successfulAttempts = serviceAttempts.filter(
            (attempt) => attempt.success,
          ).length;
          const successRate =
            totalAttempts > 0 ? (successfulAttempts / totalAttempts) * 100 : 0;

          // Calculate average duration in seconds
          const totalDurationMs = serviceAttempts.reduce((sum, attempt) => {
            return sum + parseInt(attempt.duration, 10);
          }, 0);
          const averageDurationSeconds = totalDurationMs / totalAttempts / 1000; // Convert to seconds

          const service = await strapi.db
            .query('api::service-detail.service-detail')
            .findOne({
              where: {
                slug: name.toLowerCase(),
              },
            });

          const websiteDetails = await strapi.db
            .query('api::website-detail.website-detail')
            .findOne({
              where: {
                slug: String(website).toLowerCase(),
              },
            });

          console.log(serviceAttempts[0]);

          return {
            name,
            serviceDetails: service,
            websiteDetails,
            success_rate: `${successRate.toFixed(2)}%`,
            speed: `${averageDurationSeconds.toFixed(2)}s`, // Now in seconds,\
            apiCost: serviceAttempts[0].apiCost,
            message: 'success',
          };
        },
      );

      console.log('Before resolving promises');
      const serviceStats = await Promise.all(serviceStatsPromises);

      ctx.body = serviceStats;
    },
  }),
);

