'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {

  find(params, populate) {
    return strapi.query('translation').find(params, ["transcription", "transcription.literary_genres", "transcription.themes"]);
  },
  findOne(params, populate) {
    return strapi.query('translation').find(params, ["transcription", "transcription.literary_genres", "transcription.themes"]);
  },


};
