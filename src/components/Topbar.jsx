import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import usrImg from "../assets/usr.png";
import SignInModal from "./SignInModal";

const Topbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const { user, signIn, signOut } = useAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);

  const title = {
    "/": {
      title: "Shop",
      subtitle: "Shop > Books",
    },
    "/stores": {
      title: "Stores",
      subtitle: "Admin > Stores",
    },
    "/author": {
      title: "Authors",
      subtitle: "Admin > Authors",
    },
    "/books": {
      title: "Books",
      subtitle: "Admin > Books",
    },
    "/store/:storeId": {
      title: "Store Inventory",
      subtitle: "Admin > Store Inventory",
    },
    "/browsebooks": {
      title: "Browse Books",
      subtitle: "Shop > Books",
    },
    "/browseauthors": {
      title: "Browse Authors",
      subtitle: "Shop > Authors",
    },
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <div className="h-24 border-b border-b-secondary-text flex justify-between items-center">
        <div className="flex flex-col justify-start items-start ">
          <p className="text-lg text-secondary-text">{title[path]?.title}</p>
          <p className="font-light text-secondary-text">
            {title[path]?.subtitle}
          </p>
        </div>
        <div className="flex-1 flex justify-end items-center">
          {user ? (
            <>
              <img src={usrImg} alt="profile" className="ml-4 rounded" />
              <p className="text-secondary-text font-light ml-1 h-full">
                {user.first_name} {user.last_name}
              </p>
              <button
                onClick={handleSignOut}
                className="ml-4 text-main hover:text-main-dark font-light"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowSignInModal(true)}
              className="ml-4 bg-main text-white px-4 py-2 rounded hover:bg-main-dark font-light"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
      <SignInModal
        show={showSignInModal}
        setShow={setShowSignInModal}
        onSignIn={signIn}
      />
    </>
  );
};

export default Topbar;