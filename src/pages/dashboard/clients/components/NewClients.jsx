import React from 'react';
import { Card, Radio, DatePicker, Statistic } from 'antd';
import numeral from 'numeral';

import styles from '../style.less';

const NewClients = ({loading, value}) => {

  const clients = React.useMemo(() => {
    return Object.keys(value).length !== 0 ? {
      current: value['current']['count'],
      prev: value['prev']['count']
    } : null
  }, [value])

  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title="Number of New Clients"
      style={{
        height: '100%',
      }}
      size='small'
    >
      {
        clients ? (
          <div style={{display: 'flex', justifyContent: 'center'}}>
            {clients.current} ({clients.current - clients.prev})
          </div>
        ) : (
          <div></div>
        )
      }
    </Card>
  )
};

export default NewClients;
