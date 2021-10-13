import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}

export async function getRepairData(startTime, endTime, _startTime, _endTime, store) {
  return request(`/api/getRepairData?startTime=${startTime}&endTime=${endTime}&_startTime=${_startTime}&_endTime=${_endTime}&store=${store}`);
}

export async function getRepairType(startTime, endTime, _startTime, _endTime, store){
  return request(`/api/getRepairType?startTime=${startTime}&endTime=${endTime}&_startTime=${_startTime}&_endTime=${_endTime}&store=${store}`)
}

export async function getMostInteractionData(startTime, endTime, _startTime, _endTime, store){
  return request(`/api/getMostInteractionData?startTime=${startTime}&endTime=${endTime}&_startTime=${_startTime}&_endTime=${_endTime}&store=${store}`)
}
