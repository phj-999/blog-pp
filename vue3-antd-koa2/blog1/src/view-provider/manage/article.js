import {reactive} from 'vue'

export const articleViewConfig = {
	pagination: reactive({
		pageSize: 3
	}),
	columns: [
		{
			title: "标题",
			dataIndex: "title",
			key: "title"
		},
		{
			title: "创建时间",
			dataIndex: "createdAt",
			key: "createdAt"
		},
		{
			title: "修改时间",
			dataIndex: "updatedAt",
			key: "updatedAt"
		},
		{
			title: "类型",
			key: "type",
			dataIndex: "type",
			slots: {
				customRender: "type"
			}
		},
		{
			title: "编辑",
			key: "edit",
			slots: {
				customRender: "edit"
			}
		}
	],
	data: [
		{
			key: "1",
			title: "测试文章",
			createdAt: "2020-1-1",
			updatedAt: "2020-1-1",
			type: "blog"
		},
		{
			key: "2",
			title: "测试文章",
			createdAt: "2020-1-1",
			updatedAt: "2020-1-1",
			type: "blog"
		},
		{
			key: "3",
			title: "测试文章",
			createdAt: "2020-1-1",
			updatedAt: "2020-1-1",
			type: "book"
		},
		{
			key: "4",
			title: "测试文章",
			createdAt: "2020-1-1",
			updatedAt: "2020-1-1",
			type: "book"
		},
		{
			key: "5",
			title: "测试文章",
			createdAt: "2020-1-1",
			updatedAt: "2020-1-1",
			type: "blog"
		}
	]
}