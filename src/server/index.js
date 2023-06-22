const Pusher = require("pusher");
require("dotenv").config();

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

pusher.trigger("delivery-channel", "location-update-event", {
  message: LOCATIONS.LOCATION_DHOORESTRAAT,
});
