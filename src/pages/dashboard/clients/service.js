import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}

export async function getNumberOfNewClients(startTime, endTime, store){
  return request(`/api/getNumberOfNewClients?startTime=${startTime}&endTime=${endTime}&store=${store}`)
}

export async function getMostSpentClientsData(startTime, endTime, store){
  return request(`/api/getMostSpentClientsData?startTime=${startTime}&endTime=${endTime}&store=${store}`)
}
