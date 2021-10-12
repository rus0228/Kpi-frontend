import React from 'react';
import { Card, Radio, DatePicker, Statistic } from 'antd';
import numeral from 'numeral';

import styles from '../style.less';

const NewProducts = ({loading, value}) => {
  const products = React.useMemo(() => {
    return Object.keys(value).length !== 0 ? {
      current: value['current']['count'],
      prev: value['prev']['count']
    } : null
  }, [value])
  return (
    <>
      <Card
        loading={loading}
        className={styles.salesCard}
        bordered={false}
        title="Number of new products"
        style={{
          height: '100%',
        }}
        size='small'
      >
        {
          products ? (
            <div style={{display: 'flex', justifyContent: 'center'}}>
              {products.current} ({products.current - products.prev})
            </div>
          ) : (
            <div></div>
          )
        }
      </Card>
    </>
  )
}

export default NewProducts;
