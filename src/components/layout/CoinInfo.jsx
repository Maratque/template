import { Flex, Typography } from "antd"
import React from "react"


const CoinInfo = ({ coin, withSymbol }) => {
  return (
    <Flex align="center">
      <img
        style={{ width: 40, marginRight: 10 }}
        src={coin.icon}
        alt={coin.name}
      />
      <Typography.Title level={3} style={{ margin: 0 }}>
      {withSymbol && coin.symbol} {coin.name}
      </Typography.Title>
    </Flex>
  )
}

export default CoinInfo
