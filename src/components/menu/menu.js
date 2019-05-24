import React, { Fragment } from "react";

import { Link } from "react-router-dom";

export default function menu() {
  return (
    <Fragment>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* <!-- Sidebar - Brand --> */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div>
          <div className="sidebar-brand-text mx-3">
            Училище <sup />
          </div>
        </a>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/* #############  */}

        {/* ############# Links */}

        {/* <!-- Nav Item - Tables --> */}
        <li className="nav-item">
          <Link className="nav-link" to="/KeyValue/list/Subject">
            <i className="fas fa-fw fa-table" />
            <span>Предмет</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/KeyValue/list/ClassNumber">
            <i className="fas fa-fw fa-table" />
            <span>Клас Номер</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/KeyValue/list/ClassLetter">
            <i className="fas fa-fw fa-table" />
            <span>Клас Буква</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/KeyValue/list/SchoolingYear">
            <i className="fas fa-fw fa-table" />
            <span>Учебна година</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/eduPlan/list">
            <i className="fas fa-fw fa-table" />
            <span>Учебни планове</span>
          </Link>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider d-none d-md-block" />

        {/* ############# Links END */}

        {/* #############  */}
      </ul>
    </Fragment>
  );
}
