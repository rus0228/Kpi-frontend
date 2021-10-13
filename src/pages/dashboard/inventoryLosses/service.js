import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}

export async function getInventoryLossesData(startTime, endTime, _startTime, _endTime, store, kind) {
  return request(`/api/getInventoryLossesData?startTime=${startTime}&endTime=${endTime}&_startTime=${_startTime}&_endTime=${_endTime}&store=${store}&kind=${kind}`);
}

