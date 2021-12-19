import styled from '@emotion/styled'
import {css} from '@styled-system/css'
import withPathReader from 'hoc/withPathReader';
import { useParams } from 'react-router';
import { Anchor, Divider } from 'antd';
//import DatasetExpandable from 'components/fields/__trash/DatasetExpandable';
import { players_schema, title_field, CTA_field, games_schema, teams_schema } from '_mock';
import FieldWrapper from 'components/fields/FieldWrapper';
import players from 'services/api/mock/players.json'
import games from 'services/api/mock/games.json'
import teams from 'services/api/mock/teams.json'

const { Link } = Anchor;



interface ScreenProps {
    prop?:string
}


function Edit({prop}:ScreenProps){
    const {sectionId, screenId} = useParams() 
    const global = (sectionId === undefined)

    const fieldsGlobal = [
        {schema:players_schema, data:players},
        {schema:games_schema, data:games},
        {schema:teams_schema, data:teams}
    ]
    const fieldsLocal = [
        title_field,
        CTA_field
    ]

    return(
        <Styled.Container key={screenId}>
            
            <div id='content'>
                {!global && 
                <>
                    {fieldsLocal.map(field => <FieldWrapper attachable={false} data={field.data} key={field.schema.__name} schema={field.schema}/>)}
                    {fieldsGlobal.length > 0 &&
                        <Divider>Global fields</Divider>}
                </>}
                
                {fieldsGlobal.map(field => <FieldWrapper attachable={!global} data={field.data} key={field.schema.__name} schema={field.schema}/>)}
                
            </div>
            {/*}
            <Anchor style={{width:'170px', paddingLeft:'32px'}}>
                {!global && <>
                    {fieldsLocal.map(field => <Link key={field.schema.__name} href={`#local-${field.schema.__name}`} title={field.schema.__name} />)}
                    <Link href="#global" title="Global fields">
                        {fieldsGlobal.map(field => <Link key={field.schema.__name} href={`#global-${field.schema.__name}`} title={field.schema.__name} />)}
                    </Link>
                </>}
                {global && <>
                    {fieldsGlobal.map(field => <Link href={`#global-${field.schema.__name}`} title={field.schema.__name} />)}
                </>}  
            </Anchor>  
                */}
        </Styled.Container>
    )
}

const Styled = {
    Container: styled('div')(css({
        //display:'grid',
        gridTemplateColumns:'calc(100% - 170px) 170px',
        
        m:'1em',
        //gap:'1em',
        "#content":{
            display:'flex',
            flexDirection:'column',
            gap:'24px'
        }
    }))
}

export default withPathReader(Edit)