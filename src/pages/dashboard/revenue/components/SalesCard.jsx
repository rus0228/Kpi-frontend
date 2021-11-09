import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import { Column, ColumnLine } from '@ant-design/charts';
import numeral from 'numeral';
import styles from '../style.less';
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const SalesCard = ({rangePickerValue, salesData, isActive, handleRangePickerChange, loading, selectDate}) => {
  const uvData = []
  const transformData = []
  if (salesData.length > 0){
    salesData.map((item) => {
      uvData.push({
        time: item['time'],
        revenue: item['revenue']
      });
      transformData.push({
        time: item['time'],
        profit: item['profit']
      })
    })
  }
  const config = {
    data : [ uvData, transformData ],
    xField : 'time',
    yField : [ 'revenue', 'profit' ],
    columnConfig : { color : '#586bce' },
    lineConfig : {
      color : '#29cae4',
      point : { visible : true },
      label : { visible : true },
    }
  };
  return (
    <Card
      loading={loading}
      bordered={false}
      bodyStyle={{
        padding: 0,
      }}
    >
      <div className={styles.salesCard}>
        <Tabs
          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              <div className={styles.salesExtra}>
                <a className={isActive('today')} onClick={() => selectDate('today')}>
                  today
                </a>
                <a className={isActive('week')} onClick={() => selectDate('week')}>
                  week
                </a>
                <a className={isActive('month')} onClick={() => selectDate('month')}>
                  month
                </a>
                <a className={isActive('year')} onClick={() => selectDate('year')}>
                  year
                </a>
              </div>
              <RangePicker
                value={rangePickerValue}
                onChange={handleRangePickerChange}
                style={{
                  width: 256,
                }}
              />
            </div>
          }
          size="large"
          tabBarStyle={{
            marginBottom: 24,
          }}
        >
          <TabPane tab="sales" key="sales">
            <Row>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <ColumnLine { ...config }/>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="repairs" key="repairs">
            <Row>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <ColumnLine { ...config }/>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="credit notes" key="credit_notes">
            <Row>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <ColumnLine { ...config }/>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="purchase orders" key="purchase_orders">
            <Row>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <ColumnLine { ...config }/>
                </div>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </Card>
  )
};

export default SalesCard;
