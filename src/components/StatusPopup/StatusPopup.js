import { Button, notification, Space } from "antd";

const openNotification = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
    placement: "bottomRight",
    // placement: "topRight",

  });
};
export default openNotification;
