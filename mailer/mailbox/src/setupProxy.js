const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    [
      "/api/userLogin",
      "/api/messages/getMessages",
      "/api/messages/getMessagesOutgoing",
      "/api/messages/getMessagesRead",
      "/api/messages/getMessagesUnread",
      "/api/messages/add",
      "/api/messages/delete/:id",
      "/api/get/users",
    ],
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
};
