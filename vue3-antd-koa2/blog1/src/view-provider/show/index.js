/**
 * 抽离view-header中setUP中return
 */
import {
    BookOutlined,
    ReadOutlined,
    ScheduleOutlined,
    SisternodeOutlined,
    MoneyCollectOutlined
} from '@ant-design/icons-vue'

import {
    useRouteNameToPage, useRoutePathToPage
} from '../../use/router'

export const showIndexViewConfig = {
    avatar: {
        src: require("../../assets/img/avatar.jpg"),
    },
    title: 'MarkThree',
    subTitle: "展示",
    unwantedBackWhiteList: ["ShowBlog"], //不需要渲染back的白名单
    homePath:'/show/blogs/1',
    buttonGroup: [{
            text: '日志',
            icon: < BookOutlined /> ,
            handle: useRoutePathToPage("/show/blogs/1")
        },
        {
            text: '读书',
            icon: < ReadOutlined /> ,
            handle: useRoutePathToPage("/show/books/1")
        },
        {
            text: '项目',
            icon: < ScheduleOutlined /> ,
            handle: useRouteNameToPage("ShowProject")
        },
        {
            text: '归档',
            icon: < SisternodeOutlined /> ,
            handle: useRouteNameToPage("ShowFile")
        },
        {
            text: '赞助列表',
            icon: < MoneyCollectOutlined /> ,
            handle: useRouteNameToPage("ShowList")
        }
    ]
}