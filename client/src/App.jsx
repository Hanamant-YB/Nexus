import { BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";


const App =()=>{
  return(
    <BrowserRouter>
      <Routes>

        {/*public routes - anyone can access and visit*/}
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>

        {/*protected routes - must be logged in */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                  <DashboardPage/>
              </ProtectedRoute>
            }
          />
        {/*catch the unknown URLs and redirect to home / landing page*/}
        <Route path="*" element={
          <Navigate to="/" replace />
        }/>

      </Routes>
    
    </BrowserRouter>
  );
};

export  default App;