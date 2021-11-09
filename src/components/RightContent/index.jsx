import { Space, DatePicker, Select } from 'antd';
import React, {useState} from 'react';
import { useModel } from 'umi';
import styles from './index.less';
import {getTimeDistance} from "@/pages/dashboard/revenue/utils/utils";
import {isMobile} from 'react-device-detect';

const {RangePicker} = DatePicker;
const {Option} = Select
const GlobalHeaderRight = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [range, setRange] = useState(getTimeDistance('year'));
  const [store, setStore] = useState('0');
  const [compare, setCompare] = useState('lastDuration')
  React.useEffect(() => {
    setInitialState(
      {...initialState,
        store: store,
        range: range,
        compare: compare
      })
  }, [range, store, compare])

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const onStoreChange = (value) => {
    setStore(value);
  }

  const handleRangePickerChange = (value) => {
    if (value){
      setRange(value)
    }else {
      setRange(getTimeDistance('year'))
    }
  }

  const onCompareChange = (value) => {
    setCompare(value)
  }

  const Panel = () => {
    return (
      <>
        <Select value={compare} onChange={onCompareChange} style={{marginLeft: 6}}>
          <Option value="lastDuration">Last Duration</Option>
          <Option value="lastYear">Last Year</Option>
        </Select>
        <RangePicker
          value={range}
          onChange={handleRangePickerChange}
          style={{marginLeft: 6}}
        />
        <Select value={store} onChange={onStoreChange} style={{marginLeft: 6}}>
          <Option value="0">All</Option>
          <Option value="1">Store 1</Option>
          <Option value="2">Store 2</Option>
          <Option value="3">Store 3</Option>
        </Select>
      </>
    )
  }
  return (
    <>
      <Space className={className}>
        {
          !isMobile && <Panel />
        }
      </Space>
      {
        isMobile &&
        <div style={{display: 'flex', flexDirection: 'column', position: 'absolute', top: 70, gap: 24}}>
          <Panel />
        </div>
      }
    </>
  );
};

export default GlobalHeaderRight;
