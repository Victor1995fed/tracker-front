import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TaskCreate from "@/pages/Task/Create.vue";
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

//LoginForm

import LoginForm from "@/pages/LoginForm.vue";
//404

import EmptyPage from "@/pages/404.vue";

const routes = [
  {

    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",

    children: [

      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },

      {
        path: "login",
        name: "Авторизация",
        component: LoginForm
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
        path: "task/:page?",
        name: "Задачи",
        component: TableList
      },
    {
        path: "task/update/:id",
        name: "Редактирование проекта",
        component: TaskUpdate,
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
