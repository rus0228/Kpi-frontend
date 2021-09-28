import { Col, Row, Card, Statistic} from 'antd';
import {useModel, useRequest} from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import React, { Suspense, useState } from "react";
import styles from "@/pages/dashboard/repairs/style.less";
import {Donut} from "@ant-design/charts";
import numeral from "numeral";
import {getCustomerEvaluation, fakeChartData} from "./service";
import moment from "moment";

const Satisfaction = () => {
  const {initialState} = useModel('@@initialState');
  const { loading } = useRequest(fakeChartData);
  const [evaluationData, setEvaluationData] = useState([])
  const store = initialState.store;
  const startTime = moment(initialState.range[0]).format('YYYY-MM-DD HH:mm:ss');
  const endTime = moment(initialState.range[1]).format('YYYY-MM-DD HH:mm:ss');
  React.useEffect(() => {
    getCustomerEvaluation(startTime, endTime, store).then((res) => {
      const data = []
      res.map((item) => {
        data.push({
          x: `star ${item['star_rating']}`,
          y: item['count']
        })
      })
      setEvaluationData([...data])
    })
  }, [initialState])
  return (
    <GridContent>
      <>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <Card
                loading={loading}
                className={styles.salesCard}
                bordered={false}
                title="Customer Satisfaction"
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
                    data={evaluationData}
                    legend={{
                      visible: false,
                    }}
                    label={{
                      visible: true,
                      type: 'spider',
                      formatter: (text, item) => {
                        // eslint-disable-next-line no-underscore-dangle
                        return `${item._origin.x}: ${numeral(item._origin.y).format('0,0')}`;
                      },
                    }}
                    statistic={{
                      totalLabel: 'Total',
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

export default Satisfaction;
