import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/userApi";
import { toast } from "react-toastify";

const MenuList = () => {
    const [logout, { isLoading, isSuccess }] = useLogoutMutation()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            navigate("/")
            if (isSuccess) {
                toast.success("Logout Success")
            }
        } catch (err) {
            toast.error("Logout Failed")
        }
    }
    return <>
        <div className="flex flex-col p-4 justify-between h-screen">
            <div>
                <div className="flex justify-end">
                    <h1
                        className="btn rounded-full border-gray-400"
                        onClick={() => {
                            const drawer = document.getElementById("my-drawer") as HTMLInputElement;
                            if (drawer) drawer.checked = false
                        }}
                    >X</h1>
                </div>
                <div>
                    <h1 className="text-xl text-start font-semibold mb-4">Menu</h1>
                </div>
                <ul className="space-y-2">
                    <li><Link className="hover:text-blue-500" to="/dashboard">Dashboard</Link></li>
                    <li><Link className="hover:text-blue-500" to="/user-managment">User Management</Link></li>
                    <li><Link className="hover:text-blue-500" to="/visitors">All Visitors</Link></li>
                    <li><Link className="hover:text-blue-500" to="/pending">Pending Visitors</Link></li>
                </ul>
            </div>
            <div>
                <button onClick={handleLogout} className="btn w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 mb-10">
                    {
                        isLoading
                            ? <span className="loading loading-dots">Loading</span>
                            : <span>Logout</span>
                    }
                </button>
            </div>
        </div>
    </>
}

export default MenuList
