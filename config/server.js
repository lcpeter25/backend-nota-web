module.exports = ({ env }) => {
  console.log(env.int('PORT'))

  return ({
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    admin: {
      auth: {
        secret: env('ADMIN_JWT_SECRET', '557a0ad0672c2b070e90aca03150c80c'),
      },
    },
  })
};
