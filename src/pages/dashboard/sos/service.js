import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}

export async function getSosData(startTime, endTime) {
  return request(`/api/getSosData?startTime=${startTime}&endTime=${endTime}`)
}

export async function getSosCustomData(){
  return request('/api/getSosCustomData');
}
