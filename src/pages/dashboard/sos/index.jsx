import { Col, Row, Card, Statistic} from 'antd';
import {useModel, useRequest} from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import React, {Suspense, useRef, useState} from "react";
import styles from "@/pages/dashboard/repairs/style.less";
import {fakeChartData, getSosCustomData, getSosData} from "./service";
import SosBarPanel from "./components/SosBarPanel";
import moment from "moment";
import PageLoading from "@/pages/dashboard/analysis/components/PageLoading";

const Sos = () => {
  const {initialState} = useModel('@@initialState');
  const { loading, data } = useRequest(fakeChartData);
  const [sosData, setSosData] = useState([]);
  const [sosCustomData, setSosCustomData] = useState({})

  const changeTimeType = (time) => {
    const seconds = Math.floor(parseFloat(time));
    const hours = Math.floor(seconds / 3600);
    const minSeconds = seconds % 3600;
    const mins = Math.floor(minSeconds / 60);
    const secs = minSeconds % 60;
    return `${hours}h ${mins}m ${secs}s`;
  }

  const store = initialState.store;
  const startTime = moment(initialState.range[0]).format('YYYY-MM-DD HH:mm:ss');
  const endTime = moment(initialState.range[1]).format('YYYY-MM-DD HH:mm:ss');
  React.useEffect(() => {
    getSosData(startTime, endTime, store).then((res) => {
      console.log(res)
      setSosData(res)
    })
  }, [initialState])

  React.useEffect(() => {
    getSosCustomData(startTime, endTime).then((res) => {
      console.log(res)
      setSosCustomData({
        'average_time': changeTimeType(res['average_time']),
        'total_revenue': res['total_revenue']
      })
    })
  }, [initialState])
  return (
    <GridContent>
      <>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <SosBarPanel
                barData={sosData}
                loading={loading}
              />
            </Suspense>
          </Col>
        </Row>
        <Suspense fallback={<PageLoading />}>
          <Card
            loading={loading}
            bordered={false}
            bodyStyle={{
              padding: 24,
              marginTop: 24
            }}
          >
            <div className={styles.salesCard}>
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title="Average time between received and shipped"
                             value={sosCustomData['average_time']}
                  />
                </Col>
                <Col span={12}>
                  <Statistic title="Total revenue" value={sosCustomData['total_revenue']} precision={2} suffix="€"/>
                </Col>
              </Row>
            </div>
          </Card>
        </Suspense>
      </>
    </GridContent>
  );
};

export default Sos;
