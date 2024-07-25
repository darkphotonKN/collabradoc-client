type NavItem = {
  name: string;
  link: string;
};

type NavData = NavItem[];

export const navData: NavData = [
  {
    name: "Write",
    link: "/",
  },
  {
    name: "My Docs",
    link: "/docs",
  },
  {
    name: "Login",
    link: "/login",
  },
  {
    name: "Signup",
    link: "/signup",
  },
];
