import {Col, Row, Card, Statistic, Tooltip, Empty} from 'antd';
import {useModel, useRequest} from 'umi';
import {GridContent, PageLoading} from '@ant-design/pro-layout';
import React, {Suspense, useState} from "react";
import {fakeChartData, getSellPhoneData} from "./service";
import {ChartCard} from "@/pages/dashboard/revenue/components/Charts";
import {InfoCircleOutlined} from "@ant-design/icons";
import Yuan from "@/pages/dashboard/revenue/utils/Yuan";
import moment from "moment";
import {CardFooter, Comparison, ComparisonInt, CardFooterTime, ComparisonTime, Time} from "@/pages/dashboard/CustomComponent";
import {getChangedGlobalStates} from "@/pages/dashboard/CustomUtils";
import {isMobile} from 'react-device-detect';
const mobileStyle = isMobile ? {marginTop: 164} : {};

const topColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 8
};
const SellPhone = () => {
  const {initialState} = useModel('@@initialState');
  const { loading, data } = useRequest(fakeChartData);
  const [sellPhoneData, setSellPhoneData] = React.useState({
    cancelledOrders: 0,
    receivedOrders: 0,
    finishedOrders: 0,
    totalPaidAmount: 0,
    averageAmount: 0,
    averageTime: 0,
    _cancelledOrders,
    _receivedOrders: 0,
    _finishedOrders: 0,
    _totalPaidAmount: 0,
    _averageAmount: 0,
    _averageTime: 0,
  });

  const changedStates = getChangedGlobalStates(initialState);
  const {startTime, endTime, _startTime, _endTime, store} = changedStates;

  const {cancelledOrders, receivedOrders, finishedOrders, totalPaidAmount, averageAmount, averageTime, _cancelledOrders,
    _receivedOrders, _finishedOrders, _totalPaidAmount, _averageAmount, _averageTime} = sellPhoneData

  React.useEffect(() => {
    getSellPhoneData(startTime, endTime, _startTime, _endTime, store).then((res) => {
      setSellPhoneData({
        ...sellPhoneData,
        cancelledOrders: parseFloat(res['current']['cancelledOrders']),
        receivedOrders: parseFloat(res['current']['receivedOrders']),
        finishedOrders: parseFloat(res['current']['finishedOrders']),
        totalPaidAmount: parseFloat(res['current']['totalPaidAmount']),
        averageAmount: parseFloat(res['current']['averageAmount']),
        averageTime: parseFloat(res['current']['averageTime']),
        _cancelledOrders: parseFloat(res['prev']['cancelledOrders']),
        _receivedOrders: parseFloat(res['prev']['receivedOrders']),
        _finishedOrders: parseFloat(res['prev']['finishedOrders']),
        _totalPaidAmount: parseFloat(res['prev']['totalPaidAmount']),
        _averageAmount: parseFloat(res['prev']['averageAmount']),
        _averageTime: parseFloat(res['prev']['averageTime']),
      });
    })
  }, [])

  return (
    <GridContent style={mobileStyle}>
      <Suspense fallback={null}>
        <Row gutter={[24, 24]}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Number of Orders Cancelled"
              action={
                <Tooltip
                  title={
                    <ComparisonInt current={cancelledOrders} prev={_cancelledOrders} _startTime={_startTime} _endTime={_endTime}/>
                  }
                >
                  <InfoCircleOutlined />
                </Tooltip>
              }
              loading={loading}
              total={() => <div>{cancelledOrders}</div>}
              footer={<CardFooter current={cancelledOrders} prev={_cancelledOrders}/>}
              contentHeight={46}
            />
          </Col>
          <Col {...topColResponsiveProps}>
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

          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Number of Orders Finished"
              action={
                <Tooltip
                  title={
                    <ComparisonInt current={finishedOrders} prev={_finishedOrders} _startTime={_startTime} _endTime={_endTime}/>
                  }
                >
                  <InfoCircleOutlined />
                </Tooltip>
              }
              loading={loading}
              total={() => <div>{finishedOrders}</div>}
              footer={<CardFooter current={finishedOrders} prev={_finishedOrders}/>}
              contentHeight={46}
            />
          </Col>
        </Row>
        <Row gutter={[24,24]} style={{marginTop: 24}}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Total Amount Paid"
              action={
                <Tooltip
                  title={
                    <Comparison current={totalPaidAmount} prev={_totalPaidAmount} _startTime={_startTime} _endTime={_endTime}/>
                  }
                >
                  <InfoCircleOutlined />
                </Tooltip>
              }
              loading={loading}
              total={() => <Yuan>{totalPaidAmount}</Yuan>}
              footer={<CardFooter current={totalPaidAmount} prev={_totalPaidAmount}/>}
              contentHeight={46}
            />
          </Col>

          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Average Amount Paid"
              action={
                <Tooltip
                  title={
                    <Comparison current={averageAmount} prev={_averageAmount} _startTime={_startTime} _endTime={_endTime}/>
                  }
                >
                  <InfoCircleOutlined />
                </Tooltip>
              }
              loading={loading}
              total={() => <Yuan>{averageAmount}</Yuan>}
              footer={<CardFooter current={averageAmount} prev={_averageAmount}/>}
              contentHeight={46}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Average Time between Received and Finished"
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
              footer={<CardFooterTime current={averageTime} prev={_averageTime}/>}
              contentHeight={46}
            />
          </Col>
        </Row>
      </Suspense>
    </GridContent>
  );
};

export default SellPhone;
