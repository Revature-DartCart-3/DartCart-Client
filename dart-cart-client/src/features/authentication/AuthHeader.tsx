import { AxiosRequestHeaders } from "axios";

export default function authHeader(): AxiosRequestHeaders {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        return {
            Authorization: "Bearer " + accessToken
        };
    } else {
        return {};
    }
}
