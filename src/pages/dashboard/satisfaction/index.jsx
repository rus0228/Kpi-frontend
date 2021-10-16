import { Col, Row, Card, Statistic} from 'antd';
import {useModel, useRequest} from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import React, { Suspense, useState } from "react";
import styles from "@/pages/dashboard/repairs/style.less";
import {Pie} from "@ant-design/charts";
import numeral from "numeral";
import {getCustomerEvaluation, fakeChartData} from "./service";
import moment from "moment";
import {getChangedGlobalStates, getDiffAndPercentage} from "@/pages/dashboard/CustomUtils";
import {isMobile} from 'react-device-detect';
const mobileStyle = isMobile ? {marginTop: 164} : {};

const Satisfaction = () => {
  const {initialState} = useModel('@@initialState');
  const { loading } = useRequest(fakeChartData);
  const [evaluationData, setEvaluationData] = useState([]);

  const changedStates = getChangedGlobalStates(initialState);
  const {startTime, endTime, _startTime, _endTime, store} = changedStates;

  const time = `${moment(_startTime).format('YYYY/MM/DD')} ~ ${moment(_endTime).format('YYYY/MM/DD')}`;
  React.useEffect(() => {
    getCustomerEvaluation(startTime, endTime, _startTime, _endTime, store).then((res) => {
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
    <GridContent style={mobileStyle}>
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
                  <Pie
                    radius={0.8}
                    angleField="y"
                    colorField="x"
                    data={evaluationData}
                    label={{
                      type: 'outer',
                      style: {
                        fontSize: 15
                      },
                      formatter: (text, item) => {
                        return `${numeral(item._origin.y).format('0,0')}`;
                      },
                      content: '{percentage}'
                    }}
                    interactions={[{ type: 'element-single-selected' }, { type: 'element-active' }]}
                    tooltip={{
                      customContent: (title, data) => {
                        return data.length > 0 ?
                          `<div style="padding: 10px; font-size: 15px">` +
                          `${data[0]['data']['x']}`+
                          `</div>` +
                          `<div style="padding: 10px; font-size: 15px">` +
                          `${data[0]['data']['y']}`+
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
