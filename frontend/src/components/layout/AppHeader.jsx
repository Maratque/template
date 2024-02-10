import React, { useEffect, useState } from "react"
import { Layout, Select, Space, Button, Flex } from "antd"
import { useCrypto } from "../../context/crypto-context"

const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#fff",
}



const AppHeader = () => {
  
  const { crypto } = useCrypto()
  const [select, setSelect] = useState(false)

  useEffect(() => {
    const keypress = (e) => {
      if (e.key == '/') {
        setSelect((prev) => !prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, [])

  const handleSelect = (value) => {
    console.log(value)
  }

  return (
    <div>
      <Layout.Header style={headerStyle}>
        <Select
          style={{
            width: "250px",
          }}
          value="press / to open"
          open={select}
          onClick={() => setSelect((prev) => !prev)}
          onSelect={handleSelect}
          optionLabelProp="label"
          options={crypto.map(coin => ({
            label: coin.name,
            value: coin.id,
            icon: coin.icon
          }))}
          optionRender={(option) => (
            <Space>
              <img style={{ width: '25px' }} src={option.data.icon} alt={option.data.label} />
              {option.data.label}
            </Space>
          )}
        />
        <Button type="primary">Add asset</Button>
      </Layout.Header>
    </div>
  )
}

export default AppHeader
