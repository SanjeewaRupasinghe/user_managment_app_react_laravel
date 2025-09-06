import { Link, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import { Navigate } from "react-router-dom";
import axiosClient from "../../utility/axios-client";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();

  const logout = (ev) => {
    ev.preventDefault();
   console.log("logout");
   
    axiosClient.post('/logout')
    .then(()=>{
      setUser(null);
      setToken(null);
      localStorage.removeItem('ACCESS_TOKEN');
    })
    .catch((error)=>{
      console.log(error);
    })

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
            <span className="pe-1">
            {user.name}
            </span>
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
