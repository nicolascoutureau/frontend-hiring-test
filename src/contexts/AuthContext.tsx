import React, { useEffect } from "react";
import {login} from "../api";

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

interface AuthContextType {
  user: any;
  signin: any,
  setUser: any
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  useEffect(() => {
    let storageUser = localStorage.getItem("user");

    if(storageUser){
        setUser(JSON.parse(storageUser))
    }
  }, []);

  function signin(username: string, password: string) {
      return login(username, password).then(data => {
          setUser(data?.user);
      })
  }

  let value = { user, signin, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
