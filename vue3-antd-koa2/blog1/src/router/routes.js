/**
 * 添加类型提示
 * @type {import ('vue-router').RouteRecordRaw[]}
 */

export const routes = [
  {
    path:'/:pathMatch(.*)*',//404页面
    name:'NotFound',
    component:()=>import('../views/common/NotFound.vue')
  },
  {
    path: '/',
    redirect: '/show'
  },
  {
    path: '/show',
    name: 'Show',
    component: () => import('../views/show/Index.vue'),
    children: [
      {
        path: '',
        redirect: '/show/blogs/1'
      },
      {
        path: 'blogs/:pageNum',
        name: 'ShowBlog',
        component: () => import('../views/show/Blog.vue')
      },
      {
        path: "books/:pageNum",
        name: "ShowBook",
        component: () => import("../views/show/Book.vue")
      },
      {
        path: "projects",
        name: "ShowProject",
        component: () => import("../views/show/Project.vue")
      },
      {
        path: "files",
        name: "ShowFile",
        component: () => import("../views/show/File.vue")
      },
      {
        path: "list",
        name: "ShowList",
        component: () => import("../views/show/List.vue")
      },
      {
        path: 'about',
        name: 'ShowAbout',
        component: () => import('../views/show/About.vue')
      }
    ]
  },
  {
    path: "/manage",
		name: "Manage",
		component: () => import("../views/manage/Index.vue"),
		children: [
			{
				path: "",
				redirect: "/manage/login"
			},
			{
				path: "login",
				name: "ManageLogin",
				component: () => import("../views/manage/Login.vue")
			},
      {
        path: 'editor',
        name: 'ManageEditor',
        component:() => import ('../views/manage/Editor.vue')
      },
      {
        path: "articles/:pageNum",
				name: "ManageArticle",
        component: ()=>import ('../views/manage/Articles.vue')
      }
		]
  }

]