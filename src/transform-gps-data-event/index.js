const enrichGeodata = require("./enrich-geodata");

exports.handler = async function (pusher) {
  const data = pusher.data;

  try {
    if (!data || !data.message.latitude || !data.message.longitude) {
      return pusher.ok(data);
    }

    const { latitude, longitude } = data.message;
    const POSITION_STACK_API_ACCESS_KEY = await pusher.getConfig(
      "POSITION_STACK_API_ACCESS_KEY"
    );
    const enrichedData = await enrichGeodata({
      latitude,
      longitude,
      accessKey: POSITION_STACK_API_ACCESS_KEY,
    });
    const currentTime = new Date().toLocaleTimeString();

    const transformedData = `
      <p>Your delivery is currently at ${enrichedData.street} in ${
      enrichedData.neighbourhood
    }, ${enrichedData.region}.</p>

      ${
        enrichedData.map_url
          ? `<p>View the map here: <a href="${enrichedData.map_url}">${enrichedData.label}</a></p>`
          : ""
      }

      <p>Last updated at ${currentTime}</p>
    `;

    return pusher.ok(transformedData);
  } catch (error) {
    return pusher.ok(data);
  }
};
