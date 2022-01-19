import Geocode from "react-geocode";

const getGeoCode = async (location) => {
  Geocode.setApiKey("AIzaSyB2Dc7Bv_fEotXw4AiVY5TS7PODoV6IraA");
  Geocode.setRegion("vn");
  try {
    const response = await Geocode.fromAddress(
      "123 Ly Thuong Kiet Quan 10 Thanh Pho Ho Chi Minh"
    );
    const { lat, lng } = response.results[0].geometry.location;
    return { lat, lng };
  } catch (error) {
    console.log(error);
  }
};

export default getGeoCode;
