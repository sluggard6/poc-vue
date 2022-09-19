import request from '@/utils/request'

export function scan(data) {
  return request({
    url: '/scan',
    method: 'get',
    data
  })
}

export function getFile(host) {
  return request({
    url: '/getRemoteFile',
    method: 'get',
    params: { host }
  })
}

export function sendFile(value, host) {
  return request({
    url: '/sendFile',
    method: 'post',
    params: {
        "key": value,
        "host": host
    }
  })
}