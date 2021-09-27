import { Space, DatePicker, Select } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React, {useState} from 'react';
import { useModel } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import NoticeIconView from '../NoticeIcon';
import moment from "moment";
import {getTimeDistance} from "@/pages/dashboard/analysis/utils/utils";

const {RangePicker} = DatePicker;
const {Option} = Select
const GlobalHeaderRight = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const [range, setRange] = useState(getTimeDistance('year'));
  const [store, setStore] = useState('0');

  React.useEffect(() => {
    setInitialState({...initialState, store: store, range: range})
  }, [range, store])

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
    setRange(value)
  }
  return (
    <Space className={className}>
      <RangePicker
        value={range}
        onChange={handleRangePickerChange}
      />
      <Select value={store} style={{ width: 120 }} onChange={onStoreChange}>
        <Option value="0">All</Option>
        <Option value="1">Store 1</Option>
        <Option value="2">Store 2</Option>
        <Option value="3">Store 3</Option>
      </Select>
      <Avatar menu />
    </Space>
  );
};

export default GlobalHeaderRight;
