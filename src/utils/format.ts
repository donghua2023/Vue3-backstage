import * as dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

/**
 *
 * @param dateType // 2023-05-24T14:32:55+08:00
 * @param format // 不传默认'YYYY/MM/DD HH:mm:ss'格式
 * @returns // 函数返回格式好的值
 */
export function formatUTC(dateType?: string | number | Date, format: string = 'YYYY/MM/DD HH:mm:ss') {
  const resultDate = dayjs.utc(dateType).utcOffset(8).format(format)
  return resultDate
}
