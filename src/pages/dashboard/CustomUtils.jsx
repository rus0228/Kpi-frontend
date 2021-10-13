import moment from "moment";
export const getChangedGlobalStates = (target) => {
  const store = target.store;
  const startTime = moment(target.range[0]).format('YYYY-MM-DD HH:mm:ss');
  const endTime = moment(target.range[1]).format('YYYY-MM-DD HH:mm:ss');
  if (target.compare === 'lastDuration'){
    const duration = moment(endTime).diff(startTime, 'days');
    const _startTime = moment(startTime, 'YYYY-MM-DD HH:mm:ss').subtract(duration + 1, 'days').format('YYYY-MM-DD HH:mm:ss');
    const _endTime = moment(_startTime, 'YYYY-MM-DD HH:mm:ss').add(duration, 'days').format('YYYY-MM-DD 23:59:59');
    return {
      store: store,
      startTime: startTime,
      endTime: endTime,
      _startTime: _startTime,
      _endTime: _endTime
    }
  }
  if (target.compare === 'lastYear'){
    const tempStartTime = moment(startTime, 'YYYY-MM-DD HH:mm:ss').subtract(1, 'year');
    const tempEndTime = moment(endTime, 'YYYY-MM-DD HH:mm:ss').subtract(1, 'year');
    const _startTime = tempStartTime.format('YYYY-MM-DD HH:mm:ss');
    const _endTime = tempEndTime.format('YYYY-MM-DD HH:mm:ss')
    return {
      store: store,
      startTime: startTime,
      endTime: endTime,
      _startTime: _startTime,
      _endTime: _endTime
    }
  }
}

export const getDiffAndPercentage = (cur, prev, symbol) => {
  const prefix = symbol === 0 ? '' : '€'
  if (prev > 0) {
    const diff = symbol === 0 ? cur - prev : (cur - prev).toFixed(2);
    const percentage = (diff / prev) * 100;
    return {
      diff: diff > 0 ? `+${diff}${prefix}` : `${diff}${prefix}`,
      percentage: percentage > 0 ? `+${percentage.toFixed(2)}` : percentage.toFixed(2)
    }
  }else {
    const diff = symbol === 0 ? cur : cur.toFixed(2);
    const percentage = '∞';
    return {
      diff: diff > 0 ? `+${diff}${prefix}` : `${diff}${prefix}`,
      percentage: percentage
    }
  }
}
