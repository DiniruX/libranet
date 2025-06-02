import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../views/AppDashboard.vue";
import Forms from "../views/AppForms.vue";
import Tables from "../views/AppTables.vue";
import UIElements from "../views/UIElements.vue";
import Login from "../views/AppLogin.vue";
import Modal from "../views/AppModal.vue";
import Chart from "../views/ChartView.vue";
import Card from "../views/CardView.vue";
import Blank from "../views/BlankView.vue";
import NotFound from "../views/NotFound.vue";
import AppBooks from "@/views/custom_views/AppBooks.vue";
import AppLibraries from "@/views/custom_views/AppLibraries.vue";
import AppReservations from "@/views/custom_views/AppReservations.vue";
import AppFines from "@/views/custom_views/AppFines.vue";
import AppUsers from "@/views/custom_views/AppUsers.vue";
import AppSignUp from "@/views/custom_views/AppSignUp.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { layout: "empty" },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: AppSignUp,
    meta: { layout: "empty" },
  },
  {
    path: "/books",
    name: "Books",
    component: AppBooks,
  },
  {
    path: "/libraries",
    name: "Libraries",
    component: AppLibraries,
  },
  {
    path: "/reservations",
    name: "Reservations",
    component: AppReservations,
  },
  {
    path: "/fines",
    name: "Fines",
    component: AppFines,
  },
  {
    path: "/users",
    name: "Users",
    component: AppUsers,
  },
  {
    path: "/forms",
    name: "Forms",
    component: Forms,
  },
  {
    path: "/cards",
    name: "Cards",
    component: Card,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/ui-elements",
    name: "UIElements",
    component: UIElements,
  },
  {
    path: "/modal",
    name: "Modal",
    component: Modal,
  },
  {
    path: "/charts",
    name: "Chart",
    component: Chart,
  },
  {
    path: "/blank",
    name: "Blank",
    component: Blank,
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
