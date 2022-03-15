import { Button, notification, Space } from "antd";

export const openNotification = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};
