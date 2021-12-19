import styled from '@emotion/styled'
import {css} from '@styled-system/css'
import withPathReader from 'hoc/withPathReader'
import { useParams } from 'react-router-dom'

interface FilesProps {
    prop?:string
}

function Files({prop}:FilesProps){
    const {sectionId, screenId} = useParams() 
    const global = (sectionId === undefined)

    return(
        <Styled.Container param={'test'}>
            files
        </Styled.Container>
    )
}

const Styled = {
    Container: styled('div')(({param}:{param:string}) => css({

    })),
    PureContainer: styled('div')(css({

    }))
}

export default withPathReader(Files)