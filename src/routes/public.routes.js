import { Login } from "../views/Login";
import { Signup } from "../views/Signup";

export const publicRoutes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: Login,
  },
  {
    path: "/signup",
    component: Signup,
  },
];
