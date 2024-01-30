import { Select, Space, Typography, Flex, Divider, Form, Button, InputNumber, DatePicker, Result } from 'antd';
import { useState, useRef } from "react"
import { useCrypto } from '../context/crypto-context';

export default function AddAssetForm({onClose}) {
    const [form] = Form.useForm();
    const { crypto, addAsset } = useCrypto();
    const [coin, setCoin] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const assetRef = useRef();

    const onFinish = (values) => {
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date()
        }
        assetRef.current = newAsset;
        setSubmitted(true);
        addAsset(newAsset);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const validateMessages = {
        required: '${label} is required',
        types: {
            number: '${label} is not valid number',
        },
        number: {
            range: '${label} must be between ${min} and ${max}'
        }
    }
    const calcTotal = (amount) => {
        form.setFieldsValue({
            total: (coin.price * amount).toFixed(2)
        })
    }

    if (submitted) {
        return (
            <Result
                status="success"
                title="New Asset Added"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${coin.price.toFixed(2)}`}
                extra={[
                    <Button type="primary" key="console" onClick={onClose}>
                        Go Console
                    </Button>,
                    <Button key="buy">Buy Again</Button>,
                ]}
            />
        )
    }

    if (!coin) {
        return (
            <Select
                style={{
                    width: '100%',
                }}
                onSelect={(v) => setCoin(crypto.find(i => i.id === v))}
                placeholder="select coin"
                optionLabelProp="label"
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{ width: '20px' }} src={option.data.icon} /> {option.data.label}
                    </Space>
                )}
            />
        )
    }

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 10,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                price: +coin.price.toFixed(2),
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            validateMessages={validateMessages}
        >
            <Flex>
                <img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 20 }} />
                <Typography.Title level={2} style={{ margin: 0 }}>
                    {coin.name}
                </Typography.Title>
            </Flex>
            <Divider />

            <Form.Item
                label="Amount"
                name="amount"
                rules={[
                    {
                        required: true,
                        type: 'number',
                        min: 0,
                    },
                ]}
            >
                <InputNumber onChange={calcTotal} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Price" name="price">
                <InputNumber disabled style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Date & Time" name="date">
                <DatePicker showTime />
            </Form.Item>

            <Form.Item label="Total" name="total">
                <InputNumber disabled style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Add Asset
                </Button>
            </Form.Item>
        </Form>
    )
}