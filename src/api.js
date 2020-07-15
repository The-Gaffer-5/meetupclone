import axios from 'axios'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

async function getAccessToken() {
  const accessToken = localStorage.getItem('access_token');
  if(!accessToken) {
    const searchParams = new URLSearchParams(window.location.search);
    let code = searchParams.get('code');  
    if(!code) {
      window.location.href = 'https://secure.meetup.com/oauth2/authorize?client_id=j6p3cec3fmrd5dkbismi8gi1o6&response_type=code&redirect_uri=https://the-gaffer-5.github.io/meetupclone/';
      return null
    }
    return getOrRenewAccessToken('get', code)
  }
  const lastSavedTime = localStorage.getItem('last_saved_time');
  
  if (accessToken && (Date.now() - lastSavedTime < 3600000)) {
    return accessToken;
  }
  const refreshToken = localStorage.getItem('refresh_token');
  return getOrRenewAccessToken('renew', refreshToken);
}

async function getOrRenewAccessToken(type, key) {
  let url;
  if (type === 'get') {
    url = 'https://3p32az0goa.execute-api.us-east-2.amazonaws.com/dev/api/token/' + key;
  } else if (type === 'renew') {
    url = 'https://3p32az0goa.execute-api.us-east-2.amazonaws.com/dev/api/refresh/' + key;
  }
  const tokenInfo = await axios.get(url);
  localStorage.setItem('access_token', tokenInfo.data.access_token);
  localStorage.setItem('refresh_token', tokenInfo.data.refresh_token);
  localStorage.setItem('last_saved_time', Date.now());
  return tokenInfo.data.access_token;
}
export {getAccessToken};