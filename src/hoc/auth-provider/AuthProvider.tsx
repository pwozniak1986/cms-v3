import LoginForm from 'components/login-form/LoginForm'
import { useEffect } from 'react'
import useAuthStore from 'store/auth'
import { iChildren } from 'types'


export default function AuthProvider({children}:iChildren){
    const isAuthenticated = true//useAuthStore(state => state.isAuthenticated())
    const isFetching = useAuthStore(state => state.isFetching)
    const retrieveToken = useAuthStore(state => state.retrieveToken)

    
    useEffect(() => {
        retrieveToken()
    }, [])
    
    return isAuthenticated
        ? children
        : isFetching 
            ? <>Retriving session...</>
            : <LoginForm/>
}
