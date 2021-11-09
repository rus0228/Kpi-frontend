import React from 'react';
import styles from "@/pages/dashboard/revenue/style.less";
import {Col, Row, Statistic, Radio} from "antd";
const responsiveProps = {
  xs: 12,
  sm: 12,
  md: 8,
  lg: 8,
  xl: 8
};
const RevenueCard = ({totalValue}) => {
  return (
    <div className={styles.salesCard}>
      <Row gutter={16}>
        <Col {...responsiveProps}>
          <Statistic title="Total Revenue with IVA" value={totalValue['totalRevenueWithIva']} precision={2} suffix="€"/>
        </Col>
        <Col {...responsiveProps}>
          <Statistic title="Total Revenue without IVA" value={totalValue['totalRevenueWithoutIva']} precision={2} suffix="€"/>
        </Col>
        <Col {...responsiveProps}>
          <Statistic title="Total Revenue" value={totalValue['totalRevenue']} precision={2} suffix="€"/>
        </Col>
      </Row>
      <Row gutter={16} style={{marginTop: 24}}>
        <Col {...responsiveProps}>
          <Statistic title="Total Profit with IVA" value={totalValue['totalProfitWithIva']} precision={2} suffix="€"/>
        </Col>
        <Col {...responsiveProps}>
          <Statistic title="Total Profit without IVA" value={totalValue['totalProfitWithoutIva']} precision={2} suffix="€"/>
        </Col>
        <Col {...responsiveProps}>
          <Statistic title="Total Profit" value={totalValue['totalProfit']} precision={2} suffix="€"/>
        </Col>
      </Row>
    </div>
  )
}

export default RevenueCard;
