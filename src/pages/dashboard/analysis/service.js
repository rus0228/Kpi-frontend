import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}
export async function getSalesRevenueProfitQty(startTime, endTime, store){
  return await request(`/api/getSalesRevenueProfitQty?startTime=${startTime}&endTime=${endTime}&store=${store}`);
}
export async function getRepairsRevenueProfitQty(startTime, endTime, store){
  return await request(`/api/getRepairsRevenueProfitQty?startTime=${startTime}&endTime=${endTime}&store=${store}`);
}
export async function getReturnsRevenueProfitQty(startTime, endTime, store){
  return await request(`/api/getReturnsRevenueProfitQty?startTime=${startTime}&endTime=${endTime}&store=${store}`);
}
export async function getPurchaseOrdersRevenueQty(startTime, endTime, store){
  return await request(`/api/getPurchaseOrdersRevenueQty?startTime=${startTime}&endTime=${endTime}&store=${store}`);
}
export async function getTotalData(startTime, endTime, store){
  return await request(`/api/getTotalData?startTime=${startTime}&endTime=${endTime}&store=${store}`);
}

export async function getInventoryLossesData(startTime, endTime, store, kind) {
  return request(`/api/getInventoryLossesData?startTime=${startTime}&endTime=${endTime}&store=${store}&kind=${kind}`);
}
