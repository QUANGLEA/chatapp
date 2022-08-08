import axios from "axios";

export default async function handler(req, res) {
  const { latitude, longitude } = req.body;
  console.log("Latitude: " + latitude);
  const params = {
    access_key: process.env.GEO_KEY,
    query: latitude + "," + longitude,
    limit: 1,
  };
  axios
    .get("http://api.positionstack.com/v1/reverse", { params })
    .then((response) => {
      const state = response.data.data[0].region_code;
      const country = response.data.data[0].country_code;
      // console.log(state + ", " + country);
      return res.status(200).json({ data: state + ", " + country });
    })
    .catch((err) => console.log("Err: " + err));
}
