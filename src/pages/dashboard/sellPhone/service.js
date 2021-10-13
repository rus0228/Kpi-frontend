import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}

export async function getSellPhoneData(startTime, endTime, _startTime, _endTime, store) {
  return request(`/api/getSellPhoneData?startTime=${startTime}&endTime=${endTime}&_startTime=${_startTime}&_endTime=${_endTime}&store=${store}`)
}
