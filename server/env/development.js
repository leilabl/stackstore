module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/fsg-app",
  "SESSION_SECRET": "Optimus Prime is my real dad",
  "TWITTER": {
    "consumerKey": "PdxSBwKvk7y2uN7JtPead1PvH",
    "consumerSecret": "ViZZ2z6nwNvwxpV8rLk0beFT8etBE4g4VPkLnqKaKuNv3d240a",
    "callbackUrl": "http://127.0.0.1:1337/auth/twitter/callback"
  },
  "FACEBOOK": {
    "clientID": "621263894688175",
    "clientSecret": "301c193ba7b538a7f3ec8283df512f4f",
    "callbackURL": "http://127.0.0.1:1337/auth/facebook/callback"
  },
  "GOOGLE": {
    "clientID": "294007168186-94jj7rpp5rjdnqfmi48bnin9geallau8.apps.googleusercontent.com",
    "clientSecret": "xmzOUvNkRG36sslp_dOmHFQ9",
    "callbackURL": "http://127.0.0.1:1337/auth/google/callback"
  }
};