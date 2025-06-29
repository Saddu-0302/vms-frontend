import { useEffect, useState } from "react"
import { useGetAllVisitorsQuery } from "../redux/visitorApi"
import { swap } from "formik"
import { UserCheck, UserX } from "lucide-react"
interface Visitor {
    _id: string
    name: string
    email: string
    contact: string
    purpose: string
    host: string
    checkIn: string
    checkOut?: string
    status: "Pending" | "Approved" | "Rejected"
    visitDate: string,
    createdAt: any,
    showModal: any
}
const PendingVisitor = () => {
    const [filteredVisitor, setFilteredVisitor] = useState<Visitor[]>([])
    const { data } = useGetAllVisitorsQuery(undefined)

    useEffect(() => {
        if (data) {
            const PendingVisitor = data.filter((v: any) => v.status === "Pending")
            setFilteredVisitor(PendingVisitor)
        }
    }, [data])
    useEffect(() => {
        console.log("Filtered pending visitors:", filteredVisitor);
    }, [filteredVisitor]);
    return <>

        <div>
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center gap-3">
                            <div className="text-sm text-gray-600">
                                <label htmlFor="my-drawer" className="cursor-pointer drawer-button rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                    <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                                </svg></label>
                            </div>
                            <h1
                                className="text-2xl font-bold text-gray-900"
                            >
                                Pending Visitors
                            </h1>
                        </div>
                        <div className="flex items-center gap-3">
                        </div>
                    </div>
                </div>
            </div>

            {
                filteredVisitor && <div className="hidden md:block overflow-x-auto">
                    <table className="table">
                        <thead className="table-header-group">
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>CheckIn</th>
                                <th>Host</th>
                                <th>Purpose</th>
                                <th>Status</th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredVisitor.map((pv: any) => <tr key={pv._id}>
                                    <td className="whitespace-nowrap text-sm font-mono text-gray-500">{pv._id.slice(-6)}</td>
                                    <td className="whitespace-nowrap text-sm font-mono text-gray-500">{pv.name}</td>
                                    <td className="whitespace-nowrap text-sm font-mono text-gray-500">{pv.email}</td>
                                    <td className="whitespace-nowrap text-sm font-mono text-gray-500">{pv.contact}</td>
                                    <td className="whitespace-nowrap text-sm font-mono text-gray-500">{pv.createdAt}</td>
                                    <td className="whitespace-nowrap text-sm font-mono text-gray-500">{pv.host}</td>
                                    <td className="whitespace-nowrap text-sm font-mono text-gray-500">{pv.purpose}</td>
                                    <td className="whitespace-nowrap text-sm font-mono text-gray-500">{pv.status}</td>
                                    <td className="whitespace-nowrap text-sm font-mono text-gray-500">
                                        <button className="btn btn-soft btn-success mx-1">Approve</button>
                                        <button className="btn btn-soft btn-error mx-1">Reject</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            }
            <div className="md:hidden divide-y divide-gray-300">
                {
                    filteredVisitor && filteredVisitor.map((v: any) => <div key={v._id} className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="font-semibold text-gray-900 text-base">{v.name}</h1>
                                <p className="text-sm text-gray-500 font-mono mt-1">Id:{v._id.slice(-6)}</p>
                            </div>
                            <span className="badge badge-soft badge-warning">{v.status}</span>

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
        </div>
    </>
}

export default PendingVisitor