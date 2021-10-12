import numeral from "numeral";
import Trend from "@/pages/dashboard/analysis/components/Trend";
import React from "react";

export const CardFooter = ({current, prev}) => {
  const flag = current > prev ? 'up' : 'down'
  const percentage = current > prev
    ? `+${numeral((current - prev) / prev *100).format('0,0.00')}%`
    : `${numeral((current - prev) / prev *100).format('0,0.00')}%`;
  return (
    <Trend
      flag={flag}
      style={{
        marginRight: 16,
      }}
    >
      <span>
        {
          percentage
        }
      </span>
    </Trend>
  )
}
export const Comparison = ({current, prev, _startTime, _endTime}) => {
  const diff = current > prev
    ? `+${numeral(current - prev).format('0,0.00')}€`
    : `${numeral(current - prev).format('0,0.00')}€`

  const percentage = current > prev
    ? `+${numeral((current - prev) / prev *100).format('0,0.00')}%`
    : `${numeral((current - prev) / prev *100).format('0,0.00')}%`

  return (
    <div>
      <div>
        {
          percentage
        }
      </div>
      <div>
        {
          diff
        }
      </div>
      <div>
        {
          `${_startTime} - ${_endTime}`
        }
      </div>
    </div>
  )
}

export const ComparisonInt = ({current, prev, _startTime, _endTime}) => {
  const diff = current > prev
    ? `+${numeral(current - prev).format('0,0')}`
    : `${numeral(current - prev).format('0,0')}`

  const percentage = current > prev
    ? `+${numeral((current - prev) / prev *100).format('0,0.00')}%`
    : `${numeral((current - prev) / prev *100).format('0,0.00')}%`

  return (
    <div>
      <div>
        {
          percentage
        }
      </div>
      <div>
        {
          diff
        }
      </div>
      <div>
        {
          `${_startTime} - ${_endTime}`
        }
      </div>
    </div>
  )
}

export const Time = ({seconds}) => {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600*24));
  const h = Math.floor(seconds % (3600*24) / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = Math.floor(seconds % 60);

  const dDisplay = d > 0 ? d + "d" : "";
  const hDisplay = h > 0 ? h + "h" : "";
  const mDisplay = m > 0 ? m + "m" : "";
  const sDisplay = s > 0 ? s + "s" : "";
  return `${dDisplay} ${hDisplay} ${mDisplay} ${sDisplay}`
}

export const ComparisonTime = ({current, prev, _startTime, _endTime}) => {
  const diff = current > prev ? current - prev : prev - current
  return (
    <div>
      <div>
        {
          <Time seconds={diff}/>
        }
      </div>
      <div>
        {
          `${_startTime} - ${_endTime}`
        }
      </div>
    </div>
  )
}

export const CardFooterTime = ({current, prev}) => {
  const flag = current > prev ? 'up' : 'down'
  const diff = current > prev ? current - prev : prev - current
  return (
    <Trend
      flag={flag}
      style={{
        marginRight: 16,
      }}
    >
      <span>
        <Time seconds={diff}/>
      </span>
    </Trend>
  )
}

