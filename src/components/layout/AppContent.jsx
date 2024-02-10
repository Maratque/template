import React, { useEffect, useState } from "react"
import { Layout, Select, Space, Modal, Button, Drawer } from "antd"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { useCrypto } from "../../context/crypto-context"
import CoinInfoModal from "./CoinInfoModal"
import AddDrawer from "./AddDrawer"
import GeneralMiddleContent from "./GeneralMiddleContent"
import PortfolioChart from "./PortfolioChart"
import AssetsTable from "./AssetsTable"

const contentStyle = {
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
}

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
)

const AppContent = () => {
  const { crypto } = useCrypto()
  const [modal, setModal] = useState(false)
  const [coin, setCoin] = useState(null)
  const [drawer, setDrawer] = useState(false)

  const handlerValue = (value) => {
    setCoin(crypto.find((c) => c.id == value))
    setModal(true)
  }


  return (
    <>
      <Layout.Content style={contentStyle}>
        <Card
          style={{
            width: "475px",
            paddingBottom: "5px",
            position: "relative",
            left: "175px",
            marginBottom: 40
          }}
          sx={{ minWidth: 275 }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Choose{bull}your{bull}favorite{bull}crypto
            </Typography>
            <Typography variant="body2">
              You can choose one favorite crypto from available list
              <br />
              {`Let's go (with modal window)`}
            </Typography>
          </CardContent>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CardActions>
              <Select
                style={{
                  width: "250px",
                }}
                value="Choose crypto"
                onSelect={handlerValue}
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
            </CardActions>
            <Button onClick={() => setDrawer(true)} type="primary">
              Add asset
            </Button>
          </div>
        </Card>
        <Modal
          open={modal}
          footer={null}
          onOk={() => setModal(false)}
          onCancel={() => setModal(false)}
        >
          <CoinInfoModal coin={coin} />
        </Modal>
        <Drawer
          destroyOnClose={true}
          width={550}
          title="Add Asset"
          onClose={() => setDrawer(false)}
          open={drawer}
        >
          <AddDrawer onClose={() => setDrawer(false)} />
        </Drawer>
        <GeneralMiddleContent />
        <PortfolioChart />
        <AssetsTable />
      </Layout.Content>
    </>
  )
}

export default AppContent
