import React from 'react'
import { Button, Popover, Typography } from 'antd'
import { useProjects } from '../utils/project'
import { List } from 'antd'
import styled from '@emotion/styled'
import { Divider } from 'rc-menu'
import { ButtonNoPadding } from './lib'
import { useProjectModal } from '../screen/project-list/util'

export const ProjectOpover = () => {

    const { data: projects, isLoading } = useProjects()
    const pinnedProjects = projects?.filter(project => project.pin)
    const {projectModalOpen,open} = useProjectModal()

    const content = <ContentContainer>
        <Typography.Text type='secondary'>
            收藏项目
        </Typography.Text>
        <List>
            {
                pinnedProjects?.map(
                    project =>
                        <List.Item>
                            <List.Item.Meta title={project.name} />
                        </List.Item>
                )
            }
        </List>
        <Divider/>
        <ButtonNoPadding 
        type={"link"}
        onClick={open}
        >创建项目</ButtonNoPadding>
    </ContentContainer>

    return (
        <Popover placement={'bottom'} content={content}>
            <span>项目</span>
        </Popover>
    )
}

const ContentContainer = styled.div `
     min-width:30rem;
`