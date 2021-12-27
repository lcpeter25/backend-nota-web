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

      if (translation.transcription) {
        const transcriptionObject = {
          id: translation.transcription.id,
          title: translation.transcription.title,
          themes: translation.transcription.themes,
          literary_genres: translation.transcription.literary_genres
        }
  
        translation.transcription = transcriptionObject;
      }

      return translation;
    });
  },
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.translation.findOne({id});

    const sanitizedEntity = await sanitizeEntity(entity, {
      model: strapi.models.translation,
    });

    delete sanitizedEntity.published_at;
    delete sanitizedEntity.created_at;
    delete sanitizedEntity.updated_at;

    if (sanitizedEntity.transcription) {
      const transcriptionObject = {
        id: sanitizedEntity.transcription.id,
        title: sanitizedEntity.transcription.title,
        themes: sanitizedEntity.transcription.themes,
        literary_genres: sanitizedEntity.transcription.literary_genres
      }

      sanitizedEntity.transcription = transcriptionObject;
    }

    return sanitizedEntity;
  },
};
