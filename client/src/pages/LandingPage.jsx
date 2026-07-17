import { useNavigate } from "react-router-dom";

const LandingPage=()=>{
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col">
            {/*navbar*/}
            <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-indigo-600 rounded-full"/>
                    <span className="text-lg font-semibold ">Nexus AI</span>
                </div>
                <div className="flex gap-3">
                    <button onClick={()=>navigate("/login")}
                    className="px-4 py-2 text-sm text-gray-300 hover:text-white transition">
                        Login
                    </button>
                    <button onClick={()=>navigate("register")}
                    className="px-4 py-2 text-sm bg-indio-600 hover:bg-indigo-500 rounded-lg transition"  >
                        Get started
                    </button>
                </div>
            </nav>
            {/*Hero section */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <div className="text-xs font-medium bg-indigo-950 text-indigo-400 px-3 py-1 rounded-full mb-6 border border-indigo-800">
                    Powered by Gemini AI
                </div>
                <h1 className="text-5xl font-bold mb-4 max-w-2xl leading-tight"> 
                    Project management that
                    <span className="text=indigo-400">thinks for you</span>
                </h1>
                <P className="text-gray-400 text-lg mb-8 max-w-xl">
                    Nexus AI decomposes your tasks,rates difficulty, assigns tags,and updates your team in real time - automatically.
                </P>
                <button
                    onClick={()=>navigate("/register")}
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-base font-medium transition"
                >
                    Start building for free →
                </button>
            </div>
            {/*feature pills */}
            <div className="flex justify-center gap-4 pb-12 flex-wrap px-4">
                {["AI task decomposition","Reat-time updates","Role-based access","Smart tagging"].map(f=>(
                    <div key={f} className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-sm text-gray-400">
                            {f}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default LandingPage;