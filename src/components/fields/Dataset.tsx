import styled from '@emotion/styled'
import {css} from '@styled-system/css'
import { Table } from 'antd';
import { getDataset, players_schema, Schema } from '_mock';
import { Button } from 'antd';
import { useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import * as _ from 'lodash';
import generateColumns from 'utils/dataset';

//temp
import players from 'services/api/mock/players.json'
import ExportOutlined from '@ant-design/icons/lib/icons/ExportOutlined';
import ImportOutlined from '@ant-design/icons/lib/icons/ImportOutlined';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import MinusSquareOutlined from '@ant-design/icons/lib/icons/MinusSquareOutlined';
import SaveOutlined from '@ant-design/icons/lib/icons/SaveOutlined';

interface DatasetProps {
    schema:Schema
    data:any,
    related?:any,
    isNested?:boolean,
    selectedIds?:number[],
    multiple?:boolean
}

interface DatasetSchema {
    __items:{
        __type:'object'
        __items:Schema[]
    }
}


export default function Dataset({schema, data, isNested, selectedIds, multiple}:DatasetProps){
    const [subtable, setSubtable] = useState<{name:string, ids:number[], parentId:number, multiple:boolean}>()
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[] | undefined>(selectedIds)

    const expand = (name:string, ids:number[], parentId:number, multiple:boolean) => {
        setSubtable({name, ids, parentId, multiple})
    }

    const dataSource = data.filter((row:any, i:number) => i< 20 ).map((row:any) => ({...row, key:row.id}))
    const columns:ColumnsType<any> = generateColumns(schema as DatasetSchema, expand, !!isNested)
    
    return (
        
            
        <Styled.Container>
            {!isNested 
                && <div id='controls'>
                    <Button disabled={true} icon={<SaveOutlined />}>Save</Button>
                    <Button icon={<PlusOutlined />}>Add row</Button>
                    <Button icon={<ImportOutlined />}>Import</Button>
                    <Button icon={<ExportOutlined />}>Export</Button>
                </div>
            }
            <Styled.Table>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                    rowSelection={isNested 
                        ? {
                            type: multiple ? 'checkbox' : 'radio',
                            selectedRowKeys:selectedRowKeys?.map((key:number) => String(key)),
                            onChange: (selectedRowKeys: React.Key[]) => {
                                setSelectedRowKeys(selectedRowKeys as number[])
                            }} 
                        : undefined}
                    scroll={{scrollToFirstRowOnChange:true, y:'360px'}}
                    size='small'
                
                />

                {subtable !== undefined 
                && <div style={{padding:'12px'}}>
                    <div style={{display:'flex', justifyContent:"space-between", gap:'20px', marginTop:'20px'}}>
                        <h4><i>{`#${subtable.parentId} / ${subtable.name}`}</i></h4>
                        <div style={{display:'flex', gap:'6px'}}>
                            <Button disabled={true} icon={<SaveOutlined />}>Save</Button>
                            <Button icon={<MinusSquareOutlined />} onClick={() => {setSubtable(undefined)}}>collapse</Button>
                        </div>
                    </div>
                    <Dataset 
                        data={getDataset(subtable.name)?.data}
                        isNested={true} 
                        key={subtable.parentId}
                        multiple={subtable.multiple} 
                        schema={getDataset(subtable.name)?.schema as Schema}
                        selectedIds={subtable.ids}
                    />
                </div>}
            </Styled.Table>
        </Styled.Container>
    );
    
}



const Styled = {
    Container: styled('div')(css({
        "#controls":{
            display:'flex',
            justifyContent:'flex-end',
            gap:'4px',
            marginBottom:'6px'
        }
    })),
    Table: styled('div')(css({
        border:'1px solid #d9d9d9', 
        borderRadius: '2px',
    })),
}