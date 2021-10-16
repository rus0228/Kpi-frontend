import React, {Suspense} from 'react';
import {Row, Col, Card, Tooltip} from 'antd'
import { GridContent } from '@ant-design/pro-layout';
import { useRequest, useModel } from 'umi';
import {fakeChartData, getSalesRevenueProfitQty, getRepairsRevenueProfitQty,
  getReturnsRevenueProfitQty, getPurchaseOrdersRevenueQty, getTotalData, getInventoryLossesData} from './service';
import PageLoading from './components/PageLoading';
import RevenueProfitQtyPanel from "./components/RevenueProfitQtyPanel";
import RevenueQtyPanel from "./components/RevenueQtyPanel";
import {ChartCard} from "@/pages/dashboard/analysis/components/Charts";
import Yuan from "@/pages/dashboard/analysis/utils/Yuan";
import {InfoCircleOutlined} from "@ant-design/icons";
import {CardFooter, Comparison} from "@/pages/dashboard/CustomComponent";
import {getChangedGlobalStates} from "@/pages/dashboard/CustomUtils";
import {isMobile} from 'react-device-detect';
const mobileStyle = isMobile ? {marginTop: 164} : {};
const topColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 8,
  style: {
    marginBottom: 24,
  },
};

const Analysis = () => {
  const {initialState} = useModel('@@initialState');
  const { loading, data } = useRequest(fakeChartData);
  const [salesRevenueProfitQtyData, setSalesRevenueProfitQtyData] = React.useState([]);
  const [repairsRevenueProfitQtyData, setRepairsRevenueProfitQtyData] = React.useState([]);
  const [returnsRevenueProfitQtyData, setReturnsRevenueProfitQtyData] = React.useState([]);
  const [purchaseOrdersRevenueQtyData, setPurchaseOrdersRevenueQtyData] = React.useState([]);
  const [totalData, setTotalData] = React.useState({
    totalRevenue: 0,
    preTotalRevenue: 0,
    totalRevenueWithIva: 0,
    preTotalRevenueWithIva: 0,
    totalRevenueWithoutIva: 0,
    preTotalRevenueWithoutIva: 0,

    totalProfit: 0,
    preTotalProfit: 0,
    totalProfitWithIva: 0,
    preTotalProfitWithIva: 0,
    totalProfitWithoutIva: 0,
    preTotalProfitWithoutIva: 0,

    totalCost: 0,
    preTotalCost: 0,
    totalIva: 0,
    preTotalIva: 0
  })

  const [elseTotalData, setElseTotalData] = React.useState({
    totalLosses: 0,
    preTotalLosses: 0
  })

  const {totalRevenue, preTotalRevenue, totalRevenueWithIva, preTotalRevenueWithIva,
    totalRevenueWithoutIva, preTotalRevenueWithoutIva, totalProfit, preTotalProfit,
    totalProfitWithIva, preTotalProfitWithIva, totalProfitWithoutIva, preTotalProfitWithoutIva,
    totalCost, preTotalCost, totalIva, preTotalIva} = totalData;
  const {totalLosses, preTotalLosses} = elseTotalData;

  const changedStates = getChangedGlobalStates(initialState);
  const {startTime, endTime, _startTime, _endTime, store} = changedStates;

  React.useEffect(() => {
    getSalesRevenueProfitQty(startTime, endTime, _startTime, _endTime, store).then((res) => {
      setSalesRevenueProfitQtyData(res)
    })
    getRepairsRevenueProfitQty(startTime, endTime, _startTime, _endTime, store).then((res) => {
      setRepairsRevenueProfitQtyData(res)
    })
    getReturnsRevenueProfitQty(startTime, endTime, _startTime, _endTime, store).then((res) => {
      setReturnsRevenueProfitQtyData(res)
    })
    getPurchaseOrdersRevenueQty(startTime, endTime, _startTime, _endTime, store).then((res) => {
      setPurchaseOrdersRevenueQtyData(res);
    })
    getTotalData(startTime, endTime, _startTime, _endTime, store).then((res) => {
      const totalRevenueWithIva = parseFloat(res['current']['sales_revenue_with_iva']) + parseFloat(res['current']['repairs_revenue_with_iva']) - parseFloat(res['current']['returns_revenue_with_iva'])
      const preTotalRevenueWithIva = parseFloat(res['before']['sales_revenue_with_iva']) + parseFloat(res['before']['repairs_revenue_with_iva']) - parseFloat(res['before']['returns_revenue_with_iva'])

      const totalRevenueWithoutIva = parseFloat(res['current']['sales_revenue_without_iva']) + parseFloat(res['current']['repairs_revenue_without_iva']) - parseFloat(res['current']['returns_revenue_without_iva'])
      const preTotalRevenueWithoutIva = parseFloat(res['before']['sales_revenue_without_iva']) + parseFloat(res['before']['repairs_revenue_without_iva']) - parseFloat(res['before']['returns_revenue_without_iva'])

      const totalProfitWithIva = parseFloat(res['current']['sales_profit_with_iva']) + parseFloat(res['current']['repairs_profit_with_iva']) - parseFloat(res['current']['returns_profit_with_iva'])
      const preTotalProfitWithIva = parseFloat(res['before']['sales_profit_with_iva']) + parseFloat(res['before']['repairs_profit_with_iva']) - parseFloat(res['before']['returns_profit_with_iva'])

      const totalProfitWithoutIva = parseFloat(res['current']['sales_profit_without_iva']) + parseFloat(res['current']['repairs_profit_without_iva']) - parseFloat(res['current']['returns_profit_without_iva'])
      const preTotalProfitWithoutIva = parseFloat(res['before']['sales_profit_without_iva']) + parseFloat(res['before']['repairs_profit_without_iva']) - parseFloat(res['before']['returns_profit_without_iva'])

      const totalRevenue = totalRevenueWithIva + totalRevenueWithoutIva;
      const preTotalRevenue = preTotalRevenueWithIva + preTotalRevenueWithoutIva;

      const totalProfit = totalProfitWithIva + totalProfitWithoutIva;
      const preTotalProfit = preTotalProfitWithIva + preTotalProfitWithoutIva;

      const totalCost = parseFloat(res['current']['sales_cost']) + parseFloat(res['current']['repairs_cost']) - parseFloat(res['current']['returns_cost'])
      const preTotalCost = parseFloat(res['before']['sales_cost']) + parseFloat(res['before']['repairs_cost']) - parseFloat(res['before']['returns_cost'])

      const totalIva = parseFloat(res['current']['sales_iva']) + parseFloat(res['current']['repairs_iva']) - parseFloat(res['current']['returns_iva'])
      const preTotalIva = parseFloat(res['before']['sales_iva']) + parseFloat(res['before']['repairs_iva']) - parseFloat(res['before']['returns_iva'])

      setTotalData({
        ...totalData,
        totalRevenue: totalRevenue,
        preTotalRevenue: preTotalRevenue,
        totalRevenueWithIva: totalRevenueWithIva,
        preTotalRevenueWithIva: preTotalRevenueWithIva,
        totalRevenueWithoutIva: totalRevenueWithoutIva,
        preTotalRevenueWithoutIva: preTotalRevenueWithoutIva,
        totalProfit: totalProfit,
        preTotalProfit: preTotalProfit,
        totalProfitWithIva: totalProfitWithIva,
        preTotalProfitWithIva: preTotalProfitWithIva,
        totalProfitWithoutIva: totalProfitWithoutIva,
        preTotalProfitWithoutIva: preTotalProfitWithoutIva,
        totalCost: totalCost,
        preTotalCost: preTotalCost,
        totalIva: totalIva,
        preTotalIva: preTotalIva,
      })
    })
    getInventoryLossesData(startTime, endTime, _startTime, _endTime, store, 'totalLosses').then((res) => {
      setElseTotalData({
        ...elseTotalData,
        totalLosses: res['current'],
        preTotalLosses: res['prev']
      })
    })
  },[initialState])

  return (
    <GridContent style={mobileStyle}>
      <>
        <Suspense fallback={<PageLoading />}>
          <Row gutter={24}>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="Total Revenue"
                action={
                  <Tooltip
                    title={
                      <Comparison current={totalRevenue} prev={preTotalRevenue} _startTime={_startTime} _endTime={_endTime}/>
                    }
                  >
                    <InfoCircleOutlined />
                  </Tooltip>
                }
                loading={loading}
                total={() => <Yuan>{totalRevenue}</Yuan>}
                footer={<CardFooter current={totalRevenue} prev={preTotalRevenue}/>}
                contentHeight={46}
              />
            </Col>

            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="Total Revenue with IVA"
                action={
                  <Tooltip
                    title={
                      <Comparison current={totalRevenueWithIva} prev={preTotalRevenueWithIva} _startTime={_startTime} _endTime={_endTime}/>
                    }
                  >
                    <InfoCircleOutlined />
                  </Tooltip>
                }
                loading={loading}
                total={() => <Yuan>{totalRevenueWithIva}</Yuan>}
                footer={<CardFooter current={totalRevenueWithIva} prev={preTotalRevenueWithIva}/>}
                contentHeight={46}
              />
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="Total Revenue without IVA"
                action={
                  <Tooltip
                    title={
                      <Comparison current={totalRevenueWithoutIva} prev={preTotalRevenueWithoutIva} _startTime={_startTime} _endTime={_endTime}/>
                    }
                  >
                    <InfoCircleOutlined />
                  </Tooltip>
                }
                loading={loading}
                total={() => <Yuan>{totalRevenueWithoutIva}</Yuan>}
                footer={<CardFooter current={totalRevenueWithoutIva} prev={preTotalRevenueWithoutIva}/>}
                contentHeight={46}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="Total Cost of Goods"
                action={
                  <Tooltip
                    title={
                      <Comparison current={totalCost} prev={preTotalCost} _startTime={_startTime} _endTime={_endTime}/>
                    }
                  >
                    <InfoCircleOutlined />
                  </Tooltip>
                }
                loading={loading}
                total={() => <Yuan>{totalCost}</Yuan>}
                footer={<CardFooter current={totalCost} prev={preTotalCost}/>}
                contentHeight={46}
              />
            </Col>

            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="Total IVA"
                action={
                  <Tooltip
                    title={
                      <Comparison current={totalIva} prev={preTotalIva} _startTime={_startTime} _endTime={_endTime}/>
                    }
                  >
                    <InfoCircleOutlined />
                  </Tooltip>
                }
                loading={loading}
                total={() => <Yuan>{totalIva}</Yuan>}
                footer={<CardFooter current={totalIva} prev={preTotalIva}/>}
                contentHeight={46}
              />
            </Col>

            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="Total Losses"
                action={
                  <Tooltip
                    title={
                      <Comparison current={totalLosses} prev={preTotalLosses} _startTime={_startTime} _endTime={_endTime}/>
                    }
                  >
                    <InfoCircleOutlined />
                  </Tooltip>
                }
                loading={loading}
                total={() => <Yuan>{totalLosses}</Yuan>}
                footer={<CardFooter current={totalLosses} prev={preTotalLosses}/>}
                contentHeight={46}
              />
            </Col>

          </Row>
          <Row gutter={24}>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="Total Profit"
                action={
                  <Tooltip
                    title={
                      <Comparison current={totalProfit} prev={preTotalProfit} _startTime={_startTime} _endTime={_endTime}/>
                    }
                  >
                    <InfoCircleOutlined />
                  </Tooltip>
                }
                loading={loading}
                total={() => <Yuan>{totalProfit}</Yuan>}
                footer={<CardFooter current={totalProfit} prev={preTotalProfit}/>}
                contentHeight={46}
              />
            </Col>

            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="Total Profit with IVA"
                action={
                  <Tooltip
                    title={
                      <Comparison current={totalProfitWithIva} prev={preTotalProfitWithIva} _startTime={_startTime} _endTime={_endTime}/>
                    }
                  >
                    <InfoCircleOutlined />
                  </Tooltip>
                }
                loading={loading}
                total={() => <Yuan>{totalProfitWithIva}</Yuan>}
                footer={<CardFooter current={totalProfitWithIva} prev={preTotalProfitWithIva}/>}
                contentHeight={46}
              />
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="Total Profit without IVA"
                action={
                  <Tooltip
                    title={
                      <Comparison current={totalProfitWithoutIva} prev={preTotalProfitWithoutIva} _startTime={_startTime} _endTime={_endTime}/>
                    }
                  >
                    <InfoCircleOutlined />
                  </Tooltip>
                }
                loading={loading}
                total={() => <Yuan>{totalProfitWithoutIva}</Yuan>}
                footer={<CardFooter current={totalProfitWithoutIva} prev={preTotalProfitWithoutIva}/>}
                contentHeight={46}
              />
            </Col>
          </Row>
        </Suspense>
        <Suspense fallback={<PageLoading />}>
          <Card
            loading={loading}
            title={'Sales'}
            bordered={false}
            bodyStyle={{
              padding: 24,
              marginBottom: 24,
            }}
          >
            <RevenueProfitQtyPanel
              revenueProfitQtyData={salesRevenueProfitQtyData}
            />
          </Card>
        </Suspense>
        <Suspense fallback={<PageLoading />}>
          <Card
            loading={loading}
            title={'Repairs'}
            bordered={false}
            bodyStyle={{
              padding: 24,
              marginBottom: 24
            }}
          >
            <RevenueProfitQtyPanel
              revenueProfitQtyData={repairsRevenueProfitQtyData}
            />
          </Card>
        </Suspense>
        <Suspense fallback={<PageLoading />}>
          <Card
            loading={loading}
            title={'Credit Notes'}
            bordered={false}
            bodyStyle={{
              padding: 24,
              marginBottom: 24
            }}
          >
            <RevenueProfitQtyPanel
              revenueProfitQtyData={returnsRevenueProfitQtyData}
            />
          </Card>
        </Suspense>
        <Suspense fallback={<PageLoading />}>
          <Card
            loading={loading}
            title={'Purchase Orders'}
            bordered={false}
            bodyStyle={{
              padding: 24,
              marginBottom: 24
            }}
          >
            <RevenueQtyPanel
              revenueQtyData={purchaseOrdersRevenueQtyData}
            />
          </Card>
        </Suspense>
      </>
    </GridContent>
  );
};

export default Analysis;
