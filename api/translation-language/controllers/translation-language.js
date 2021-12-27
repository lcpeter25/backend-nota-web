'use strict';

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services['translation-language'].search(ctx.query);
    } else {
      entities = await strapi.services['translation-language'].find(ctx.query);
    }

    return entities.map(entity => {
      const translationLanguage = sanitizeEntity(entity, {
        model: strapi.models['translation-language'],
      });
      
      delete translationLanguage.translations
      delete translationLanguage.published_at;
      delete translationLanguage.created_at;
      delete translationLanguage.updated_at;

      return translationLanguage;
    });
  },
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services['translation-language'].findOne({id});

    const sanitizedEntity = await sanitizeEntity(entity, {
      model: strapi.models['translation-language'],
    });

    delete sanitizedEntity.translations
    delete sanitizedEntity.published_at;
    delete sanitizedEntity.created_at;
    delete sanitizedEntity.updated_at;


    return sanitizedEntity;
  },
};