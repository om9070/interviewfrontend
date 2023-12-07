
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route, Link, Routes, Navigate } from "react-router-dom";
import Sing_up from "./Sign_up";
import Log_in from "./Log_in";
import Home from "./Home";
import Mycar from "./myEvent";





function PrivateRoute({ children }) {
  const auth = localStorage.getItem("token");
  return auth ? children : <Navigate to="/" />;
}

function PublicRoute({ children }) {
  const auth = localStorage.getItem("token");
  return !auth ? children : <Navigate to="/Home" />;
}
function App() {
  
  return (
    <>
        <Routes>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Sing_up />
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              <PublicRoute>
                <Log_in />
              </PublicRoute>
            }
          />
          <Route
            path="/myEvent"
            element={
              <PrivateRoute>
                <Mycar />
              </PrivateRoute> }>
          </Route>
        </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
