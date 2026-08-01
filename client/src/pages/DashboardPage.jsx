import userAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

const DashboardPage =()=>{
        console.log("Dashboard component rendered");
        const {user,logout} = userAuthStore();
        console.log(user.name);
        const navigate = useNavigate();

        const handleLogout =()=>{
                logout();
                navigate("/login");
        };

        return(
        <div className="min-h-screen bg-gray-950 text-white">
                {/* Top bar */}
                <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
                        <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-indigo-600 rounded-full" />
                                <span className="font-semibold">Nexus AI</span>
                        </div>
                        <div className="flex items-center gap-4">
                                <span className="text-gray-400 text-sm">
                                Welcome, {user?.name}
                                </span>
                                <button
                                onClick={handleLogout}
                                className="text-sm text-gray-400 hover:text-white transition"
                                >
                                Logout
                                </button>
                        </div>
                </nav>
                        {/* Content */}
                <div className="flex items-center justify-center h-96">
                        <div className="text-center">
                                <div className="w-16 h-16 bg-indigo-950 border border-indigo-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <div className="w-8 h-8 bg-indigo-600 rounded-full" />
                                </div>
                                <h1 className="text-2xl font-semibold mb-2">
                                Dashboard coming in Phase 8
                                </h1>
                                <p className="text-gray-400 text-sm">
                                Backend is fully connected. Auth is working.
                                </p>
                        </div>
                </div>
        </div>
        );

};
export default DashboardPage;