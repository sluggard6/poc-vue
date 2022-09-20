import request from "@/axios";

import {
    SCAN,
    HOSTS,
    FILE,
    ALLFILE
} from '@/api/url'
// import { ALL } from 'dns';

const axios = request("http://localhost:5678")


// 查询host接口
export const scan = () => {
    return axios.get(SCAN)
};
// 查询缓存的host
export const host = () => {
    return axios.get(HOSTS)
};
// 获取文件
export const getHostFile = (parmas:any) => {
    return axios.get(HOSTS, {parmas:parmas})
};
// 保存文件
export const file = (parmas: any) => {
    return axios.put(FILE, parmas)
};
// 发送文件
export const hostFile = (parmas: any) => {
    return axios.post(FILE, {parmas: parmas});
};
// 发送全部
export const allFile = (params: any) => {
    return axios.post(ALLFILE, params);
};

export const importEquMonitorPoint = (file: any) => {
    return axios.put(file, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

export const search = (fileName: string, prop: string, propVaule: string) => {
    return axios.post('search', {
        'fileNme' : fileName,
        'prop' : prop,
        'propValue' : propVaule
    })
}