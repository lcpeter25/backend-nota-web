'use strict';

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services['lesson-plan'].search(ctx.query);
    } else {
      entities = await strapi.services['lesson-plan'].find(ctx.query);
    }
    return entities.map(entity => {
      const lessonPlans = sanitizeEntity(entity, {
        model: strapi.models['lesson-plan'],
      });
      
      lessonPlans.authors = lessonPlans.authors.map(author => {

        return {
          name: author.name,
          id: author.id
        }
      })
      
      delete lessonPlans.published_at;
      delete lessonPlans.created_at;
      delete lessonPlans.updated_at;

      return lessonPlans;
    });
  },
};
