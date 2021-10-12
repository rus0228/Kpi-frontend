import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}

export async function getInventoryLossesData(startTime, endTime, store, kind) {
  return request(`/api/getInventoryLossesData?startTime=${startTime}&endTime=${endTime}&store=${store}&kind=${kind}`);
}

