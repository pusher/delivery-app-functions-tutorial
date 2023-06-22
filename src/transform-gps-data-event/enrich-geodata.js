const http = require("http");

const makeRequest = async ({ method, path, params, accessKey }) => {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host: "api.positionstack.com",
        port: 80,
        method,
        path: `${path}?access_key=${accessKey}&query=${params.query}&limit=1`,
      },
      (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          resolve(JSON.parse(data));
        });
      }
    );

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
};

const enrichGeodata = async ({ latitude, longitude, accessKey }) => {
  if (!latitude || !longitude) {
    throw new Error("Missing latitude and/or longitude");
  }

  const { data: enrichedData } = await makeRequest({
    path: "/v1/reverse",
    method: "GET",
    params: {
      query: `${latitude},${longitude}`,
    },
    accessKey,
  });

  return enrichedData[0];
};

module.exports = enrichGeodata;
