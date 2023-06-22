const Pusher = require("pusher");
require("dotenv").config();

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID, // Add your app id
  key: process.env.PUSHER_APP_KEY, // Add your API key
  secret: process.env.PUSHER_APP_SECRET, // Add your API secret
  cluster: process.env.PUSHER_APP_CLUSTER, // Add your cluster
  useTLS: true,
});

pusher.trigger("my-channel", "my-event", {
  message: "Hello World",
});
