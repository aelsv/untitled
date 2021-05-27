export default {
  EMAIL: /^\s*\w+([.]\w+|[-]\w*)*@\w+([-.]\w+)*\.(\w+([-.]\w+)*)*\w{2,}\s*$/,
  REST_ACTION_TYPE: /(.*)_(REQUEST|SUCCESS|FAILURE)/,
  URL: /(http(s|):\/\/.*?)(\/.*?$)/,
  URL_WITH_IP_OR_LOCALHOST_AS_DOMAIN:
    // eslint-disable-next-line max-len
    /^(http(s|):\/\/.*?)((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])|localhost)/,
  HOME_PAGE: /\/$/,
};
