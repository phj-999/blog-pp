/**
 * 创建任务的页面
 * 
 */
import React from 'react'
import { Button, Drawer } from 'antd'
import { ButtonNoPadding } from '../../components/lib'
import { useDispatch, useSelector } from 'react-redux'
import { projectListActions, selectProjectModalOpen } from './project-list.slice'

export const ProjectModal = () => {
    const dispatch = useDispatch()
    const projectModalOpen = useSelector(selectProjectModalOpen)
 
    return (
        <Drawer onClose={()=>dispatch(projectListActions.closeProjectModal())} visible={projectModalOpen} width={'100%'}>
            <h1>
                ProjectModal
            </h1>
            <ButtonNoPadding onClick={()=>dispatch(projectListActions.closeProjectModal())}>关闭</ButtonNoPadding>
        </Drawer>
    )
}
