'use strict';

const axios = require('axios');

module.exports.getAccessToken = async (event) => {

    const MEETUP_OAUTH_URL = 'https://secure.meetup.com/oauth2/access'
    + '?client_id=j6p3cec3fmrd5dkbismi8gi1o6'
    + '&client_secret=9gfe4aiunr8moohm9ta0l4l57g'
    + '&grant_type=authorization_code'
    + '&redirect_uri=https://the-gaffer-5.github.io/meetupclone/'
    + '&code=' + event.pathParameters.code;
    
    const info = await axios.post(MEETUP_OAUTH_URL);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://the-gaffer-5.github.io'
      },
      body: JSON.stringify({
        access_token: info.data.access_token,
        refresh_token: info.data.refresh_token,
      }),
    };
};
