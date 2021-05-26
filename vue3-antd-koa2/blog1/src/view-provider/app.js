import { useRouteNameToPage, useRoutePathToPage } from "../use/router";

export const appViewConfig = {
    avatar :{
        src:  require("../assets/img/avatar.jpg")
    },
    tags:[
        {
            color: 'success',
            text: 'vuejs',
        },
        {
            color: 'blue',
            text: 'typescript'
        },
        {
            color: 'cyan',
            text: 'eggjs'
        }
    ],
    menu: [
        {
			text: "首页",
			handle: useRoutePathToPage("/show/blogs/1")
		},
		{
			text: "归档",
            handle: useRouteNameToPage("ShowFile")
		},
		{
			text: "赞助列表",
            handle: useRouteNameToPage("ShowList")
		},
		{
			text: "关于我",
			type: "primary",
            handle: useRouteNameToPage("ShowAbout")
		}
    ]
}