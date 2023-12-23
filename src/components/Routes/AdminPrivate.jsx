import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
export default function AdminPrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    try {
      const authCheck = () => {
        axios
          .get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`)
          .then((res) => {
            if (res.data.ok) {
              setOk(true);
            } else {
              setOk(false);
            }
          })
          .catch((error) => <Spinner path="" />);
      };
      if (auth?.token) {
        authCheck();
      }
    } catch (error) {
      console.log(error);
      return <Spinner path="" />;
    }
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner path="" />;
}
