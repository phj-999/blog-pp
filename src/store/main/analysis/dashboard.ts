import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { IDashboardState } from './types'

const dashboardModule: Module<IDashboardState, IRootState> = {}

export default dashboardModule
