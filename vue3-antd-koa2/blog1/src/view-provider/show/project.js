/**
 * project内容区域模拟数据
 */
import {
    useRouteNameToPage
} from '../../use/router'

export const projectViewConfig = {
    cardRecords: [{
            id: 0,

            content: "项目1",
            handle: useRouteNameToPage('ShowAbout')
        },
        {
            id: 1,

            content: "项目2"
        },
    ]
}