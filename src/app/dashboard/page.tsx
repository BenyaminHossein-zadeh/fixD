'use client'
import React from "react";
import { signout } from "../actions/auth";

const Dashboard = () => {
  return (
    <div>
      <div>Dashboard</div>
      <p onClick={() => signout()}>logout</p>
    </div>
  );
};

export default Dashboard;
