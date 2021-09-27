import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts';
import {Col, Row, Statistic, Tooltip} from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';
import React from "react";
const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 12,
  style: {
    marginBottom: 24,
  },
};

const IntroduceRow = ({ loading, visitData }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="Total Cost of goods"
        action={
          <Tooltip title="Total Cost of goods">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={
          <Statistic value={visitData['totalCost'] === null ? 0 : visitData['totalCost']} precision={2} suffix="€"/>
        }
        contentHeight={46}
      />
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="Total IVA"
        action={
          <Tooltip title="Total IVA">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={
          <Statistic
            value={
              parseFloat(visitData['totalSalesTax']) +
              parseFloat(visitData['totalRepairTax']) -
              parseFloat(visitData['totalReturnsTax'])
            }
            precision={2}
            suffix="€"
          />
        }
        contentHeight={46}
      />
    </Col>
  </Row>
);

export default IntroduceRow;
