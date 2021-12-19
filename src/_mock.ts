import players from 'services/api/mock/players.json'
import games from 'services/api/mock/games.json'
import teams from 'services/api/mock/teams.json'

export function getDataset(name:string){
    switch(name){
        case 'players':
            return {schema:players_schema, data:players}
        case 'games':
            return {schema:games_schema, data:games}
        case 'teams':
            return {schema:teams_schema, data:teams}
    }
}


export const title_field = {
    schema:{
        __name:'Title',
        __type:'string'
    },
    data:'Sample-title'
}

export const CTA_field = {
    schema:{
        __name:'CTA',
        __type:'string'
    },
    data:'Touch to explore'
}
/*
// plain field
const plain_field_schema = {
    __name:'field-name',
    __type:'string'
}

// object field
const object_field_schema = {
    __name:'field-name',
    __type:'object',
    __items:[
        {
            __name:'object-property-name',
            __type:'string'
        }
    ]
}

// array of ..
const array_field_schema = {
    __name:'field-name',
    __type:'array',
    __items:{
        __type:'string'
    }
}
*/

export const players_schema:Schema = {
    __name:'Players',
    __type:'array',
    __items:{
        __type:'object',
        __name:'any',
        __items:[{
            __name:'id',
            __type:'number'
        },
        {
            __name:'firstName',
            __type:'string'
        },
        {
            __name:'lastName',
            __type:'string'
        },
        /*
        {
            __name:'media',
            __type:'file'
        },
        */
        {
            __name:'photo',
            __type:'image'
        },
        {
            __name:'position',
            __type:'string',
            __options:['LB', 'QB', 'G/T', 'DT', 'WR', 'DE', 'C/G', 'G', 'S', 'RB']
        },
        
        {
            __name:'number',
            __type:'number'
        },
        {
            __name:'height',
            __type:'string'
        },
        {
            __name:'weight',
            __type:'number'
        },
        {
            __name:'college',
            __type:'string'
        },/*
        {
            __name:'bornCity',
            __type:'string'
        },*/
        {
            __name:'bornDate',
            __type:'date'
        },
        {
            __name:'homeTown',
            __type:'string'
        },
        
        
        {
            __name:'draftTeam',
            __type:'string'
        },
        {
            __name:'draftYear',
            __type:'string'
        },
        
        {
            __name:'alsoPlayed',
            __type:'string'
        },
        {
            __name:'personType',
            __type:'string'
        },/*
        {
            __name:'careerStats',
            __type:'string'
        },*/
        {
            __name:'gamesPlayed',
            __type:'number'
        },
        {
            __name:'headerImage',
            __type:'image'
        },
        {
            __name:'howAcquired',
            __type:'string'
        },
        {
            __name:'yearsPlayed',
            __type:'string'
        },
        {
            __name:'draftedRound',
            __type:'number'
        },
        {
            __name:'gamesStarted',
            __type:'number'
        },
        {
            __name:'yearsStarted',
            __type:'string'
        },
        {
            __name:'draftedOverall',
            __type:'number'
        },
        {
            __name:'firstYearChiefs',
            __type:'number'
        },
        {
            __name:'careerHighlights',
            __type:'string'
        },
        {
            __name:'games',
            __type:'foreigns',
            __source:'games'
        },
        {
            __name:'team',
            __type:'foreign',
            __source:'teams'
        }]
    }
}

export const teams_schema:Schema = {
    __name:'Teams',
    __type:'array',
    __items:{
        __type:'object',
        __name:'any',
        __items:[{
            __name:'id',
            __type:'number'
        },
        {
            __name:'city',
            __type:'string'
        },
        {
            __name:'name',
            __type:'string'
        },
        {
            __name:'logo',
            __type:'image'
        },
        {
            __name:'abbreviation',
            __type:'string'
        },
        {
            __name:'primaryColour',
            __type:'color'
        },
        {
            __name:'secondaryColour',
            __type:'color'
        }]
    }
}

export const games_schema:Schema = {
    __name:'Games',
    __type:'array',
    __items:{
        __type:'object',
        __name:'any',
        __items:[{
            __name:'id',
            __type:'number'
        },
        {
            __name:'season',
            __type:'string'
        },
        {
            __name:'stadium',
            __type:'string'
        },
        {
            __name:'gameDate',
            __type:'date'
        },
        {
            __name:'homeTeam',
            __type:'string'
        },
        {
            __name:'attendance',
            __type:'number'
        },
        {
            __name:'gameNumber',
            __type:'number'
        },
        {
            __name:'stadiumImage',
            __type:'image'
        }]
    }
}







export type Schema = {
    __type:'string' | 'number' | 'array' | 'object' | 'foreign' | 'foreigns' | string,
    __name:string,
    __items?:Schema | Schema[],
    __source?:string
    __options?:any[]

};