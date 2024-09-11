type NavItem = {
  name: string;
  link: string;
};

type NavData = NavItem[];

export const navData: NavData = [
  {
    name: "community",
    link: "/community",
  },
  {
    name: "write",
    link: "/",
  },
  {
    name: "documents",
    link: "/docs",
  },
  {
    name: "login",
    link: "/login",
  },
  {
    name: "signup",
    link: "/signup",
  },
];
