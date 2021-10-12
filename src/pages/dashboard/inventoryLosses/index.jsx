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

const getDiffAndPercentage = (cur, prev, symbol) => {
  const prefix = symbol === 0 ? '' : '€'
  const diff = symbol === 0 ? cur - prev : (cur - prev).toFixed(2);
  const percentage = (diff / prev) * 100;
  return {
    diff: diff > 0 ? `+${diff}${prefix}` : `${diff}${prefix}`,
    percentage: percentage > 0 ? `+${percentage.toFixed(2)}` : percentage.toFixed(2)
  }
}

const topColResponsiveProps = {
  xs: 24,
  sm: 8,
  md: 8,
  lg: 8,
  xl: 8
};
const InventoryLosses = () => {
  const {initialState} = useModel('@@initialState');
  const { loading, data } = useRequest(fakeChartData);

  const [totalRma, setTotalRma] = useState({current: 0, prev: 0});
  const [lostRma, setLostRma] = useState({current: 0, prev: 0});
  const [totalLossesWithRma, setTotalLossesWithRma] = useState({current: 0, prev: 0});
  const [totalLossesWithoutRma, setTotalLossesWithoutRma] = useState({current: 0, prev: 0});

  const totalLosses = {
    current: lostRma.current + totalLossesWithoutRma.current,
    prev: lostRma.prev + totalLossesWithoutRma.prev
  }
  const store = initialState.store;
  const startTime = moment(initialState.range[0]).format('YYYY-MM-DD HH:mm:ss');
  const endTime = moment(initialState.range[1]).format('YYYY-MM-DD HH:mm:ss');

  const duration = moment(endTime).diff(startTime, 'days');
  const _startTime = moment(startTime).subtract(duration + 2, 'days').format('YYYY-MM-DD');
  const _endTime = moment(_startTime).add(duration + 1, 'days').format('YYYY-MM-DD');
  const time = `${_startTime} ~ ${_endTime}`;
  React.useEffect(() => {
    getInventoryLossesData(startTime, endTime, store, 'totalRma').then((res) => {
      setTotalRma({...res})
    })
    getInventoryLossesData(startTime, endTime, store, 'lostRma').then((res) => {
      setLostRma({...res})
    })
    getInventoryLossesData(startTime, endTime, store, 'totalLossesWithRma').then((res) => {
      setTotalLossesWithRma({...res})
    })
    getInventoryLossesData(startTime, endTime, store, 'totalLossesWithoutRma').then((res) => {
      setTotalLossesWithoutRma({...res})
    })
  }, [initialState])
  const diffAndPercentage = getDiffAndPercentage(parseFloat(totalLossesWithRma.current), parseFloat(totalLossesWithRma.prev), 1);
  const _diffAndPercentage = getDiffAndPercentage(parseFloat(totalLossesWithoutRma.current), parseFloat(totalLossesWithoutRma.prev), 1);
  return (
    <GridContent>
      <Row gutter={24}>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Suspense fallback={null}>
            <Row gutter={24}>
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
              size='small'
            >
              {
                totalLossesWithRma && totalLossesWithoutRma ? (
                  <Pie
                    forceFit
                    height={340}
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
                      visible: true,
                      type: 'spider',
                      formatter: (text, item) => {
                        // eslint-disable-next-line no-underscore-dangle
                        return `${item._origin.x}: ${numeral(item._origin.y).format('0,0.00')}€`;
                      },
                      style: {
                        fontSize: 15
                      }
                    }}
                    tooltip={{
                      customContent: (title, data) => {
                        return data.length > 0 ?
                          `<div style="padding: 10px; font-size: 15px"">` +
                          `${time}`+
                          `</div>` +
                          `<div style="padding: 10px; font-size: 15px"">` +
                          `${data[0]['data']['a']}`+
                          `</div>` +
                          `<div style="padding: 10px; font-size: 15px"">` +
                          `${data[0]['data']['b']}%`+
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
