import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  //eslint-disable-next-line
  const getUser = async () => {
    try {
      dispatch(showLoading());
      // console.log("Called the API");
      const response = await axios.post(
        "http://localhost:8080/auth/getUserData",
        {
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.status) {
        // console.log("This is from the getUser");
        dispatch(setUser(response.data.data));
      } else {
        // console.log("Inside the error");
        console.log(response.status);
        localStorage.clear();
        <Navigate to="/login" />;
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
