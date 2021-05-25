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
			handle: () => console.log("你好, 我是首页")
		},
		{
			text: "归档"
		},
		{
			text: "赞助列表"
		},
		{
			text: "关于我",
			type: "primary"
		}
    ]
}