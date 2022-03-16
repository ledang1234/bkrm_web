import { Button, notification, Space } from "antd";

const openNotification = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
    placement: "bottomRight",
  });
};
export default openNotification;
