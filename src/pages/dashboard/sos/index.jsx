import { Col, Row, Card, Statistic} from 'antd';
import { useRequest } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import React, {Suspense, useRef, useState} from "react";
import styles from "@/pages/dashboard/repairs/style.less";
import {fakeChartData, getSosCustomData, getSosData} from "./service";
import SosBarPanel from "./components/SosBarPanel";
import moment from "moment";
import {getNumberOfRepairs} from "@/pages/dashboard/repairs/service";
import {getTimeDistance} from "@/pages/dashboard/analysis/utils/utils";
import PageLoading from "@/pages/dashboard/analysis/components/PageLoading";

const Sos = () => {
  const [rangePickerValue, setRangePickerValue] = React.useState(getTimeDistance('year'));
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
  React.useEffect(() => {
    const startTime = moment(rangePickerValue[0]).format('YYYY-MM-DD HH:mm:ss');
    const endTime = moment(rangePickerValue[1]).format('YYYY-MM-DD HH:mm:ss');
    getSosData(startTime, endTime).then((res) => {
      console.log(res)
      setSosData(res)
    })
  }, [])

  React.useEffect(() => {
    getSosCustomData().then((res) => {
      console.log(res)
      setSosCustomData({
        'average_time': changeTimeType(res['average_time']),
        'total_revenue': res['total_revenue']
      })
    })
  }, [])

  const handleRangePickerChange = (value) => {
    setRangePickerValue(value);
    const startTime = moment(value[0]).format('YYYY-MM-DD HH:mm:ss');
    const endTime = moment(value[1]).format('YYYY-MM-DD HH:mm:ss');
    getSosData(startTime, endTime).then((res) => {
      console.log(res)
      setSosData(res)
    })
  }
  return (
    <GridContent>
      <>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <SosBarPanel
                barData={sosData}
                loading={loading}
                rangePickerValue={rangePickerValue}
                handleRangePickerChange={handleRangePickerChange}
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
