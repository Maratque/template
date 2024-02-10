import {
  Divider,
  Flex,
  Select,
  Space,
  Typography,
  Form,
  InputNumber,
  Button,
  Result,
  DatePicker,
} from "antd"
import React, { useRef, useState } from "react"
import { useCrypto } from "../../context/crypto-context"
import { useForm } from "antd/es/form/Form"
import CoinInfo from "./CoinInfo"

const AddDrawer = ({ onClose }) => {
  const { crypto, addAsset } = useCrypto()
  const [coin, setCoin] = useState(null)
  const [form] = Form.useForm()
  const [submitted, setSubmitted] = useState(false)
  const assetRef = useRef()

  if (submitted) {
    return (
      <Result
        status="success"
        title="New asset added!"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>
        ]}
      />
    )
  }

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        value="Choose crypto"
        onSelect={(v) => setCoin(crypto.find((c) => c.id == v))}
        placeholder="Select your coin"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: "25px" }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
    )
  }

  const onFinish = (values) => {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      data: values.data?.$d ?? new Date()
    }
    assetRef.current = newAsset
    setSubmitted(true)
    addAsset(newAsset)
  }

  const validateMessages = {
    required: "${label is requiered}",
    types: {
      number: "${label} in not valid number",
    },
    number: {
      range: "${label} must be between ${min} and ${max} value",
    },
  }

  const handleAmountChange = (value) => {
    const price = form.getFieldValue("price")
    form.setFieldsValue({
      total: +(value * price).toFixed(2)
    })
  }

  const handlePriceChange = (value) => {
    const amount = form.getFieldValue("amount")
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    })
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4,
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
      validateMessages
    >
      <CoinInfo coin={coin} />
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber
          onChange={handlePriceChange}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddDrawer
