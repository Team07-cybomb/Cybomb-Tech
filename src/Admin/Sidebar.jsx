import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar - Fixed positioning */}
      <div
        className="d-none d-md-block bg-dark text-white p-3 position-fixed"
        style={{ width: "250px", minHeight: "100vh", zIndex: 1000, overflowY: "auto" }}
      >
        <div className="sidebar-logo text-center mb-4">
          {/* <i className="fas fa-shield-alt fa-2x text-primary mb-2"></i> */}
          <h5 className="text-white text-start">Cybomb Admin</h5>
        </div>
        
        <ul className="list-unstyled">
          <li className="my-2">
            <Link
              to="/admin/home"
              className="text-white text-decoration-none d-block p-2 rounded hover-bg-light"
            >
              <i className="fas fa-tachometer-alt me-2"></i>Dashboard
            </Link>
          </li>
          <li className="my-2">
            <Link
              to="/admin/users"
              className="text-white text-decoration-none d-block p-2 rounded hover-bg-light"
            >
              <i className="fas fa-users me-2"></i>Users
            </Link>
          </li>
          <li className="my-2">
            <Link
              to="/admin/form-submission"
              className="text-white text-decoration-none d-block p-2 rounded hover-bg-light"
            >
              <i className="fas fa-file-alt me-2"></i>Form Submissions
            </Link>
          </li>
          <li className="my-2">
            <Link
              to="/admin/career-page"
              className="text-white text-decoration-none d-block p-2 rounded hover-bg-light"
            >
              <i className="fas fa-briefcase me-2"></i>Career Applications
            </Link>
          </li>
          <li className="my-2">
            <Link
              to="/admin/admin-blog"
              className="text-white text-decoration-none d-block p-2 rounded hover-bg-light"
            >
              <i className="fas fa-blog me-2"></i>Blog Management
            </Link>
          </li>
          <li className="my-2">
            <Link
              to="/admin/settings"
              className="text-white text-decoration-none d-block p-2 rounded hover-bg-light"
            >
              <i className="fas fa-cog me-2"></i>Settings
            </Link>
          </li>
        </ul>
        
        <div className="sidebar-footer mt-5 pt-3 border-top border-secondary">
          <div className="text-center text-muted small">
            <p>v1.2.0</p>
            <p>© 2023 Cybomb</p>
          </div>
        </div>
      </div>

      {/* Mobile Offcanvas Sidebar */}
      <div
        className="offcanvas offcanvas-start d-md-none"
        tabIndex="-1"
        id="offcanvasSidebar"
        aria-labelledby="offcanvasSidebarLabel"
      >
        <div className="offcanvas-header bg-dark text-white">
          <h5 className="offcanvas-title" id="offcanvasSidebarLabel">
            <i className="fas fa-shield-alt me-2"></i>Cybomb Admin
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body bg-dark p-3">
          <ul className="list-unstyled">
            <li className="my-2">
              <Link
                data-bs-dismiss="offcanvas"
                to="/admin/home"
                className="text-white text-decoration-none d-block p-2 rounded hover-bg-light"
              >
                <i className="fas fa-tachometer-alt me-2"></i>Dashboard
              </Link>
            </li>
            <li className="my-2">
              <Link
                data-bs-dismiss="offcanvas"
                to="/admin/users"
                className="text-white text-decoration-none d-block p-2 rounded hover-bg-light"
              >
                <i className="fas fa-users me-2"></i>Users
              </Link>
            </li>
            <li className="my-2">
              <Link
                data-bs-dismiss="offcanvas"
                to="/admin/forms"
                className="text-white text-decoration-none d-block p-2 rounded hover-bg-light"
              >
                <i className="fas fa-file-alt me-2"></i>Form Submissions
              </Link>
            </li>
            <li className="my-2">
              <Link
                data-bs-dismiss="offcanvas"
                to="/admin/careers"
                className="text-white text-decoration-none d-block p-2 rounded hover-bg-light"
              >
                <i className="fas fa-briefcase me-2"></i>Career Applications
              </Link>
            </li>
            <li className="my-2">
              <Link
                data-bs-dismiss="offcanvas"
                to="/admin/blog"
                className="text-white text-decoration-none d-block p-2 rounded hover-bg-light"
              >
                <i className="fas fa-blog me-2"></i>Blog Management
              </Link>
            </li>
            <li className="my-2">
              <Link
                data-bs-dismiss="offcanvas"
                to="/admin/settings"
                className="text-white text-decoration-none d-block p-2 rounded hover-bg-light"
              >
                <i className="fas fa-cog me-2"></i>Settings
              </Link>
            </li>
          </ul>
          
          <div className="sidebar-footer mt-5 pt-3 border-top border-secondary">
            <div className="text-center text-muted small">
              <p>v1.2.0</p>
              <p>© 2023 Cybomb</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hover effect CSS */}
      <style>
        {`
          .hover-bg-light:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
          .hover-bg-secondary:hover {
            background-color: rgba(0, 123, 255, 0.1);
          }
          .sidebar-logo {
            padding: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          .sidebar-footer {
            padding: 1rem;
          }
        `}
      </style>
    </>
  );
}

export default Sidebar;