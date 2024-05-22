import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <>
      <div>
        <h1>BAN MAIN PAGE</h1>
        <div className="message-button">
                <Link to={"/friends"}><button><label>friends</label></button></Link>
            </div>
      </div>     
    </>
  );
};

export default MainPage;
