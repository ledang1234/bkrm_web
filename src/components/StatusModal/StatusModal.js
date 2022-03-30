import { Modal, Button, Space } from "antd";

export function info() {
  Modal.info({
    title: "This is a notification message",
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onOk() {},
  });
}

export function success(message) {
  Modal.success({
    content: message,
  });
}

export function error(title, content) {
  Modal.error({
    title: title,
    content:content,
    style:{zIndex:99999}
  });
}

export function warning(title, content) {
  Modal.warning({
    title: title,
    content: content,
  });
}
