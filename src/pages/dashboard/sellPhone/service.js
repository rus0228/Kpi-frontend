import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}

export async function getSellPhoneData(startTime, endTime) {
  return request(`/api/getSellPhoneData?startTime=${startTime}&endTime=${endTime}`)
}
