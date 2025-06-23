import { Link } from "react-router-dom";

const MenuList = () => {
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
                    <li><Link className="hover:text-blue-500" to="/">Dashboard</Link></li>
                    <li><Link className="hover:text-blue-500" to="/user-managment">User Management</Link></li>
                    <li><Link className="hover:text-blue-500" to="/visitors">All Visitors</Link></li>
                    <li><Link className="hover:text-blue-500" to="/pending">Pending Visitors</Link></li>
                </ul>
            </div>
            <div>
                <button className="btn w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 mb-10">
                    Logout
                </button>
            </div>
        </div>
    </>
}

export default MenuList
