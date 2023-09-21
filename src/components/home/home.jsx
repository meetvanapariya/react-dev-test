import React from "react";
import Buttons from "../buttons/Buttons";
const Home = () => {
  return (
    <div className="home-section">
      <Buttons
        link={"/modal-a"}
        text={"All Contacts"}
        classDetail={"button-a"}
      />
      <Buttons
        link={"/modal-b"}
        text={"US Contacts"}
        classDetail={"button-b"}
      />
    </div>
  );
};
export default Home;
