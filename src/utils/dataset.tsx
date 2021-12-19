import { ColumnsType, ColumnType } from "antd/lib/table";
import { Schema } from "_mock";
import * as _ from 'lodash';
import { Input, InputNumber, Modal, Select, DatePicker, Popconfirm, Button } from "antd";
import { SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import moment, { Moment } from "moment";
import { ChromePicker } from 'react-color';
import Item from "antd/lib/list/Item";
import { DeleteOutlined } from '@ant-design/icons';

interface DatasetSchema {
    __items:{
        __type:'object'
        __items:Schema[]
    }
}

enum FIELD_TYPE {
    ARRAY = 'array',
    COLOR = 'color',
    DATE = 'date',
    FILE = 'file',
    FILES = 'files',
    FOLDER = 'folder',
    FOREIGN = 'foreign',
    FOREIGNS = 'foreigns',
    IMAGE = 'image',
    NUMBER = 'number',
    OBJECT = 'object',
    STRING = 'string',
}

type RecordField<T> = {
    [key:string]:T
}


export default function generateColumns(schema:DatasetSchema, expand:(name:string, ids:number[], parentId:number, multiple:boolean) => void, isNested:boolean){
    const columns:ColumnsType<any> = schema.__items.__items
        .map((column) => {
            let result:ColumnType<any> = {
                title:_.startCase(column.__name),
                dataIndex:column.__name,
                key:column.__name, 
                width:(column.__name === 'id') ? 80 : 120,
                fixed:(column.__name === 'id') ? 'left' : undefined,
                render:(column.__name !== 'id') ? (value:string) => <Cell options={column.__options} type={column.__type as FIELD_TYPE} value={value}/> : undefined
            }

            switch (column.__type){
                case FIELD_TYPE.STRING:
                    result = {
                        ...result,
                        sorter: (a:RecordField<string>, b:RecordField<string>) => a[column.__name].localeCompare(b[column.__name]),
                        sortDirections: ['ascend', 'descend'],
                    };
                    break;
                case FIELD_TYPE.NUMBER:
                    result = {
                        ...result,
                        sorter: (a:RecordField<number>, b:RecordField<number>) => a[column.__name] > b[column.__name] ? 1 : -1,
                        sortDirections: ['ascend', 'descend'],
                    }
                    break;
                case FIELD_TYPE.DATE:
                    result = {
                        ...result,
                        width:140
                        //sorter: (a:RecordField<number>, b:RecordField<number>) => a[item.__name] > b[item.__name] ? 1 : -1,
                        //sortDirections: ['ascend', 'descend'],
                    }
                    break;
                case FIELD_TYPE.IMAGE:
                    result = {
                        ...result,
                    }
                    break;
                case FIELD_TYPE.FOREIGN: case FIELD_TYPE.FOREIGNS:
                    result = {
                        ...result,
                        width:80,
                        fixed:'right',
                        render:(values:number[]|undefined, record:any) => 
                            <div onClick={() => {console.log(record); expand(column.__source as string, values || [], record.id, column.__type === FIELD_TYPE.FOREIGNS)}}><a>Show</a></div>,
                    }
                    break;
               


            }
            
            return result
        })
        
    if(!isNested){
        columns.push({
            title: '',
            dataIndex: '',
            key: 'x',
            width:60,
            fixed:'right',
            render: (_, record:any) => <Popconfirm title="Sure to delete?" onConfirm={() => console.log('remove', record)}>
                <Button danger type='link'><DeleteOutlined /></Button>
            </Popconfirm>,
        })
    }

    return columns
}


const Cell = ({type, options, value:defaultValue}:{type:FIELD_TYPE, options?:(string | number)[], value:any}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(defaultValue)
    const inputRef = useRef<any>(null);
    const hitarea = useMemo(() => <div style={{position:'absolute', inset:0}} onClick={() => setIsEditing(true)}/>, [])
    
    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

    const onPressEnter = (e:SyntheticEvent) => {
        setValue((e.target as unknown as {value:any}).value)
        setIsEditing(false)
    }

    const onChange = (newValue:any) => {
        setValue(newValue)
        setIsEditing(false)
    }

    const onChangeDate = (newValue:Moment | null) => {
        setValue(newValue !== null ? newValue.format('L') : undefined)
        setIsEditing(false)
    }

    
    if(type === FIELD_TYPE.IMAGE){
        return (
            <>
                <img src={value}/>
                {isEditing 
                    && <Modal title='Choose image' visible={true} onCancel={() => setIsEditing(false)}>Gallery</Modal>}
                {!isEditing && hitarea}
            </>
        )
    }

    else if(type === FIELD_TYPE.FILE){
        return (
            <>
                {value}
                {isEditing 
                    && <Modal title='Choose file' visible={true} onCancel={() => setIsEditing(false)}>File browser</Modal>}
                {!isEditing && hitarea}
            </>
        )
    }

    else if(type === FIELD_TYPE.COLOR){
        return (
            <>
                <div style={{display:'flex', alignItems:'center', gap:'4px'}}>
                    {value !== undefined && <div style={{width:'12px', height:'12px', backgroundColor:value}}/>}
                    {value}  
                </div>
                
                {isEditing 
                    && <Modal 
                        title='Choose color'
                        visible={true} 
                        width={270} 
                        onCancel={() => {setValue(defaultValue); setIsEditing(false)}} 
                        onOk={() => setIsEditing(false)}
                    >
                        <ChromePicker color={value} onChange={val => setValue(val.hex)} onChangeComplete={(val) => setValue(val.hex)}/>
                    </Modal>}
                {!isEditing && hitarea}
            </>
        )
    }

    
    

    

    return isEditing 
        ? <>
            {options === undefined 
                ? <>
                    {type === FIELD_TYPE.STRING 
                        && <Input defaultValue={value} ref={inputRef} onBlur={() => setIsEditing(false)} onPressEnter={onPressEnter}/>}
                    {type === FIELD_TYPE.NUMBER 
                        && <InputNumber defaultValue={value} ref={inputRef} onBlur={() => setIsEditing(false)} onPressEnter={onPressEnter}/>}
                    {type === FIELD_TYPE.DATE
                        && <DatePicker defaultOpen={true} defaultValue={value !== '' ? moment(value) : undefined} onBlur={() => setIsEditing(false)} onChange={onChangeDate}/>}
                </>
                :<Select defaultValue={value} style={{width:'100%'}} onBlur={() => setIsEditing(false)} onChange={onChange}>
                    {options.map(option => <Select.Option key={option} value={option}>{option}</Select.Option>)}
                </Select>}
            
        </>
        : <>
            {value}
            {hitarea}
        </>
        
    
}


