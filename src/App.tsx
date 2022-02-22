import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Tractor } from "@aircall/tractor";
import { CallContextProvider } from "./contexts/CallContext";
import { AuthProvider } from "./contexts/AuthContext";

function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();

  if (!localStorage.getItem('user')) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <div className="App">
      <Tractor injectStyle>
        <AuthProvider>
          <CallContextProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
            </Routes>
          </CallContextProvider>
        </AuthProvider>
      </Tractor>
    </div>
  );
}

export default App;
