import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}

export async function getCustomerEvaluation(startTime, endTime, store){
  return request(`/api/getCustomerEvaluation?startTime=${startTime}&endTime=${endTime}&store=${store}`)
}
