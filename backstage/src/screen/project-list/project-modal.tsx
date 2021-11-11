/**
 * 创建任务的页面
 * 
 */
import React from 'react'
import { Button, Drawer } from 'antd'
import { ButtonNoPadding } from '../../components/lib'
import { useProjectModal } from './util'

export const ProjectModal = () => {
    const {projectModalOpen,close,open} = useProjectModal()
    return (
        <Drawer onClose={close} visible={projectModalOpen} width={'100%'}>
            <h1>
                ProjectModal
            </h1>
            <ButtonNoPadding onClick={close}>关闭</ButtonNoPadding>
        </Drawer>
    )
}
