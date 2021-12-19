import fakeFetch from "./mock/fake-fetch";
import { Section } from "./types";
import useAuthStore from 'store/auth'

const API_URL = 'https://central.ucms.site/api'
const fetchFunc = process.env.NODE_ENV === 'development' 
    ? fakeFetch 
    : fetch


export async function fetchSections() {
    const response = await fetchFunc('api/sections')
    return await response.json() as Section[]
}

// tokens

export async function obtainToken(username:string, password:string) {
    //const response = await fetchFunc(`${API_URL}/jwt/obtain-token`)
    const response = await fetch(`${API_URL}/jwt/obtain-token`, getRequestOptions('POST', {username, password}))
    return await response.json()
}

export async function refreshToken(token:string) {
    //const response = await fetchFunc(`${API_URL}/jwt/obtain-token`)
    const response = await fetch(`${API_URL}/jwt/refresh-token`, getRequestOptions('POST', {token}))
    return await response.json()
}


// content

export async function contentModule(instance:number) {
    const response = await fetch(`${API_URL}/content/content-module/${instance}/7163/7165/`, getRequestOptions('GET', undefined, true))
    return await response.json()
}

export async function contentNode(instance:number) {
    const response = await fetch(`${API_URL}/content/content-node/${instance}/7163/7165/`, getRequestOptions('GET', undefined, true))
    return await response.json()
}

export async function getInstances() {
    const response = await fetch(`${API_URL}/content/instance`, getRequestOptions('GET', undefined, true))
    return await response.json()
}



/// utils

function getRequestOptions(method:'GET'|'POST'|'PATCH' = 'GET', payload?:{[key:string]:any}, auth = false){
    return {
        method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin', 
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        ...(payload && {body: JSON.stringify(payload) }),
        ...((auth || payload) && {
            headers:{
                ...(auth && {"Authorization": `JWT ${useAuthStore.getState().authToken}`}),
                ...(payload && {'Content-Type': 'application/json'})
            } 
        })
    } as RequestInit
}