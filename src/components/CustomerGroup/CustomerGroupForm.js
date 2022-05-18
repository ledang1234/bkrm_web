import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';

// import Select from '@material-ui/core/Select';
import { Select, Radio } from 'antd';
const { Option } = Select;

const CustomerGroupForm = ({ onSave, onClose }) => {

    const onFinish = values => {
        console.log('Received values of form:', values);
    };

    return (
        <Form name="customer_group_form" onFinish={onFinish} autoComplete="off" style={{ maxHeight: 500, overflow: "auto" }}>
            <Form.Item
                label="Tên nhóm"
                name="groupName"
                rules={[{ required: true, message: 'Nhập tên nhóm' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Giảm giá"
                name="discount"
                rules={[{ required: true, message: 'Nhập giảm giá' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Ghi chú"
                name="notes"
            >
                <Input />
            </Form.Item>

            <Space style={{ display: 'flex' }} align="baseline" size={20}>
                Điều kiện
            </Space>

            <Form.List name="conditions">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex' }} align="baseline" size={20}>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'criteria']}
                                >
                                    <select defaultValue={"totalAmount"} style={{ width: 160, height: 32, borderRadius: 2 }}>
                                        <option value={"totalAmount"}>{'Tổng tiền mua'}</option>
                                        <option value={"numOfOrder"}>{'Số hóa đơn'}</option>
                                        <option value={"point"}>{'Điểm thưởng'}</option>
                                        <option value={"time"}>{'Ngày tạo'}</option>
                                    </select>

                                </Form.Item>

                                <Form.Item
                                    {...restField}
                                    name={[name, 'operation']}
                                >
                                    <select defaultValue={">="} style={{ width: 160, height: 32, borderRadius: 2 }}>
                                        <option value={">="}>{'>='}</option>
                                        <option value={"="}>{'='}</option>
                                        <option value={"<="}>{'<='}</option>
                                    </select>
                                </Form.Item>

                                <Form.Item
                                    {...restField}
                                    name={[name, 'thres']}
                                    rules={[{ required: true, message: 'Thiếu giá trị' }]}
                                >
                                    <Input placeholder="Giá trị" />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Thêm điều kiện
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <div style={{ display: "flex", flexDirection: "row-reverse", width: '100%', gap: 10 }}>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Lưu
                    </Button>

                </Form.Item>
                <Form.Item>
                    <Button type="primary" danger onClick={() => onClose()}>
                        Hủy
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default CustomerGroupForm;