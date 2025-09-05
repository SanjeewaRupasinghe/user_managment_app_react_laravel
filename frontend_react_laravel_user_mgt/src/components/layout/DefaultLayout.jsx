import { Link, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import { Navigate } from "react-router-dom";

export default function DefaultLayout() {
  const { user, token } = useStateContext();

  const logout = (ev) => {
    ev.preventDefault();
    console.log("logout");
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div id="defaultLayout">
      {/* Sidebar */}
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      {/* END Sidebar */}

      {/* Content */}

      <div className="content">
        <header>
          <div>Header</div>
          <div>
            {user.name}
            <Link to="#" onClick={logout}>
              Logout
            </Link>
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
      {/* END Content */}
    </div>
  );
}
