import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"
/**
 * 模态框打开与关闭
 */
interface State {
    projectModalOpen:boolean
}

const initialState: State = {
    projectModalOpen:false
}

export const projectListSlice = createSlice({
    name:'projectListSlice',
    initialState,
    reducers:{
        openProjectModal(state){
            state.projectModalOpen=true
        },
        closeProjectModal(state){
            state.projectModalOpen=false
        }
    },
})

export const projectListActions = projectListSlice.actions

export const selectProjectModalOpen = (state:RootState)=>state.projectList.projectModalOpen