import { Card, Radio, Typography, DatePicker } from 'antd';
import numeral from 'numeral';
import { Donut } from '@ant-design/charts';
import React from 'react';
import styles from '../style.less';
const {RangePicker} = DatePicker;

const ProportionSales = ({
  salesType,
  loading,
  salesPieData,
  handleChangeSalesType,
  rangePickerValue,
  handleRangePickerChange
}) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    title="Best selling products(quantity)"
    style={{
      height: '100%',
    }}
    extra={
      <div className={styles.salesCardExtra}>
        <RangePicker
          value={rangePickerValue}
          onChange={handleRangePickerChange}
          style={{
            width: 256,
          }}
        />
      </div>
    }
  >
    <div>
      <Donut
        forceFit
        height={340}
        radius={0.8}
        angleField="y"
        colorField="x"
        data={salesPieData}
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
          totalLabel: '销售额',
        }}
      />
    </div>
  </Card>
);

export default ProportionSales;
