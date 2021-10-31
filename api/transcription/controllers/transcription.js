'use strict';

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.transcription.search(ctx.query);
    } else {
      entities = await strapi.services.transcription.find(ctx.query);
    }

    return entities.map(entity => {
      const transcription = sanitizeEntity(entity, {
        model: strapi.models.transcription,
      });
      
      transcription.author = transcription.author ? transcription.author.name : null
      
      delete transcription.published_at;
      delete transcription.created_at;
      delete transcription.updated_at;

      return transcription;
    });
  },
};
