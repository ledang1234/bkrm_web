import Geocode from "react-geocode";

const getGeoCode = async (location) => {
  Geocode.setApiKey("AIzaSyCMWBeXF9uOKp0KQiihfHJAgyeQ0Cxkw-c");
  Geocode.setRegion("vn");
  try {
    const response = await Geocode.fromAddress("Eiffel Tower");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getGeoCode;
