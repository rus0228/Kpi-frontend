import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}

export async function getNumberOfNewClients(startTime, endTime, _startTime, _endTime, store){
  return request(`/api/getNumberOfNewClients?startTime=${startTime}&endTime=${endTime}&_startTime=${_startTime}&_endTime=${_endTime}&store=${store}`)
}

export async function getMostSpentClientsData(startTime, endTime, _startTime, _endTime, store){
  return request(`/api/getMostSpentClientsData?startTime=${startTime}&endTime=${endTime}&_startTime=${_startTime}&_endTime=${_endTime}&store=${store}`)
}

export async function getRepeatedCustomerRate(startTime, endTime, _startTime, _endTime, store){
  return request(`/api/getRepeatedCustomerRate?startTime=${startTime}&endTime=${endTime}&_startTime=${_startTime}&_endTime=${_endTime}&store=${store}`)
}
