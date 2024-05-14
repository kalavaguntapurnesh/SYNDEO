import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Users from "./pages/admin/Users";
import Facilitators from "./pages/admin/Facilitators";
import Notifications from "./pages/Notifications";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Organizers from "./pages/admin/Organizers";
import FaOrganizers from "./pages/facilitators/Organizers";
import Participants from "./pages/Participants";
import Profile from "./pages/Profile";
import Privacy from "./pages/Privacy";
import ScheduleCreate from "./pages/ScheduleCreate";
import BookingPage from "./pages/BookingPage";
import ExistingSchedules from "./pages/ExistingSchedules";
import UserSchedules from "./pages/UserSchedules";

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <BrowserRouter>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/about"
            element={
              <PublicRoute>
                <About />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          ></Route>

          <Route
            path="/privacy"
            element={
              <PublicRoute>
                <Privacy />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/forgotPassword"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/resetPassword/:id/:token"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/contact"
            element={
              <PublicRoute>
                <Contact />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/admin/facilitators"
            element={
              <ProtectedRoute>
                <Facilitators />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/admin/organizers"
            element={
              <ProtectedRoute>
                <Organizers />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/facilitator/organizers"
            element={
              <ProtectedRoute>
                <FaOrganizers />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/participants"
            element={
              <ProtectedRoute>
                <Participants />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/facilitators/createSchedule"
            element={
              <ProtectedRoute>
                <ScheduleCreate />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/existingSchedules/:id"
            element={
              <ProtectedRoute>
                <ExistingSchedules />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/userSchedules/:id"
            element={
              <ProtectedRoute>
                <UserSchedules />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/book-appointment/:id"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
