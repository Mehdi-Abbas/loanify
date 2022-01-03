import React from "react";
import UseWindowDimensions from "../components/Screensize";
import SettingsIcon from "@mui/icons-material/Settings";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Link } from "react-router-dom";
import Titlebar from "../components/Titlebar";
import LogoutIcon from "@mui/icons-material/Logout";

const DashboardLender = () => {
  const { height } = UseWindowDimensions();

  return (
    <div className="dashboard" style={{ minHeight: height }}>
      {/* <Link to="/">LOGOUT</Link> */}
      {/* <h1>Lender Dashboard</h1> */}
      <Link to="/">
        <LogoutIcon
          style={{
            position: "absolute",
            right: "10px",
            top: "20px",
            color: "white",
            fontSize: "2rem",
          }}
        />
      </Link>
      <Titlebar title="Lender Dashboard" />
      <br />
      <div className="iconwrapper">
        <Link className="iconframe" to="/dashboardlender/investment">
          <div className="icon">
            <img src="deal.png"></img>
          </div>
          <span>Loans</span>
        </Link>
        <Link className="iconframe" to="/dashboardlender/setup">
          <div className="icon">
            <img src="money.png"></img>
          </div>

          <span>Invest Amount</span>
        </Link>
        <Link className="iconframe" to="/dashboardlender/investmenthistory">
          <div className="icon">
            <img src="clock.png"></img>
          </div>
          <span>Investment History</span>
        </Link>
        <Link className="iconframe" to="/dashboardlender/profile">
          <div className="icon">
            <img src="profile.png"></img>
          </div>

          <span>My Profile</span>
        </Link>
       
      </div>
    </div>
  );
};

export default DashboardLender;
