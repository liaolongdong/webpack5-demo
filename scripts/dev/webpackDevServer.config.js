const paths = require("../utils/paths")

module.exports = {
  compress: true,
  // get served. Our build script will copy `public` into the `build` folder.
  // In `index.html`, you can get URL of `public` folder with %PUBLIC_URL%:
  // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
  // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
  // Note that we only recommend to use `public` folder as an escape hatch
  // for files like `favicon.ico`, `manifest.json`, and libraries that are
  // for some reason broken when imported through webpack. If you just want to
  // use an image, put it in `src` and `import` it from JavaScript instead.
  contentBase: paths.appPath,
  hot: true,
  // Use 'ws' instead of 'sockjs-node' on server since we're using native
  // websockets in `webpackHotDevClient`.
  // transportMode: "ws",
  // Prevent a WS client from getting injected as we're already including
  // `webpackHotDevClient`.
  // injectClient: false,
  // Enable custom sockjs pathname for websocket connection to hot reloading server.
  // Enable custom sockjs hostname, pathname and port for websocket connection
  // to hot reloading server.
  // sockHost,
  // sockPath,
  // sockPort,
  // It is important to tell WebpackDevServer to use the same "publicPath" path as
  // we specified in the webpack config. When homepage is '.', default to serving
  // from the root.
  // remove last slash so user can land on `/test` instead of `/test/`
  // publicPath: paths.publicUrlOrPath.slice(0, -1),

  // WebpackDevServer is noisy by default so we emit custom message instead
  // by listening to the compiler events with `compiler.hooks[...].tap` calls above.
  // quiet: true,
  // Reportedly, this avoids CPU overload on some systems.
  // https://github.com/facebook/create-react-app/issues/293
  // src/node_modules is not ignored to support absolute imports
  // https://github.com/facebook/create-react-app/issues/1065
  // watchOptions: {
  //   ignored: ignoredFiles(paths.appSrc),
  // },
  // https: getHttpsConfig(),
  // host,
  overlay: true,
  inline: true,

  // historyApiFallback: {
  //   // Paths with dots should still use the history fallback.
  //   // See https://github.com/facebook/create-react-app/issues/387.
  //   disableDotRule: true,
  //   index: paths.publicUrlOrPath,
  // },
  // public: allowedHost,
  // `proxy` is run between `before` and `after` `webpack-dev-server` hooks
  // proxy: {},

  // before(app, server) {
  //   // Keep `evalSourceMapMiddleware` and `errorOverlayMiddleware`
  //   // middlewares before `redirectServedPath` otherwise will not have any effect
  //   // This lets us fetch source contents from webpack for the error overlay
  //   // app.use(evalSourceMapMiddleware(server));
  //   // // This lets us open files from the runtime error overlay.
  //   // app.use(errorOverlayMiddleware());
  //   if (fs.existsSync(paths.proxySetup)) {
  //     // This registers user provided middleware for proxy reasons
  //     require(paths.proxySetup)(app);
  //   }
  // },
  // after(app) {
  //   // Redirect to `PUBLIC_URL` or `homepage` from `package.json` if url not match
  //   app.use(redirectServedPath(paths.publicUrlOrPath));

  //   // This service worker file is effectively a 'no-op' that will reset any
  //   // previous service worker registered for the same host:port combination.
  //   // We do this in development to avoid hitting the production cache if
  //   // it used the same host and port.
  //   // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
  //   app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));
  // },
}
