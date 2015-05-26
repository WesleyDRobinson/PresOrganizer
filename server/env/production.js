/*
    These environment variables are not hardcoded so as not to put
    production information in a repo. They should be set in your
    heroku (or whatever VPS used) configuration to be set in the
    applications environment, along with NODE_ENV=production

 */

module.exports = {
    "S3": {
        "SECRET_KEY": process.env.SECRET_KEY,
        "ACCESS_KEY": process.env.ACCESS_KEY,
        "BUCKET": process.env.BUCKET
    },
    "CLOUD_CONVERT": process.env.CLOUD_CONVERT,
    "DATABASE_URI": process.env.MONGOLAB_URI,
    "SESSION_SECRET": process.env.SESSION_SECRET,
    "TWITTER": {
        "consumerKey": process.env.TWITTER_CONSUMER_KEY,
        "consumerSecret": process.env.TWITTER_CONSUMER_SECRET,
        "callbackUrl": process.env.TWITTER_CALLBACK
    },
    "FACEBOOK": {
        "clientID": process.env.FACEBOOK_APP_ID,
        "clientSecret": process.env.FACEBOOK_CLIENT_SECRET,
        "callbackURL": process.env.FACEBOOK_CALLBACK_URL
    },
    "GOOGLE": {
        "clientID": process.env.GOOGLE_CLIENT_ID,
        "clientSecret": process.env.GOOGLE_CLIENT_SECRET,
        "callbackURL": process.env.CALLBACK_URL
    }
};