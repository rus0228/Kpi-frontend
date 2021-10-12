import React from 'react';
import {Col, Row, Tooltip} from 'antd';
import {useModel, useRequest} from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import {Suspense, useState} from "react";
import {fakeChartData, getNumberOfNewProducts, getBestSellingProductsData} from "./service";
import BestSelling from './components/BestSelling';
import moment from "moment";
import {CardFooter, Comparison, ComparisonInt} from "@/pages/dashboard/CustomComponent";
import {InfoCircleOutlined} from "@ant-design/icons";
import {ChartCard} from "@/pages/dashboard/analysis/components/Charts";

const Monitor = () => {
  const {initialState} = useModel('@@initialState');
  const { loading, data } = useRequest(fakeChartData);
  const [newProducts, setNewProducts] = useState([]);
  const [bestSellingData, setBestSellingData] = useState([]);

  const store = initialState.store;
  const startTime = moment(initialState.range[0]).format('YYYY-MM-DD HH:mm:ss');
  const endTime = moment(initialState.range[1]).format('YYYY-MM-DD HH:mm:ss');
  const duration = moment(endTime).diff(startTime, 'days');
  const _startTime = moment(startTime).subtract(duration + 2, 'days').format('YYYY-MM-DD');
  const _endTime = moment(_startTime).add(duration + 1, 'days').format('YYYY-MM-DD');

  React.useEffect(() => {
    getBestSellingProductsData(startTime, endTime, store).then((res) => {
      setBestSellingData(res);
    })
    getNumberOfNewProducts(startTime, endTime, store).then((res) => {
      console.log(res);
      setNewProducts(res);
    })
  }, [initialState.store, initialState.range]);

  return (
    <GridContent>
      <>
        <Row gutter={24} style={{marginBottom: 24}}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              {
                Object.keys(newProducts).length > 0 ? (
                  <ChartCard
                    bordered={false}
                    title="Number of New Products"
                    action={
                      <Tooltip
                        title={
                          <ComparisonInt current={newProducts['current']['count']} prev={newProducts['prev']['count']} _startTime={_startTime} _endTime={_endTime}/>
                        }
                      >
                        <InfoCircleOutlined />
                      </Tooltip>
                    }
                    loading={loading}
                    total={() => <div>{newProducts['current']['count']}</div>}
                    footer={<CardFooter current={newProducts['current']['count']} prev={newProducts['prev']['count']}/>}
                    contentHeight={46}
                  />
                ) : (
                  <div/>
                )
              }
            </Suspense>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <BestSelling
                loading={loading}
                bestSellingData={bestSellingData}
                time={`${_startTime} ~ ${_endTime}`}
              />
            </Suspense>
          </Col>
        </Row>
      </>
    </GridContent>
  );
};

export default Monitor;
