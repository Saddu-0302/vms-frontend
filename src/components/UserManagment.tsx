import { useEffect, useState } from "react"
import { useGetUsersQuery } from "../redux/userApi"
import { Users, Shield, UserCheck, ShieldCheck, Search, Filter, UserX, UserPlus } from "lucide-react"
import CreateUser from "./CreateUser"
import MenuList from "./MenuList"

interface User {
    _id: string
    first_name: string
    last_name: string
    email: string
    contact: string
    role: string
}

const UserManagement = () => {
    const [filterRole, setFilterRole] = useState<string | null>(null)
    const [search, setSearch] = useState<string>()
    const [filterUsers, setFilterUsers] = useState<User[]>([])
    const { data } = useGetUsersQuery(undefined)
    console.log(data);

    useEffect(() => {
        const inputSearch = search?.toLowerCase().trim()
        let filteredUser: User[] = data
        if (filterRole) {
            filteredUser = data.filter((user: User) => user.role === filterRole)
        }
        if (inputSearch) {
            filteredUser = data.filter(
                (user: User) =>
                    user.email.toLowerCase().includes(inputSearch) ||
                    user.first_name.toLowerCase().includes(inputSearch) ||
                    user.last_name.toLowerCase().includes(inputSearch),
            )
        }
        setFilterUsers(filteredUser)
    }, [search, data, filterRole])

    const admin = data?.filter((admin: any) => admin.role === "admin" && Object.keys(admin).length > 0)
    const hr = data?.filter((hr: any) => hr.role === "hr" && Object.keys(hr).length > 0)
    const guard = data?.filter((guard: any) => guard.role === "guard" && Object.keys(guard).length > 0)


    const userData = [
        {
            icon: Users,
            name: "All Users",
            count: data?.length || 0,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
        },
        {
            icon: Shield,
            name: "Admin",
            count: admin?.length || 0,
            color: "text-red-600",
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
        },
        {
            icon: UserCheck,
            name: "Hr",
            count: hr?.length || 0,
            color: "text-green-600",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
        },
        {
            icon: ShieldCheck,
            name: "Guard",
            count: guard?.length || 0,
            color: "text-yellow-600",
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-200",
        },
    ]



    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case "admin":
                return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium"
            case "hr":
                return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
            case "guard":
                return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium"
            default:
                return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
        }
    }
    const openModal = () => {
        const modal = document.getElementById('my_modal_2') as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 ">
            {/* Enhanced Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center gap-3">
                            <div className="">
                                <label htmlFor="my-drawer" className="cursor-pointer drawer-button rounded-full "><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                    <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                                </svg></label>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                        </div>
                        <button onClick={openModal} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 cursor-pointer">
                            <UserPlus className="w-4 h-4" />
                            Add User
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {userData &&
                        userData.map((user: any, index: number) => {
                            const IconComponent = user.icon
                            return (
                                <div
                                    key={index + 1}
                                    className={`bg-white rounded-lg border-l-4 ${user.borderColor} shadow-sm hover:shadow-md transition-shadow duration-200`}
                                >
                                    <div className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">{user.name}</p>
                                                <p className="text-3xl font-bold text-gray-900 mt-2">{user.count}</p>
                                            </div>
                                            <div className={`${user.bgColor} p-3 rounded-full`}>
                                                <IconComponent className={`w-6 h-6 ${user.color}`} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>

                {/* Enhanced Filters and Table Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    {/* Header with Search and Filter */}
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
                            <div className="flex flex-col sm:flex-row gap-3">
                                {/* Enhanced Search Input */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        value={search || ""}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64 text-sm"
                                        type="text"
                                        placeholder="Search users..."
                                    />
                                </div>

                                {/* Enhanced Filter Dropdown */}
                                <div className="relative">
                                    <div className="dropdown dropdown-end">
                                        <div
                                            tabIndex={0}
                                            role="button"
                                            className="btn btn-outline border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 normal-case font-normal"
                                        >
                                            <Filter className="w-4 h-4 mr-2" />
                                            {filterRole ? filterRole.charAt(0).toUpperCase() + filterRole.slice(1) : "All Roles"}
                                        </div>
                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content menu bg-white rounded-lg shadow-lg border border-gray-200 z-10 w-52 p-2 mt-1"
                                        >
                                            <li>
                                                <a onClick={() => setFilterRole(null)} className="text-gray-700 hover:bg-gray-50 rounded-md">
                                                    All Users
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={() => setFilterRole("admin")} className="text-gray-700 hover:bg-gray-50 rounded-md">
                                                    Admin
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={() => setFilterRole("hr")} className="text-gray-700 hover:bg-gray-50 rounded-md">
                                                    Hr
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={() => setFilterRole("guard")} className="text-gray-700 hover:bg-gray-50 rounded-md">
                                                    Guard
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Table - Desktop */}
                    <div className="hidden md:block overflow-x-auto">
                        {filterUsers && (
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr >
                                        <th className=" py-5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className=" text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th className=" text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filterUsers.map((user: any) => (
                                        <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                                                {user._id.slice(-6)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {user.first_name} {user.last_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.contact}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={getRoleBadgeColor(user.role)}>
                                                    {user.role
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        user.role.slice(1)
                                                    }
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    <button className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-md text-xs font-medium transition-colors duration-150 flex items-center gap-1">
                                                        <UserCheck className="w-3 h-3" />
                                                        Active
                                                    </button>
                                                    <button className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-xs font-medium transition-colors duration-150 flex items-center gap-1">
                                                        <UserX className="w-3 h-3" />
                                                        Deactive
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Enhanced Mobile Cards */}
                    <div className="md:hidden divide-y divide-gray-200">
                        {filterUsers &&
                            filterUsers.map((user: any) => (
                                <div key={user._id} className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 text-base">
                                                {user.first_name} {user.last_name}
                                            </h3>
                                            <p className="text-sm text-gray-500 font-mono mt-1">ID: {user._id.slice(-6)}</p>
                                        </div>
                                        <span className={getRoleBadgeColor(user.role)}>
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </span>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div
                                            className="flex items-center text-sm text-gray-600">
                                            <span className="font-medium w-20 text-gray-500">Email:</span>
                                            <span className="text-gray-900">{user.email}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <span className="font-medium w-20 text-gray-500">Contact:</span>
                                            <span className="text-gray-900">{user.contact}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-green-100 text-green-700 hover:bg-green-200 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-150 flex items-center justify-center gap-1">
                                            <UserCheck className="w-4 h-4" />
                                            Active
                                        </button>
                                        <button className="flex-1 bg-red-100 text-red-700 hover:bg-red-200 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-150 flex items-center justify-center gap-1">
                                            <UserX className="w-4 h-4" />
                                            Deactive
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* Empty State */}
                    {filterUsers && filterUsers.length === 0 && (
                        <div className="text-center py-12">
                            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                        </div>
                    )}
                </div>
            </div>


            {/* add user modal */}
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box ">
                    <CreateUser />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            {/* side menu  */}
            <div className="drawer z-10">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <MenuList />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UserManagement
