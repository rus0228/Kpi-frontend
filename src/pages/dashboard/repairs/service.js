import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}

export async function getRepairData(startTime, endTime, store) {
  return request(`/api/getRepairData?startTime=${startTime}&endTime=${endTime}&store=${store}`);
}

export async function getRepairType(startTime, endTime, store){
  return request(`/api/getRepairType?startTime=${startTime}&endTime=${endTime}&store=${store}`)
}

export async function getMostInteractionData(startTime, endTime, store){
  return request(`/api/getMostInteractionData?startTime=${startTime}&endTime=${endTime}&store=${store}`)
}
