import { Account } from "../views/Account";
import { Home } from "../views/Home";
import { Movie } from "../views/Movie";
import { MyLists } from "../views/MyLists";
import { Search } from "../views/Search";
import { Settings } from "../views/Settings";

export const privateRoutes = [
  {
    path: "/Home",
    component: Home,
  },
  {
    path: "/MyLists",
    component: MyLists,
  },
  {
    path: "/Account",
    component: Account,
  },
  {
    path: "/Settings",
    component: Settings,
  },
  {
    path: "/Movie/:id",
    component: Movie,
  },
  {
    path: "/Search/:query",
    component: Search,
  },
];
