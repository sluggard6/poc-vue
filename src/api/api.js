import request from '@/axios'


// 查询数据录入列表
export const inputList = (params) => {
  return axios.post(INPUT_LIST, params)
};

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