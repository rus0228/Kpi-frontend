import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}
export async function getRevenueProfitQty(startTime, endTime, store, productTypes){
  return await request(`/api/getRevenueProfitQty?startTime=${startTime}&endTime=${endTime}&productTypes=${productTypes}&store=${store}`);
}
export async function getTotalCostIva(startTime, endTime, store){
  return await request(`/api/getTotalCostIva?startTime=${startTime}&endTime=${endTime}&store=${store}`);
}
export async function getTotalValue(startTime, endTime, store){
  return request(`/api/getTotalValue?startTime=${startTime}&endTime=${endTime}&store=${store}`);
}

export async function getPurchasedOrdersData(startTime, endTime, store){
  return await request(`/api/getPurchasedOrdersData?startTime=${startTime}&endTime=${endTime}&store=${store}`)
}
