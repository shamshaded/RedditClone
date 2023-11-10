import React, { ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import useAuth from "../../hooks/useAuth";
import Navbar from "../Navbar";
import AuthModal from "../Modal/Auth";
import SideNavBar from "../SideNavBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [user, loadingUser, error] = useAuthState(auth);
  return (
    <>
      <Navbar />
      {!user && <SideNavBar />}
      {children}
    </>
  );
};

export default Layout;
