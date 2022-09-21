import axios, {
    // AxiosRequestConfig,
    AxiosRequestHeaders,
    // AxiosResponse,
} from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import router from "@/router";
// let AxiosRequestHeaders = {}
class HttpService {
    static getAxiosInstance(
        url: string,
        timeout = parseInt(import.meta.env.VITE_TIMEOUT as string),
        headers: AxiosRequestHeaders = {
            "Content-Type": "application/json;charset=utf8",
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Credentials": true,
            // "Access-Control-Allow-Headers": "Content-Type",
        }
    ) {
        // axios.defaults.withCredentials = true;
        const instance = axios.create({
            baseURL: url,
            timeout,
            headers,
        });
        // instance.interceptors.request.use(this.onRequest, this.onError);
        // instance.interceptors.response.use(this.onResponse, this.onError);
        return instance;
    }

    static getAxios() {
        // axios.defaults.withCredentials = true;
        const instance = axios.create({
            baseURL: import.meta.env.VITE_BASE_URL as string,
            timeout: parseInt(import.meta.env.VITE_TIMEOUT as string),
            headers: {
                "Content-Type": "application/json;charset=utf8",
                // "Access-Control-Allow-Origin": "*",
                // "Access-Control-Allow-Credentials": true,
                // "Access-Control-Allow-Headers": "Content-Type",
            },
        });
        // instance.interceptors.request.use(this.onRequest, this.onError);
        // instance.interceptors.response.use(this.onResponse, this.onError);
        return instance;
    }

    private static onError(error: any) {
        ElMessage.closeAll();
        ElMessage.error(error.message || "服务器异常，请稍后再试");
        return Promise.reject(error.response);
    }
}

const request = (url?: string, headers?: AxiosRequestHeaders) => {
    if (url) {
        return HttpService.getAxiosInstance(url, undefined, headers);
    } else {
        return HttpService.getAxios();
    }
};

export default request;