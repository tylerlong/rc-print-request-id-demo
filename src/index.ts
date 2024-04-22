import { SDK } from '@ringcentral/sdk';

const sdk = new SDK({
  server: process.env.RINGCENTRAL_SERVER_URL,
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
});

const client = sdk.client();
client.on(client.events.requestSuccess, (apiResponse) => {
  console.log(apiResponse.headers.get('rcrequestid'), apiResponse.url);
});

const platform = sdk.platform();
platform
  .login({
    jwt: process.env.RINGCENTRAL_JWT_TOKEN,
  })
  .then(() => {
    platform.get('/restapi/v1.0/account/~/extension/~');
  });
