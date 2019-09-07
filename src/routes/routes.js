import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TaskCreate from "@/pages/Task/Create.vue";
//Project
import ProjectCreate from "@/pages/Project/Create.vue";
import ProjectList from "@/pages/Project/List.vue";
import ProjectView from "@/pages/Project/View.vue";
import ProjectChoice from "@/pages/Project/Choice.vue";
import PageTest from "@/pages/Tests/Test.vue";

//Task
import TaskView from "@/pages/Task/View.vue";
import TableList from "@/pages/TableList.vue";

//Category
import CategoryCreate from "@/pages/Category/Create.vue";
import CategoryList from "@/pages/Category/List.vue";
import CategoryView from "@/pages/Category/View.vue";

import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";

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
        path:'test',
        name: "Тестирование",
        component: PageTest,
      },

      {
        path: "task/create/:id?/:project_id?",
        name: "Редактирование задачи",
        component: TaskCreate,
        props: true
      },
      {
        path: "task/view/:id",
        name: "Просмотр задачи",
        component: TaskView,
      },
      {
        path: "project/create/:id",
        name: "Редактирование проекта",
        component: ProjectCreate,
      },
      {
        path: "project/view/:id",
        name: "Редактирование проекта",
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
        path: "category/create/:id",
        name: "Редактирование проекта",
        component: CategoryCreate,
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
        path: "table",
        name: "Задачи",
        component: TableList
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
      }
    ]
  }
];

export default routes;
