import { iChildren } from "types";
import styled from '@emotion/styled'
import {css} from '@styled-system/css'
import PulseLoader from "react-spinners/PulseLoader";

interface LoaderProps {
    isLoading:boolean
}

export default function Loader({isLoading, children}:LoaderProps & iChildren){
    return isLoading 
        ? <Styled.Container>
            {children}
            <div id='overlay'>
                <div id='info'>
                    <PulseLoader color='#1890ff' size={10}/>
                </div> 
            </div>
        </Styled.Container>
        : <>{children}</>
}


const Styled = {
    Container: styled('div')(css({
        position:'relative',
        "#overlay":{
            backgroundColor:'#ffffffdd',
            position:'absolute',
            inset:0,
            width:'100%',
            height:'100%',
            zIndex:99,
            "#info":{
                position:'absolute',
                top:"50%",
                left:'50%',
                translate: "transformX(-50%)",
            }
        }
    }))
}