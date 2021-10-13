import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}

export async function getMostFrequentSuppliers(startTime, endTime, _startTime, _endTime, store){
  return request(`/api/getMostFrequentSuppliers?startTime=${startTime}&endTime=${endTime}&_startTime=${_startTime}&_endTime=${_endTime}&store=${store}`)
}

export async function getMostPurchasedSuppliers(startTime, endTime, _startTime, _endTime, store){
  return request(`/api/getMostPurchasedSuppliers?startTime=${startTime}&endTime=${endTime}&_startTime=${_startTime}&_endTime=${_endTime}&store=${store}`)
}

export async function getPurchaseData(startTime, endTime, _startTime, _endTime, store){
  return request(`/api/getPurchaseData?startTime=${startTime}&endTime=${endTime}&_startTime=${_startTime}&_endTime=${_endTime}&store=${store}`)
}
