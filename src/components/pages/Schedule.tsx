import styled from '@emotion/styled'
import {css} from '@styled-system/css'
import withPathReader from 'hoc/withPathReader'

interface ScheduleProps {
    prop?:string
}

function Schedule({prop}:ScheduleProps){
    return(
        <Styled.Container param={'test'}>
            schedule
        </Styled.Container>
    )
}

const Styled = {
    Container: styled('div')(({param}:{param:string}) => css({

    })),
    PureContainer: styled('div')(css({

    }))
}


export default withPathReader(Schedule)