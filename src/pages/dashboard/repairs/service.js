import { request } from 'umi';
export async function fakeChartData() {
  return request('/api/fake_analysis_chart_data');
}

export async function getNumberOfRepairs(startTime, endTime) {
  return request(`/api/getNumberOfRepairs?startTime=${startTime}&endTime=${endTime}`);
}

export async function getRepairType(){
  return request('/api/getRepairType')
}
