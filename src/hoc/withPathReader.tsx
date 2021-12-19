import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom"
import useNavigationStore from 'store/navigation'

const withPathReader = (WrappedComponent:(props:any)=>JSX.Element) => (props:any) => {
    const {sectionId, screenId} = useParams()
    const page = (sectionId !== undefined && screenId !== undefined)
        ? useLocation().pathname.split('/')[2]
        : useLocation().pathname.split('/')[1]
    const update = useNavigationStore(store => store.update)

    useEffect(() => {
        update(sectionId, screenId, page)
    }, [sectionId, screenId, page])

    return <WrappedComponent/>
    
};

export default withPathReader

 

