import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const { id, token } = useParams();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(showLoading());
    axios
      .post(`http://localhost:8080/auth/resetPassword/${id}/${token}`, {
        password,
      })
      .then((response) => {
        dispatch(hideLoading());
        if (response.data.status) {
          Swal.fire({
            title: "Password Reset Successful",
            icon: "success",
          });
          navigate("/login");
        }
      })
      .catch((error) => {
        dispatch(hideLoading());
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        navigate("/");
      });
  };

  return (
    <div>
      <Navbar />
      <div className="relative pt-32 pb-4 bg-gray-50 h-screen">
        <div className="w-full">
          <div className="w-full px-4 mx-auto max-w-[1400px]">
            <div className="justify-center w-full">
              <div className="w-full max-w-[14000px] mx-auto space-y-4 ">
                <div>
                  <section className="bg-gray-50 my-8">
                    <div className="flex flex-col items-center justify-center px-6 mx-auto">
                      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-4 sm:p-8">
                          <h1 className="text-xl font-bold leading-tight tracking-tight text-colorThree md:text-2xl dark:text-white">
                            Reset Password
                          </h1>
                          <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit}
                          >
                            <div>
                              <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-colorThree dark:text-white"
                              >
                                Your password
                              </label>
                              <input
                                type="password"
                                name="password"
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="*******"
                                required=""
                                onChange={(e) => setPassword(e.target.value)}
                              ></input>
                            </div>

                            <button
                              type="submit"
                              className="w-full text-white bg-colorThree hover:bg-colorFour transition ease-in-out duration-1000 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
                            >
                              Update Password
                            </button>
                            {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                              Don’t have an account yet?{" "}
                              <a
                                href="/register"
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                              >
                                Sign up
                              </a>
                            </p> */}
                          </form>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
