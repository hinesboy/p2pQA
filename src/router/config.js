import { AuthLayout, DefaultLayout } from "@/components/layouts"

export const publicRoute = [
  { path: "*", component: () => import(/* webpackChunkName: "errors-404" */ "@/views/error/NotFound.vue") },
  {
    path: "/",
    component: AuthLayout,
    meta: { title: "Login" },
    redirect: "/login",
    hidden: true,
    children: [
      {
        path: "login",
        name: "login",
        meta: { title: "Login" },
        component: () => import(/* webpackChunkName: "login" */ "@/views/auth/Login.vue")
      },
      {
        path: "register",
        name: "register",
        meta: { title: "Register" },
        component: () => import(/* webpackChunkName: "login" */ "@/views/auth/Register.vue")
      }
    ]
  },

  {
    path: "/404",
    name: "404",
    meta: { title: "Not Found" },
    component: () => import(/* webpackChunkName: "errors-404" */ "@/views/error/NotFound.vue")
  },

  {
    path: "/500",
    name: "500",
    meta: { title: "Server Error" },
    component: () => import(/* webpackChunkName: "errors-500" */ "@/views/error/Error.vue")
  }
]

export const protectedRoute = [
  {
    path: "/home",
    component: DefaultLayout,
    meta: { title: "Home", group: "apps", icon: "" },
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        meta: { title: "Home", group: "apps", icon: "dashboard" },
        component: () => import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue")
      },

      {
        path: "/403",
        name: "Forbidden",
        meta: { title: "Access Denied", hiddenInMenu: true },
        component: () => import(/* webpackChunkName: "error-403" */ "@/views/error/Deny.vue")
      }
    ]
  },

  //ask question
  {
    path: "/question",
    component: DefaultLayout,
    meta: { title: "Ask", icon: "", group: "question" },
    redirect: "/ask",
    children: [
      {
        path: "/ask",
        name: "Ask",
        meta: { title: "Ask", group: "question", icon: "dashboard" },
        component: () => import(/* webpackChunkName: "dashboard" */ "@/views/Ask.vue")
      }
    ]
  },
  //answer question
  {
    path: "/answer",
    component: DefaultLayout,
    meta: { title: "Solve", icon: "", group: "answer" },
    redirect: "/solve",
    children: [
      {
        path: "/solve",
        name: "Solve",
        meta: { title: "Solve", group: "answer", icon: "dashboard" },
        component: () => import(/* webpackChunkName: "dashboard" */ "@/views/Solve.vue")
      }
    ]
  },

  // ======================================
  //list
  {
    path: "/cms",
    component: DefaultLayout,
    redirect: "/cms/table",
    meta: { title: "CMS", icon: "view_compact", group: "cms" },
    children: [
      {
        path: "/cms/table",
        name: "ListTable",
        meta: { title: "CMS Table" },
        component: () => import(/* webpackChunkName: "table" */ "@/views/list/Table.vue")
      }
    ]
  }
]
