import {Col, Row, Card, Statistic, Empty, Tooltip} from 'antd';
import {useModel, useRequest} from 'umi';
import {GridContent, PageLoading} from '@ant-design/pro-layout';
import React, {Suspense, useRef, useState} from "react";
import {fakeChartData, getInventoryLossesData} from "./service";
import moment from "moment";
import {InfoCircleOutlined} from '@ant-design/icons';
import numeral from "numeral";
import {Pie} from '@ant-design/charts'
import {ChartCard} from "@/pages/dashboard/analysis/components/Charts";
import Yuan from "@/pages/dashboard/analysis/utils/Yuan";
import {CardFooter, Comparison} from "@/pages/dashboard/CustomComponent";
import {getChangedGlobalStates, getDiffAndPercentage} from "@/pages/dashboard/CustomUtils";
import {isMobile} from 'react-device-detect';
const mobileStyle = isMobile ? {marginTop: 164} : {};
const topColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 8
};

const _topColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 12
};
const InventoryLosses = () => {
  const {initialState} = useModel('@@initialState');
  const { loading, data } = useRequest(fakeChartData);

  const [totalRma, setTotalRma] = useState({current: 0, prev: 0});
  const [lostRma, setLostRma] = useState({current: 0, prev: 0});
  const [totalLossesWithRma, setTotalLossesWithRma] = useState({current: 0, prev: 0});
  const [totalLossesWithoutRma, setTotalLossesWithoutRma] = useState({current: 0, prev: 0});

  const [processingValue, setProcessingValue] = useState({current: 0, prev: 0});
  const [shippedValue, setShippedValue] = useState({current: 0, prev: 0});

  const totalLosses = {
    current: lostRma.current + totalLossesWithoutRma.current,
    prev: lostRma.prev + totalLossesWithoutRma.prev
  }

  const changedStates = getChangedGlobalStates(initialState);
  const {startTime, endTime, _startTime, _endTime, store} = changedStates;
  const time = `${moment(_startTime).format('YYYY/MM/DD')} ~ ${moment(_endTime).format('YYYY/MM/DD')}`;

  React.useEffect(() => {
    getInventoryLossesData(startTime, endTime, _startTime, _endTime, store, 'totalRma').then((res) => {
      setTotalRma({...res})
    })
    getInventoryLossesData(startTime, endTime, _startTime, _endTime, store, 'lostRma').then((res) => {
      setLostRma({...res})
    })
    getInventoryLossesData(startTime, endTime, _startTime, _endTime, store, 'totalLossesWithRma').then((res) => {
      setTotalLossesWithRma({...res})
    })
    getInventoryLossesData(startTime, endTime, _startTime, _endTime, store, 'totalLossesWithoutRma').then((res) => {
      setTotalLossesWithoutRma({...res})
    })
    getInventoryLossesData(startTime, endTime, _startTime, _endTime, store, 'processing').then((res) => {
      setProcessingValue({...res})
    })
    getInventoryLossesData(startTime, endTime, _startTime, _endTime, store, 'shipped').then((res) => {
      setShippedValue({...res})
    })
  }, [initialState])
  const diffAndPercentage = getDiffAndPercentage(parseFloat(totalLossesWithRma.current), parseFloat(totalLossesWithRma.prev), 1);
  const _diffAndPercentage = getDiffAndPercentage(parseFloat(totalLossesWithoutRma.current), parseFloat(totalLossesWithoutRma.prev), 1);
  return (
    <GridContent style={mobileStyle}>
      <Row gutter={24}>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <Row gutter={[24, 24]}>
              <Col {..._topColResponsiveProps} style={{marginBottom: 24}}>
                <ChartCard
                  bordered={false}
                  title="Total Processing Value"
                  action={
                    <Tooltip
                      title={
                        <Comparison current={processingValue.current} prev={processingValue.prev} _startTime={_startTime} _endTime={_endTime}/>
                      }
                    >
                      <InfoCircleOutlined />
                    </Tooltip>
                  }
                  loading={loading}
                  total={() => <Yuan>{processingValue.current}</Yuan>}
                  footer={<CardFooter current={processingValue.current} prev={processingValue.prev}/>}
                  contentHeight={46}
                />
              </Col>
              <Col {..._topColResponsiveProps}>
                <ChartCard
                  bordered={false}
                  title="Total Shipped Value"
                  action={
                    <Tooltip
                      title={
                        <Comparison current={shippedValue.current} prev={shippedValue.prev} _startTime={_startTime} _endTime={_endTime}/>
                      }
                    >
                      <InfoCircleOutlined />
                    </Tooltip>
                  }
                  loading={loading}
                  total={() => <Yuan>{shippedValue.current}</Yuan>}
                  footer={<CardFooter current={shippedValue.current} prev={shippedValue.prev}/>}
                  contentHeight={46}
                />
              </Col>
            </Row>
            <Row gutter={[24, 24]}>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={false}
                  title="Total RMA Value"
                  action={
                    <Tooltip
                      title={
                        <Comparison current={totalRma.current} prev={totalRma.prev} _startTime={_startTime} _endTime={_endTime}/>
                      }
                    >
                      <InfoCircleOutlined />
                    </Tooltip>
                  }
                  loading={loading}
                  total={() => <Yuan>{totalRma.current}</Yuan>}
                  footer={<CardFooter current={totalRma.current} prev={totalRma.prev}/>}
                  contentHeight={46}
                />
              </Col>

              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={false}
                  title="Lost RMA Value"
                  action={
                    <Tooltip
                      title={
                        <Comparison current={lostRma.current} prev={lostRma.prev} _startTime={_startTime} _endTime={_endTime}/>
                      }
                    >
                      <InfoCircleOutlined />
                    </Tooltip>
                  }
                  loading={loading}
                  total={() => <Yuan>{lostRma.current}</Yuan>}
                  footer={<CardFooter current={lostRma.current} prev={lostRma.prev}/>}
                  contentHeight={46}
                />
              </Col>

              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={false}
                  title="Total Losses Value"
                  action={
                    <Tooltip
                      title={
                        <Comparison current={totalLosses.current} prev={totalLosses.prev} _startTime={_startTime} _endTime={_endTime}/>
                      }
                    >
                      <InfoCircleOutlined />
                    </Tooltip>
                  }
                  loading={loading}
                  total={() => <Yuan>{totalLosses.current}</Yuan>}
                  footer={<CardFooter current={totalLosses.current} prev={totalLosses.prev}/>}
                  contentHeight={46}
                />
              </Col>
            </Row>
          </Suspense>
        </Col>
      </Row>
      <Row gutter={24} style={{marginTop: 20}}>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <Card
              loading={loading}
              bordered={false}
              title="Total losses with and without RMA assigned"
              style={{
                height: '100%',
              }}
            >
              {
                totalLossesWithRma && totalLossesWithoutRma ? (
                  <Pie
                    radius={0.8}
                    angleField="y"
                    colorField="x"
                    data={[
                      {
                        x: 'With RMA assigned',
                        y: totalLossesWithRma.current,
                        a: diffAndPercentage.diff,
                        b: diffAndPercentage.percentage
                      },
                      {
                        x: 'Without RMA assigned',
                        y: totalLossesWithoutRma.current,
                        a: _diffAndPercentage.diff,
                        b: _diffAndPercentage.percentage
                      }
                    ]}
                    label={{
                      type: 'outer',
                      style: {
                        fontSize: 15
                      },
                      formatter: (text, item) => {
                        return `${numeral(item._origin.y).format('0,0.00')}€`;
                      }
                    }}
                    interactions={[{ type: 'element-single-selected' }, { type: 'element-active' }]}
                    tooltip={{
                      customContent: (title, data) => {
                        return data.length > 0 ?
                          `<div style="padding: 10px; font-size: 15px">` +
                          `${data[0]['data']['x']}`+
                          `</div>` +
                          `<div style="padding: 10px; font-size: 15px">` +
                          `${data[0]['data']['y']}€`+
                          `</div>` +
                          `<div style="padding: 10px; font-size: 15px">` +
                          `Compared: ${time}`+
                          `</div>` +
                          `<div style="padding: 10px; font-size: 15px">` +
                          `${data[0]['data']['a']}`+
                          `</div>` +
                          `<div style="padding: 10px; font-size: 15px">` +
                          `${data[0]['data']['b']}`+
                          `</div>`
                          : ``;
                      }
                    }}
                  />
                ) : (
                  <Empty/>
                )
              }
            </Card>
          </Suspense>
        </Col>
      </Row>
    </GridContent>
  );
};

export default InventoryLosses;
