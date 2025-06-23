import { UserCheck, UserX } from "lucide-react"
import { useGetAllVisitorsQuery } from "../redux/visitorApi"
import MenuList from "./MenuList"

const AllVisitor = () => {
    const { data } = useGetAllVisitorsQuery(undefined)

    const statusBadge = (status: string) => {
        switch (status) {
            case "Pending":
                return "badge badge-soft badge-warning my-5"
            case "Approved":
                return "badge badge-soft badge-success my-5"
            case "Rejected":
                return "badge badge-soft badge-error my-5"
            default:
                return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium"
        }
    }
    return <>
        <div className="min-h-screen">
            {/* header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center gap-3">
                            <div className="text-sm text-gray-600">
                                <label htmlFor="my-drawer" className="cursor-pointer drawer-button rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                    <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                                </svg></label>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">Visitor Dashboard</h1>
                        </div>
                        <div className="flex items-center gap-3">

                            <div className="flex justify-end  ">
                                <button
                                    className=" btn bg-gradient-to-r from-blue-600 to-purple-600 text-white "
                                // onClick={() => {
                                //     (document.getElementById('my_modal_3') as HTMLInputElement)?.showModal()
                                // }}
                                >
                                    {/* <UserPlus className="w-4 h-4" /> Add Visitor */}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                data && <div className="hidden lg:block md:block overflow-x-auto">
                    <table className="w-full table">
                        <thead className="bg-gray-50 table-header-group">
                            <tr>
                                <th className="px-6 font-medium text-gray-500 uppercase tracking-wider">Id</th>
                                <th className="px-6  text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Host</th>
                                <th className="px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                                <th className="px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((visitor: any) => <tr key={visitor._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{visitor._id.slice(-6)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{visitor.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{visitor.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{visitor.contact}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{visitor.host}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{visitor.purpose}</td>
                                    <td className={statusBadge(visitor.status)}>
                                        {visitor.status}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                                        {
                                            visitor.status == "Pending"
                                                ? <div className="flex gap-2">

                                                    <button className="btn btn-soft btn-success">
                                                        <UserCheck className="w-4 h-4" />
                                                        Approve
                                                    </button>

                                                    <button className="btn btn-soft btn-error">
                                                        <UserX className="w-4 h-4" />
                                                        Reject
                                                    </button>
                                                </div>
                                                : <div className="font-bold text-center">_</div>
                                        }
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            }

            <div className="md:hidden divide-y divide-gray-300">
                {
                    data && data.map((v: any) => <div key={v._id} className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="font-semibold text-gray-900 text-base">{v.name}</h1>
                                <p className="text-sm text-gray-500 font-mono mt-1">Id:{v._id.slice(-6)}</p>
                            </div>
                            <span className={statusBadge(v.status)}>{v.status}</span>

                        </div>
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="font-medium w-20 text-gray-500">Email:</span>
                                <span className="text-gray-900">{v.email}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="font-medium w-20 text-gray-500">Contact:</span>
                                <span className="text-gray-900">{v.contact}</span>
                            </div>
                        </div>
                        <div >
                            {
                                v.status == "Pending" && <div className="flex gap-2">
                                    <button className="flex-1 bg-green-100 text-green-700 hover:bg-green-200 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-150 flex items-center justify-center gap-1">
                                        <UserCheck className="w-4 h-4" />
                                        Approve
                                    </button>
                                    <button className="flex-1 bg-red-100 text-red-700 hover:bg-red-200 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-150 flex items-center justify-center gap-1">
                                        <UserX className="w-4 h-4" />
                                        Reject</button>
                                </div>
                            }
                        </div>
                    </div>)
                }
            </div>
            {/* side menu */}
            <div className="drawer z-10">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        <MenuList />
                    </ul>
                </div>
            </div>
        </div>

    </>
}

export default AllVisitor