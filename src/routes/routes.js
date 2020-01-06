import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
//Project
import ProjectCreate from "@/pages/Project/Create.vue";
import ProjectUpdate from "@/pages/Project/Update.vue";
import ProjectList from "@/pages/Project/List.vue";
import ProjectView from "@/pages/Project/View.vue";
import ProjectChoice from "@/pages/Project/Choice.vue";



import PageTest from "@/pages/Tests/Test.vue";

//Task
import TaskView from "@/pages/Task/View.vue";
import TableList from "@/pages/Task/List.vue";
import TaskUpdate from "@/pages/Task/Update.vue";
import TaskCreate from "@/pages/Task/Create.vue";

//Tag
import TagList from "@/pages/Tag/List.vue";

//Note
import NoteView from "@/pages/Note/View.vue";
import NoteList from "@/pages/Note/List.vue";
import NoteUpdate from "@/pages/Note/Update.vue";
import NoteCreate from "@/pages/Note/Create.vue";
//Category
import CategoryCreate from "@/pages/Category/Create.vue";
import CategoryList from "@/pages/Category/List.vue";
import CategoryView from "@/pages/Category/View.vue";
import CategoryUpdate from "@/pages/Category/Update.vue";


import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";

//Search
import Search from "@/pages/Search/Search.vue";
//LoginForm

import LoginForm from "@/pages/LoginForm.vue";
import Register from "@/pages/Register.vue";
//404

import EmptyPage from "@/pages/404.vue";

import {store} from '@/store';



const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isLoggedIn) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isLoggedIn) {
    next()
    return
  }
  next('/login')
}



const routes = [

  {
    path: "/login",
    component: LoginForm,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/register",
    component: Register,
    beforeEnter: ifNotAuthenticated
  },
  {

    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    beforeEnter: ifAuthenticated,
    children: [

      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },

      {
        path: "note/create",
        name: "Dashboard",
        component: NoteCreate
      },
      {
        path: "note/view/:id",
        name: "Dashboard",
        component: NoteView
      },
      {
        path: "note/update/:id",
        name: "Редактирование заметки",
        component: NoteUpdate,
      },
      {
        path: "note/:page?",
        name: "Задачи",
        component: NoteList
      },

      {
        path: "search/:str?",
        name: "Поиск",
        component: Search
      },
      {
        path:'test/:id?',
        name: "Тестирование",
        component: PageTest,
      },

      {
        path: "task/create/:parent_id?",
        name: "Создание задачи",
        component: TaskCreate,
        props: true
      },
      {
        path: "task/view/:id",
        name: "Просмотр задачи",
        component: TaskView,
      },
      {
        path: "project/create/",
        name: "Новый проект",
        component: ProjectCreate,
      },
      {
        path: "project/view/:id",
        name: "Просмотр проекта",
        component: ProjectView,
      },

        {
            path:'project/list',
            name: "Вывод",
            component: ProjectList,
        },
      {
        path:'project/choice',
        name: "Вывод",
        component: ProjectChoice,
      },
        {
        path:'project/update/:id',
        name: "Обновление",
        component: ProjectUpdate,
        },
      {
        path: "category/create/:parent_id?",
        name: "Редактирование проекта",
        component: CategoryCreate,
      },
    {
        path: "category/update/:id",
        name: "Редактирование проекта",
        component: CategoryUpdate,
    },

      {
        path: "category/view/:id",
        name: "Редактирование проекта",
        component: CategoryView,
      },
      {
        path:'category/list',
        name: "Вывод",
        component: CategoryList,
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "task/list/:page?",
        name: "Задачи",
        component: TableList
      },
      {
          path: "task/update/:id",
          name: "Редактирование проекта",
          component: TaskUpdate,
      },
      {
        path: "tag/list",
        name: "Метки",
        component: TagList
      },

      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "upgrade",
        name: "Upgrade to PRO",
        component: UpgradeToPRO
      },
      {
        path: '*',
        component: EmptyPage
      },
    ]
  }
];


export default routes;
