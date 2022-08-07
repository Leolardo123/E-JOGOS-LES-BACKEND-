const auth = {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '365d',
  },
};

export { auth };
