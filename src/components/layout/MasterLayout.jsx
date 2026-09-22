import React from "react";
import Header from "../Header.jsx";

const MasterLayout = ({ children }) => {
  return (
    <div className="absolute custom-position-mobile inset-0 flex flex-col">
      <Header />
      <main className="flex grow flex-col relative main-container">
        <div className="absolute custom-position-mobile inset-0">{children}</div>
      </main>
    </div>
  );
};

export default MasterLayout;
