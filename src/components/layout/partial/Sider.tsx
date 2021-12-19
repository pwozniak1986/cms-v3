import styled from '@emotion/styled'
import {css} from '@styled-system/css'

interface SiderProps {
    prop?:string
}

export default function Sider({prop}:SiderProps){
    return(
        <Styled.Container param={'test'}>
            sider
        </Styled.Container>
    )
}

const Styled = {
    Container: styled('div')(({param}:{param:string}) => css({

    })),
    PureContainer: styled('div')(css({

    }))
}