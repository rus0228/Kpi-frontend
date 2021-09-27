import { Col, Row, Card, Statistic} from 'antd';
import {useModel, useRequest} from 'umi';
import {GridContent, PageLoading} from '@ant-design/pro-layout';
import React, {Suspense, useRef, useState} from "react";
import {fakeChartData, getTotalAndLostRmaData, getTotalLossesData} from "./service";
import moment from "moment";
import RmaBarPanel from './components/RmaBarPanel'
import styles from "@/pages/dashboard/inventoryLosses/style.less";
import {Bar, Donut} from "@ant-design/charts";
import numeral from "numeral";

const InventoryLosses = () => {
  const {initialState} = useModel('@@initialState');
  const { loading, data } = useRequest(fakeChartData);
  const [totalAndLostRmaData, setTotalAndLostRmaData] = useState([]);
  const [totalLossesData, setTotalLossesData] = useState([]);

  React.useEffect(() => {
    const store = initialState.store;
    const startTime = moment(initialState.range[0]).format('YYYY-MM-DD HH:mm:ss');
    const endTime = moment(initialState.range[1]).format('YYYY-MM-DD HH:mm:ss');
    getTotalAndLostRmaData(startTime, endTime, store).then((res) => {
      setTotalAndLostRmaData(res)
    })
    getTotalLossesData(startTime, endTime, store).then((res) => {
      const buffer = [
        {
          x: 'Total Losses with RMA',
          y: parseFloat(res[0]['withRma'])
        },
        {
          x: 'Total Losses without RMA',
          y: parseFloat(res[0]['withoutRma'])
        }
      ]
      setTotalLossesData(buffer)
    })
  }, [initialState.store, initialState.range])

  return (
    <GridContent>
      <>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <RmaBarPanel
                loading={loading}
                barData={totalAndLostRmaData}
              />
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
                <div>
                  <Donut
                    forceFit
                    height={340}
                    radius={0.8}
                    angleField="y"
                    colorField="x"
                    data={totalLossesData}
                    legend={{
                      visible: false,
                    }}
                    label={{
                      visible: true,
                      type: 'spider',
                      formatter: (text, item) => {
                        // eslint-disable-next-line no-underscore-dangle
                        return `${item._origin.x}: ${numeral(item._origin.y).format('0,0.00')}`;
                      },
                      style: {
                        fontSize: 15
                      }
                    }}
                    statistic={{
                      visible: false
                    }}
                  />
                </div>
              </Card>
            </Suspense>
          </Col>
        </Row>
      </>
    </GridContent>
  );
};

export default InventoryLosses;
