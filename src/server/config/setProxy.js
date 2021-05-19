export const setProxy = () => {
  const { PROXY_HOST, PROXY_PORT } = process.env;

  if (!PROXY_HOST || !PROXY_PORT) return;

  console.log(`set proxy ip: ${PROXY_HOST} port: ${PROXY_PORT}`);

  require('global-tunnel-ng').initialize({
    host: PROXY_HOST,
    port: PROXY_PORT,
  });
};
