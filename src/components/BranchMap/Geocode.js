import Geocode from "react-geocode";

const getGeoCode = async (location) => {
  Geocode.setApiKey("AIzaSyB2Dc7Bv_fEotXw4AiVY5TS7PODoV6IraA");
  Geocode.setRegion("vn");
  try {
    const response = await Geocode.fromAddress(location);
    const { lat, lng } = response.results[0].geometry.location;
    return { lat, lng };
  } catch (error) {
    console.log(error);
  }
};

export default getGeoCode;
