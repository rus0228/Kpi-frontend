import {Col, Row, Card, Statistic, Tooltip} from 'antd';
import {useModel, useRequest} from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import React, {Suspense, useRef, useState} from "react";
import styles from "@/pages/dashboard/repairs/style.less";
import {fakeChartData, getSosData} from "./service";
import SosBarPanel from "./components/SosBarPanel";
import moment from "moment";
import PageLoading from "@/pages/dashboard/analysis/components/PageLoading";
import numeral from "numeral";
import {ChartCard} from "@/pages/dashboard/analysis/components/Charts";
import {InfoCircleOutlined} from "@ant-design/icons";
import Yuan from "@/pages/dashboard/analysis/utils/Yuan";
import {CardFooter, Comparison, ComparisonInt, CardFooterTime, ComparisonTime, Time} from "@/pages/dashboard/CustomComponent";

const Sos = () => {
  const {initialState} = useModel('@@initialState');
  const { loading, data } = useRequest(fakeChartData);

  const [sosData, setSosData] = React.useState({
    receivedOrders: 0,
    shippedOrders: 0,
    averageTime: 0,
    totalRevenue: 0,
    _receivedOrders: 0,
    _shippedOrders: 0,
    _averageTime: 0,
    _totalRevenue: 0,
  });
  const {receivedOrders, shippedOrders, averageTime, totalRevenue, _receivedOrders, _shippedOrders, _averageTime, _totalRevenue} = sosData
  const store = initialState.store;
  const startTime = moment(initialState.range[0]).format('YYYY-MM-DD HH:mm:ss');
  const endTime = moment(initialState.range[1]).format('YYYY-MM-DD HH:mm:ss');
  const duration = moment(endTime).diff(startTime, 'days');
  const _startTime = moment(startTime).subtract(duration + 2, 'days').format('YYYY-MM-DD');
  const _endTime = moment(_startTime).add(duration + 1, 'days').format('YYYY-MM-DD');

  React.useEffect(() => {
    getSosData(startTime, endTime, store).then((res) => {
      setSosData({
        ...sosData,
        receivedOrders: res['current']['receivedOrders'],
        shippedOrders: res['current']['shippedOrders'],
        averageTime: res['current']['averageTime'],
        totalRevenue: res['current']['totalRevenue'],
        _receivedOrders: res['prev']['receivedOrders'],
        _shippedOrders: res['prev']['shippedOrders'],
        _averageTime: res['prev']['averageTime'],
        _totalRevenue: res['prev']['totalRevenue']
      })
    })
  }, [initialState])

  return (
    <GridContent>
      <Suspense fallback={null}>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <ChartCard
              bordered={false}
              title="Number of Orders Received"
              action={
                <Tooltip
                  title={
                    <ComparisonInt current={receivedOrders} prev={_receivedOrders} _startTime={_startTime} _endTime={_endTime}/>
                  }
                >
                  <InfoCircleOutlined />
                </Tooltip>
              }
              loading={loading}
              total={() => <div>{receivedOrders}</div>}
              footer={<CardFooter current={receivedOrders} prev={_receivedOrders}/>}
              contentHeight={46}
            />
          </Col>

          <Col span={12}>
            <ChartCard
              bordered={false}
              title="Number of Orders Shipped"
              action={
                <Tooltip
                  title={
                    <ComparisonInt current={shippedOrders} prev={_shippedOrders} _startTime={_startTime} _endTime={_endTime}/>
                  }
                >
                  <InfoCircleOutlined />
                </Tooltip>
              }
              loading={loading}
              total={() => <div>{shippedOrders}</div>}
              footer={<CardFooter current={shippedOrders} prev={_shippedOrders}/>}
              contentHeight={46}
            />
          </Col>
        </Row>
        <Row gutter={[24,24]} style={{marginTop: 24}}>
          <Col span={12}>
            <ChartCard
              bordered={false}
              title="Total Revenue"
              action={
                <Tooltip
                  title={
                    <Comparison current={totalRevenue} prev={_totalRevenue} _startTime={_startTime} _endTime={_endTime}/>
                  }
                >
                  <InfoCircleOutlined />
                </Tooltip>
              }
              loading={loading}
              total={() => <Yuan>{totalRevenue}</Yuan>}
              footer={<CardFooter current={totalRevenue} prev={_totalRevenue}/>}
              contentHeight={46}
            />
          </Col>
          <Col span={12}>
            <ChartCard
              bordered={false}
              title="Average Time between Received and Shipped"
              action={
                <Tooltip
                  title={
                    <ComparisonTime current={averageTime} prev={_averageTime} _startTime={_startTime} _endTime={_endTime}/>
                  }
                >
                  <InfoCircleOutlined />
                </Tooltip>
              }
              loading={loading}
              total={() => <Time seconds={averageTime}/>}
              footer={<CardFooterTime prev={_averageTime} current={averageTime}/>}
              contentHeight={46}
            />
          </Col>
        </Row>
      </Suspense>
    </GridContent>
  );
};

export default Sos;
