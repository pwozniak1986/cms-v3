import * as Ant from 'antd';
import styled from '@emotion/styled'
import { iChildren } from 'types'
import { css } from '@styled-system/css'
import { RightSquareOutlined, FolderOutlined, CalendarOutlined, EditOutlined, ExportOutlined, ProjectOutlined } from '@ant-design/icons';
import useSectionsStore from 'store/sections'
import { useCallback, useEffect, useState } from 'react';
import { contentModule, contentNode, getInstances } from 'services/api/calls';
import { Link, useParams, matchPath } from "react-router-dom";
import useNavigationStore from 'store/navigation'




export default function Layout({ children }: iChildren) {
    const {sectionId, screenId, page}  = useNavigationStore()


    const sections = useSectionsStore(state => state.getSections())
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [sample, setSample] = useState()

    useEffect(() => {
        console.log(sectionId, screenId, page)
        if(sectionId !== undefined){
            if(page !== undefined){
                if(screenId !== undefined){
                    setSelectedKeys([`${sectionId}-${page}-${screenId}`])  
                }
                else{
                    setSelectedKeys([`${sectionId}-${page}`])  
                }
                
                setOpenKeys([sectionId, `${sectionId}-${page}`])  
                
                
            }
            else{
                setOpenKeys([sectionId]) 
            }
        }
        else {
            if(page !== undefined){
                setOpenKeys([])
                setSelectedKeys([`global-${page}`])
            }
        }

    }, [sectionId, screenId, page])


    const onOpenChange = useCallback((keys:string[]) => {
        const rootKeys = sections?.map(section => String(section.id))
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        
        if (latestOpenKey && rootKeys?.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }

    },[openKeys, sections])

    async function test() {
        //const result = await getInstances()
        const result = await contentNode(92)
        setSample(result)
        console.log(result)
    }

    return (
        <Styled.Container param={'test'}>
            
            <Ant.Layout.Header>
                <span style={{color:'white', fontSize:'18px', fontWeight:'bold'}}>
                   Kansas City Chiefs 
                </span>
                
            </Ant.Layout.Header>

            <Ant.Layout>
                <Ant.Layout.Sider collapsible={true} collapsedWidth={60} width={300}>
                    <Ant.Menu
                        mode="inline"
                        openKeys={openKeys}
                        selectedKeys={selectedKeys}
                        style={{ height: '100%', borderRight: 0 }}
                        title='sections'
                        onOpenChange={onOpenChange}
                    >
                        <Ant.Menu.ItemGroup title='Sections'>
                            {sections?.map(section =>
                                <Ant.Menu.SubMenu icon={<RightSquareOutlined />} key={section.id} title={section.name}>
                                    <Ant.Menu.SubMenu icon={<EditOutlined />} key={`${section.id}-edit`} title='Edit'>
                                        {section.screens.map(screen =>
                                            <Ant.Menu.Item icon={<ProjectOutlined />} key={`${section.id}-edit-${screen.id}`}>
                                                <Link to={`${section.id}/edit/${screen.id}`}>{screen.name}</Link>
                                            </Ant.Menu.Item>
                                        )}
                                    </Ant.Menu.SubMenu>
                                    <Ant.Menu.Item icon={<ExportOutlined />} key={`${section.id}-publish`}>
                                        <Link to={`${section.id}/publish`}>Publish</Link>
                                    </Ant.Menu.Item>
                                    <Ant.Menu.Item icon={<CalendarOutlined />} key={`${section.id}-schedule`}>
                                        <Link to={`${section.id}/schedule`}>Schedule</Link>
                                    </Ant.Menu.Item>
                                    <Ant.Menu.Item icon={<FolderOutlined />} key={`${section.id}-files`}>
                                        <Link to={`${section.id}/files`}>Files</Link>
                                    </Ant.Menu.Item>
                                </Ant.Menu.SubMenu>
                            )}
                        </Ant.Menu.ItemGroup>
                        <Ant.Menu.Divider />
                        <Ant.Menu.ItemGroup title='Global'>
                            <Ant.Menu.Item icon={<FolderOutlined />} key="global-files">
                                <Link to={`files`}>Files</Link>
                            </Ant.Menu.Item>
                            <Ant.Menu.Item icon={<EditOutlined />} key="global-data" title='Edit'>
                                <Link to={`data`}>Data</Link>
                            </Ant.Menu.Item>
                        </Ant.Menu.ItemGroup>
                    </Ant.Menu>
                </Ant.Layout.Sider>
                <Ant.Layout>
                    <Styled.Content>
                        {children}
                        {/*
                        <button onClick={test}>test</button>
                        <pre>
                            {JSON.stringify(sample,null, 2)}
                        </pre>
                        */}
                        
                    </Styled.Content>
                </Ant.Layout>
            </Ant.Layout>


        </Styled.Container>
    )
}

const Styled = {
    Container: styled('div')(({ param }: { param: string }) => css({
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        maxWidth:'100vw',
        overflow:'scroll',
    })),
    PureContainer: styled('div')(css({

    })),
    Content: styled('div')(css({
        position:'relative',
        inset:0
    }))
}
