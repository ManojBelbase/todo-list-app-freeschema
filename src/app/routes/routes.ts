import TodoPage from "../pages/todo/todoPage.index.ts";
import { Login } from "../pages/user/login.index.ts";
import { Register } from "../pages/user/register.index.ts";
import { NotFound } from "../pages/error/NotFound.index.ts";
import { RouteParams } from "../interfaces/IRoute.interface.ts";

const routes: RouteParams[] = [
  {
    path: "/",
    linkLabel: "To-Do List",
    content: TodoPage,
    isAuthenticated: true
  },
  {
    path: "/login",
    linkLabel: "Login",
    content: Login,
  },
  {
    path: "/register",
    linkLabel: "Register",
    content: Register,
  },
  {
    path: "/404",
    content: NotFound,
  },
];

export default routes;
