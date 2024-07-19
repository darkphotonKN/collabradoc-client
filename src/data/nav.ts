type NavItem = {
  name: string;
  link: string;
};

type NavData = NavItem[];

export const navData: NavData = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Docs",
    link: "/docs",
  },
  {
    name: "Log in",
    link: "/login",
  },
  {
    name: "Register",
    link: "/register",
  },
];
