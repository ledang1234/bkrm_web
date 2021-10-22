import axiosClient from "./axiosClient"
export const userAPi = {
    ownerRegister: (params) =>{
        const url= "/register"
        return axiosClient.post(url,JSON.stringify(...params))
    },
    signIn: (params) => {
        const url = '/ownerLogin'
        return axiosClient.post(url,JSON.stringify(...params))
    },
    logOut: () =>{
        const url = "/logout"
        return axiosClient.post(url)
    }
}