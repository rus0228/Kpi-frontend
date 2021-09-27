import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}

export async function getTotalAndLostRmaData(startTime, endTime, store){
  return request(`/api/getTotalAndLostRmaData?startTime=${startTime}&endTime=${endTime}&store=${store}`)
}

export async function getTotalLossesData(startTime, endTime, store){
  return request(`/api/getTotalLossesData?startTime=${startTime}&endTime=${endTime}&store=${store}`)
}
