import React from "react";

export default function contentWrapper(props) {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      {/* <!-- Main Content --> */}

      <div id="content">
        {/* <!-- Topbar --> */}
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          {/* <!-- Sidebar Toggle (Topbar) --> */}
          <button
            id="sidebarToggleTop"
            className="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i className="fa fa-bars" />
          </button>

          {/* <!-- Topbar Navbar --> */}
          <ul className="navbar-nav ml-auto">
            <div className="topbar-divider d-none d-sm-block" />
          </ul>
        </nav>
        {/* <!-- End of Topbar --> */}
        {/* <!-- Begin Page Content --> */}
        {props.children}
      </div>
      {/* <!-- End of Main Content --> */}

      {/* <!-- Footer --> */}
      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Copyright © koeff</span>
          </div>
        </div>
      </footer>
      {/* <!-- End of Footer --> */}
    </div>
  );
}
