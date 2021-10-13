import React from 'react';
import {Col, Row, Tooltip} from 'antd';
import {useModel, useRequest} from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import {Suspense, useState} from "react";
import {fakeChartData, getNumberOfNewProducts, getBestSellingProductsData} from "./service";
import BestSelling from './components/BestSelling';
import {CardFooter, Comparison, ComparisonInt} from "@/pages/dashboard/CustomComponent";
import {InfoCircleOutlined} from "@ant-design/icons";
import {ChartCard} from "@/pages/dashboard/analysis/components/Charts";
import {getChangedGlobalStates} from "@/pages/dashboard/CustomUtils";

const Monitor = () => {
  const {initialState} = useModel('@@initialState');
  const { loading, data } = useRequest(fakeChartData);
  const [newProducts, setNewProducts] = useState([]);
  const [bestSellingData, setBestSellingData] = useState([]);

  const changedStates = getChangedGlobalStates(initialState);
  const {startTime, endTime, _startTime, _endTime, store} = changedStates;

  React.useEffect(() => {
    getBestSellingProductsData(startTime, endTime, _startTime, _endTime, store).then((res) => {
      setBestSellingData(res);
    })
    getNumberOfNewProducts(startTime, endTime, _startTime, _endTime, store).then((res) => {
      console.log(res);
      setNewProducts(res);
    })
  }, [initialState]);

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
