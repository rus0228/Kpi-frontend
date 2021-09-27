import { Col, Row, Card, Statistic} from 'antd';
import {useModel, useRequest} from 'umi';
import {GridContent, PageLoading} from '@ant-design/pro-layout';
import React, {Suspense, useState} from "react";
import styles from "@/pages/dashboard/repairs/style.less";
import {fakeChartData, getSellPhoneData, getCustomSellPhoneData} from "./service";
import SellPhoneBarPanel from './components/SellPhoneBarPanel'
import moment from "moment";

const SellPhone = () => {
  const {initialState} = useModel('@@initialState');
  const { loading, data } = useRequest(fakeChartData);
  const [sellPhoneData, setSellPhoneData] = useState([]);
  const [customSellPhoneData, setCustomSellPhoneData] = useState({});
  const changeTimeType = (time) => {
    const seconds = Math.floor(parseFloat(time));
    const hours = Math.floor(seconds / 3600);
    const minSeconds = seconds % 3600;
    const mins = Math.floor(minSeconds / 60);
    const secs = minSeconds % 60;
    return `${hours}h ${mins}m ${secs}s`;
  }
  React.useEffect(() => {
    const startTime = moment(initialState.range[0]).format('YYYY-MM-DD HH:mm:ss');
    const endTime = moment(initialState.range[1]).format('YYYY-MM-DD HH:mm:ss');
    getSellPhoneData(startTime, endTime).then((res) => {
      setSellPhoneData(res)
    })
    getCustomSellPhoneData(startTime, endTime).then((res) => {
      setCustomSellPhoneData({
        'total_amount': res['total_amount'],
        'average_amount': res['average_amount'],
        'average_time': changeTimeType(res['average_time'])
      })
    })
  }, [initialState])

  return (
    <GridContent>
      <>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <SellPhoneBarPanel
                loading={loading}
                barData={sellPhoneData}
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
                <Col span={8}>
                  <Statistic title="Total amount paid" value={customSellPhoneData['total_amount']} precision={2} suffix="€"/>
                </Col>
                <Col span={8}>
                  <Statistic title="Average amount paid" value={customSellPhoneData['average_amount']} precision={2} suffix="€" />
                </Col>
                <Col span={8}>
                  <Statistic title="Average time between received and finished" value={customSellPhoneData['average_time']} precision={2} />
                </Col>
              </Row>
            </div>
          </Card>
        </Suspense>
      </>
    </GridContent>
  );
};

export default SellPhone;
