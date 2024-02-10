import { Layout, Typography } from "antd"
import React from "react"
import { useCrypto } from "../../context/crypto-context"

const GeneralMiddleContent = () => {
  const { crypto, assets } = useCrypto()

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price
    return acc
  }, {})

  return (
    <Layout.Content>
      <Typography.Title level={3} style={{ textAlign: "left", color: "white" }}>
        Portfolio:{" "}
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, v) => (acc += v), 0)
          .toFixed(2)}
        $
      </Typography.Title>
    </Layout.Content>
  )
}

export default GeneralMiddleContent
