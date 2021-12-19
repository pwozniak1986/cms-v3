import { Schema } from "_mock";
import { Checkbox } from 'antd';
import { useState } from "react";
import Dataset from "./Dataset";
import { Input } from 'antd';
import Datazet from "./Datazet";

interface FieldWrapperProps {
    attachable:boolean,
    schema:Schema,
    data:any
}

export default function FieldWrapper({attachable, schema, data}:FieldWrapperProps){

    const [isAttached, setIsAttached] = useState(!attachable)

    if(attachable){
        return (
            <div>
                <Checkbox onChange={() => setIsAttached(prev => !prev)}><h3>{schema.__name}</h3></Checkbox>
                {isAttached && getFieldByType(schema.__type, schema, data)}
            </div>
        )
    }

    return (
        <div>
            {attachable 
                ? <Checkbox onChange={() => setIsAttached(prev => !prev)}><h3>{schema.__name}</h3></Checkbox>
                :<h3>{schema.__name}</h3>}
            {isAttached && getFieldByType(schema.__type, schema, data)}
        </div>
    )
}

function getFieldByType(type: string, schema:Schema, data:any){
    if(type === 'array'){
        return <Dataset schema={schema} data={data}/>
        //return <Datazet/>
    }
    else if(type === 'string'){
        return <Input placeholder='Enter title here' value={data}/>
    }
    return null
}

