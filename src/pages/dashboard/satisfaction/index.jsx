import { Col, Row, Card, Statistic} from 'antd';
import {useModel, useRequest} from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import React, { Suspense, useState } from "react";
import styles from "@/pages/dashboard/repairs/style.less";
import {Pie} from "@ant-design/charts";
import numeral from "numeral";
import {getCustomerEvaluation, fakeChartData} from "./service";
import moment from "moment";

const getDiffAndPercentage = (cur, prev, symbol) => {
  const prefix = symbol === 0 ? '' : '€'
  const diff = symbol === 0 ? cur - prev : (cur - prev).toFixed(2);
  const percentage = (diff / prev) * 100;
  return {
    diff: diff > 0 ? `+${diff}${prefix}` : `${diff}${prefix}`,
    percentage: percentage > 0 ? `+${percentage.toFixed(2)}` : percentage.toFixed(2)
  }
}

const Satisfaction = () => {
  const {initialState} = useModel('@@initialState');
  const { loading } = useRequest(fakeChartData);
  const [evaluationData, setEvaluationData] = useState([])
  const store = initialState.store;
  const startTime = moment(initialState.range[0]).format('YYYY-MM-DD HH:mm:ss');
  const endTime = moment(initialState.range[1]).format('YYYY-MM-DD HH:mm:ss');
  const duration = moment(endTime).diff(startTime, 'days');
  const _startTime = moment(startTime).subtract(duration + 2, 'days').format('YYYY-MM-DD');
  const _endTime = moment(_startTime).add(duration + 1, 'days').format('YYYY-MM-DD');
  const time = `${_startTime} ~ ${_endTime}`;
  React.useEffect(() => {
    getCustomerEvaluation(startTime, endTime, store).then((res) => {
      const data = []
      res.map((item) => {
        const diffAndPercentage = getDiffAndPercentage(parseFloat(item['current']), parseFloat(item['prev']), 0)
        data.push({
          x: `${item['rating']} stars:`,
          y: item['current'],
          a: diffAndPercentage.diff,
          b: diffAndPercentage.percentage
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
                size='small'
              >
                <div>
                  <Pie
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
                      content: '{name} {percentage}',
                      formatter: (text, item) => {
                        // eslint-disable-next-line no-underscore-dangle
                        return `${item._origin.x}: ${numeral(item._origin.y).format('0,0')}`;
                      },
                      style: {
                        fontSize: 15
                      }
                    }}
                    statistic={{
                      totalLabel: 'Total',
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
