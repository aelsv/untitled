export default () => async (req, res) => {
  const html = `<!doctype html>
      <html lang="en-EN">
        <head>
          <meta charSet="utf-8" />
          <title>Server</title>
        </head>
        <body>
          <div id="root">Hello from server!</div>
        </body>
      </html>`.replace(/(\t|\n)/g, '');

  res.status(200).send(html);
};
