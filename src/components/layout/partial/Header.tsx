import styled from '@emotion/styled'
import {css} from '@styled-system/css'

interface HeaderProps {
    prop?:string
}

export default function Header({prop}:HeaderProps){
    return(
        <Styled.Container param={'test'}>
            header
        </Styled.Container>
    )
}

const Styled = {
    Container: styled('div')(({param}:{param:string}) => css({

    })),
    PureContainer: styled('div')(css({

    }))
}