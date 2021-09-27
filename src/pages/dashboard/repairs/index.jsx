import { Col, Row, Card, Statistic} from 'antd';
import { useRequest } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import React, { Suspense, useState } from "react";
import NumRepairs from "./components/NumRepairs";
import RepairType from "./components/RepairType";
import { getTimeDistance } from "@/pages/dashboard/analysis/utils/utils";
import { fakeChartData, getNumberOfRepairs, getRepairType } from "./service";
import PageLoading from "@/pages/dashboard/analysis/components/PageLoading";
import styles from "@/pages/dashboard/analysis/style.less";
import moment from "moment";

const Monitor = () => {
  const [rangePickerValue, setRangePickerValue] = useState(getTimeDistance('year'));
  const { loading, data } = useRequest(fakeChartData);
  const [numberOfRepairsData, setNumberOfRepairsData] = useState([]);
  const [restRepairData, setRestRepairData] = useState({});
  const [repairTypeData, setRepairTypeData] = useState([])

  const changeTimeType = (time) => {
    const seconds = Math.floor(parseFloat(time));
    const hours = Math.floor(seconds / 3600);
    const minSeconds = seconds % 3600;
    const mins = Math.floor(minSeconds / 60);
    const secs = minSeconds % 60;
    return `${hours}h ${mins}m ${secs}s`;
  }

  React.useEffect(() => {
    getRepairType().then((res) => {
      console.log(res)
      setRepairTypeData(res);
    })
  }, [])

  React.useEffect(() => {
    const startTime = moment(rangePickerValue[0]).format('YYYY-MM-DD HH:mm:ss');
    const endTime = moment(rangePickerValue[1]).format('YYYY-MM-DD HH:mm:ss');
    getNumberOfRepairs(startTime, endTime)
      .then((res) => {
        console.log(res)
        setNumberOfRepairsData(res[0])
        setRestRepairData({
          completed: res[1][0]['completed'],
          cancelled: res[2][0]['cancelled'],
          average_time_repair: changeTimeType(res[3][0]['average_time_repair']),
          average_value_repair: res[4][0]['average_value_repair']
        })
      })
  }, [])

  const handleRangePickerChange = (value) => {
    setRangePickerValue(value);
    const startTime = moment(value[0]).format('YYYY-MM-DD HH:mm:ss');
    const endTime = moment(value[1]).format('YYYY-MM-DD HH:mm:ss');
    getNumberOfRepairs(startTime, endTime).then((res) => {
      setNumberOfRepairsData(res[0])
      setRestRepairData({
        completed: res[1][0]['completed'],
        cancelled: res[2][0]['cancelled'],
        average_time_repair: new Date(parseFloat(res[3][0]['average_time_repair']) * 1000).toISOString().substr(11, 8),
        average_value_repair: res[3][0]['average_value_repair']
      })
    })
  };

  return (
    <GridContent>
      <>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <NumRepairs
                loading={loading}
                NumberOfRepairsData={numberOfRepairsData}
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
              marginBottom: 24
            }}
          >
            <div className={styles.salesCard}>
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title="Number of repairs completed" value={restRepairData['completed']}/>
                </Col>
                <Col span={12}>
                  <Statistic title="Number of repairs without repair" value={restRepairData['cancelled']}/>
                </Col>
              </Row>
              <Row gutter={16} style={{marginTop: 24}}>
                <Col span={12}>
                  <Statistic title="Average time between status processing and completed"
                             value={restRepairData['average_time_repair']}/>
                </Col>
                <Col span={12}>
                  <Statistic title="Average repair value" value={restRepairData['average_value_repair']} suffix="€" precision={2}/>
                </Col>
              </Row>
            </div>
          </Card>
        </Suspense>

        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <RepairType
                loading={loading}
                repairTypeData={repairTypeData}
              />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <RepairType
                loading={loading}
                repairTypeData={repairTypeData}
              />
            </Suspense>
          </Col>
        </Row>
      </>
    </GridContent>
  );
};

export default Monitor;
