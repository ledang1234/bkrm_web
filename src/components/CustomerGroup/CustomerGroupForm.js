import { Form, Input, Button, Space, Row } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const CustomerGroupForm = () => {
    const onFinish = values => {
        console.log('Received values of form:', values);
    };


    return (
        <Form name="customer_group_form" onFinish={onFinish} autoComplete="off" style={{maxHeight: 500, overflow: "auto"}}>
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

            <Form.List name="conditions">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex'}} align="baseline" size={20}>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'criteria']}
                                >
                                    <Select defaultValue={"totalAmount"} style={{width: 160}}> 
                                        <MenuItem value={"totalAmount"}>{'Tổng tiền mua'}</MenuItem>
                                        <MenuItem value={"numOfOrder"}>{'Số hóa đơn'}</MenuItem>
                                        <MenuItem value={"point"}>{'Điểm thưởng'}</MenuItem>
                                        <MenuItem value={"time"}>{'Ngày tạo'}</MenuItem>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    {...restField}
                                    name={[name, 'operation']}
                                >
                                    <Select defaultValue={">="} style={{width: 160}}>
                                        <MenuItem value={">="}>{'>='}</MenuItem>
                                        <MenuItem value={"="}>{'='}</MenuItem>
                                        <MenuItem value={"<="}>{'<='}</MenuItem>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    {...restField}
                                    name={[name, 'thres']}
                                    rules={[{ required: true, message: 'Thiếu giá trị', type: 'number' }]}
                                >
                                    <Input placeholder="Giá trị"/>
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add field
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <div style={{display: "flex", flexDirection: "column-reverse", width: '100%'}}>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Lưu
                </Button>
                
            </Form.Item>
            <Form.Item>
            <Button type="primary" danger>
                    Hủy
                </Button>
            </Form.Item>
            </div>
            
        </Form>
    );
};

export default CustomerGroupForm;