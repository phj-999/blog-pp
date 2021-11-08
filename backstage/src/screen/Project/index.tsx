import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { EpicScreen } from '../epic'
import { KanbanScreen } from '../kanban';

export const ProjectScreen = () => {
    return (
        <div>
            11111ProjectScreen
            <Link to='kanban'>看板 </Link>
            <Link to='epic'>任务组 </Link>
            <Routes>
                {/*projects/:projectId/kanban/epic*/}
                <Route path='/kanban' element={<KanbanScreen />} />
                {/*projects/:projectId/kanban/epic*/}
                <Route path='/epic' element={<EpicScreen />} />
                {/*上面两个匹配不到就跳转到navigate的路由*/}
                <Navigate to={window.location.pathname + '/kanban'} />
            </Routes>
        </div>
    )
}
