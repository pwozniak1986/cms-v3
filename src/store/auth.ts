import { obtainToken, refreshToken } from 'services/api/calls';
import create from 'zustand'

type TAuthStore = {
    username?:string
    authToken?:string
    isFetching:boolean
    // computed
    isAuthenticated:() => boolean
    // methods
    obtainToken:(username:string, password:string, remember:boolean, onError:(error:any) => void) => void
    retrieveToken:() => void
    signOut:() => void
};

export default create<TAuthStore>((set, get) => ({
    isFetching:false,
    // comupted
    isAuthenticated: () => {
        const state = get()
        return state.authToken !== undefined
    },
    // methods
    obtainToken: async (username, password, remember, onError) => {
        set({isFetching:true})
        try{
            const result = await obtainToken(username, password)
            if(result.token){
                set(({authToken:result.token, username, isFetching:false}))
                if(remember){
                    window?.localStorage.setItem('authToken', result.token)
                    window?.localStorage.setItem('username', username)
                }
            }
            else{
                set({isFetching:false})
                onError(result)
            } 
        }
        catch(e){
            set({isFetching:false})
            onError(e)
        }
    },
    retrieveToken: async () => {
        const authToken = window?.localStorage.getItem('authToken')
        const username = window?.localStorage.getItem('username')
        if(authToken && username){
            set({isFetching:true})
            const result = await refreshToken(authToken)
            if(result.token){
                set(state => ({...state, authToken:result.token, username, isFetching:false}))
            }else{
                set({username:undefined, authToken:undefined, isFetching:false})
                window?.localStorage.removeItem('authToken')
                window?.localStorage.removeItem('username')
            }
        }
    }, 
    signOut:() => {
        set({username:undefined, authToken:undefined})
        window?.localStorage.removeItem('authToken')
        window?.localStorage.removeItem('username')
    }
    
}))