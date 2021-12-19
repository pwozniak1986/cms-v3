import styled from '@emotion/styled'
import {css} from '@styled-system/css'
import withPathReader from 'hoc/withPathReader'

interface PublishProps {
    prop?:string
}


function Publish({prop}:PublishProps){
    return(
        <Styled.Container param={'test'}>
            publish
        </Styled.Container>
    )
}

const Styled = {
    Container: styled('div')(({param}:{param:string}) => css({

    })),
    PureContainer: styled('div')(css({

    }))
}

export default withPathReader(Publish)