'use strict';

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.translation.search(ctx.query);
    } else {
      entities = await strapi.services.translation.find(ctx.query);
    }

    return entities.map(entity => {
      const translation = sanitizeEntity(entity, {
        model: strapi.models.translation,
      });
      
      translation.author = translation.author ? translation.author.name : null
  
      delete translation.published_at;
      delete translation.created_at;
      delete translation.updated_at;

      return translation;
    });
  },
};
