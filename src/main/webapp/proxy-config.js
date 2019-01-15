const PROXY_CONFIG = {
  "/": {
    "secure": false,
    "target": {
      "host": "localhost",
      "protocol": "http:",
      "port": 8090
    },
    "logLevel": "debug",
    "bypass": function (req, res, proxyOptions) {
      if (req.url.indexOf("/admin") !== -1) {
        return "/admin";
      }
    }
  }
}

module.exports = PROXY_CONFIG;
