import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}

export async function getNumberOfNewProducts(startTime, endTime, store) {
  return request(`/api/getNumberOfNewProducts?startTime=${startTime}&endTime=${endTime}&store=${store}`);
}

export async function getBestSellingProductsData(startTime, endTime, store){
  return request(`/api/getBestSellingProductsData?startTime=${startTime}&endTime=${endTime}&store=${store}`);
}
