import styled from '@emotion/styled'
import useStore from '../../store/store'
import { getRandomText } from 'utils/helpers'
import { useCallback } from 'react'
import {css} from '@styled-system/css'


export default function Sampler(){
    const items = useStore(state => state.items)
    const add = useStore(state => state.add)

    const onAddButton = useCallback(() => {
        add(getRandomText())
    }, [])

    return(
        <>
            <button onClick={onAddButton}>add</button>
            <ul>
                {items.map((item, i) => 
                    <Styled.ListItem indent={Math.pow(2,i/3)} key={`${item}-${i}`}>
                        {item}
                    </Styled.ListItem>
                )}
            </ul>
        </>
    )
}

const Styled = {
    ListItem: styled('li')(({indent}:{indent:number}) => css({
        marginLeft: indent+'px'
    })),
}
