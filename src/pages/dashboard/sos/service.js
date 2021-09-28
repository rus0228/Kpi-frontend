import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}

export async function getSosData(startTime, endTime, store) {
  return request(`/api/getSosData?startTime=${startTime}&endTime=${endTime}&store=${store}`)
}

export async function getSosCustomData(startTime, endTime){
  return request(`/api/getSosCustomData?startTime=${startTime}&endTime=${endTime}`);
}
