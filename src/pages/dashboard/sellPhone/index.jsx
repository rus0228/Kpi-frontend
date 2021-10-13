import {Col, Row, Card, Statistic, Tooltip, Empty} from 'antd';
import {useModel, useRequest} from 'umi';
import {GridContent, PageLoading} from '@ant-design/pro-layout';
import React, {Suspense, useState} from "react";
import {fakeChartData, getSellPhoneData} from "./service";
import {ChartCard} from "@/pages/dashboard/analysis/components/Charts";
import {InfoCircleOutlined} from "@ant-design/icons";
import Yuan from "@/pages/dashboard/analysis/utils/Yuan";
import moment from "moment";
import {CardFooter, Comparison, ComparisonInt, CardFooterTime, ComparisonTime, Time} from "@/pages/dashboard/CustomComponent";
import {getChangedGlobalStates} from "@/pages/dashboard/CustomUtils";

const SellPhone = () => {
  const {initialState} = useModel('@@initialState');
  const { loading, data } = useRequest(fakeChartData);
  const [sellPhoneData, setSellPhoneData] = React.useState({
    receivedOrders: 0,
    finishedOrders: 0,
    totalPaidAmount: 0,
    averageAmount: 0,
    averageTime: 0,
    _receivedOrders: 0,
    _finishedOrders: 0,
    _totalPaidAmount: 0,
    _averageAmount: 0,
    _averageTime: 0,
  });

  const changedStates = getChangedGlobalStates(initialState);
  const {startTime, endTime, _startTime, _endTime, store} = changedStates;

  const {receivedOrders, finishedOrders, totalPaidAmount, averageAmount, averageTime,
    _receivedOrders, _finishedOrders, _totalPaidAmount, _averageAmount, _averageTime} = sellPhoneData

  React.useEffect(() => {
    getSellPhoneData(startTime, endTime, _startTime, _endTime, store).then((res) => {
      setSellPhoneData({
        ...sellPhoneData,
        receivedOrders: parseFloat(res['current']['receivedOrders']),
        finishedOrders: parseFloat(res['current']['finishedOrders']),
        totalPaidAmount: parseFloat(res['current']['totalPaidAmount']),
        averageAmount: parseFloat(res['current']['averageAmount']),
        averageTime: parseFloat(res['current']['averageTime']),
        _receivedOrders: parseFloat(res['prev']['receivedOrders']),
        _finishedOrders: parseFloat(res['prev']['finishedOrders']),
        _totalPaidAmount: parseFloat(res['prev']['totalPaidAmount']),
        _averageAmount: parseFloat(res['prev']['averageAmount']),
        _averageTime: parseFloat(res['prev']['averageTime']),
      });
    })
  }, [])

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
          <Col span={8}>
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

          <Col span={8}>
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
          <Col span={8}>
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
