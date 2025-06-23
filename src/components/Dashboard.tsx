"use client"

import { useState, useEffect, useMemo } from "react"
import { Users, Search, TrendingUp, Eye, Phone, Shield, UserCheck, ShieldCheck, PersonStandingIcon, UserPlus } from "lucide-react"
import MenuList from "./MenuList"
import { useGetAllVisitorsQuery } from "../redux/visitorApi"
import CreateVisitor from "./CreateVisitor"


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



// Mock chart data
const chartData = [
    { day: "Mon", visitors: 12, approved: 10, rejected: 2 },
    { day: "Tue", visitors: 19, approved: 15, rejected: 4 },
    { day: "Wed", visitors: 15, approved: 12, rejected: 3 },
    { day: "Thu", visitors: 22, approved: 18, rejected: 4 },
    { day: "Fri", visitors: 28, approved: 24, rejected: 4 },
    { day: "Sat", visitors: 8, approved: 7, rejected: 1 },
    { day: "Sun", visitors: 5, approved: 4, rejected: 1 },
]

const VisitorDashboard = () => {
    const { data } = useGetAllVisitorsQuery(undefined)
    const [search, setSearch] = useState<string>("")
    const [filteredVisitors, setFilteredVisitors] = useState<Visitor[]>([])

    const visitor: Visitor[] = Array.isArray(data) ? data : [];
    const Approved =
        data?.filter((approved: any) => approved.status === "Approved") || []
    const Pending =
        data?.filter((pending: any) => pending.status === "Pending") || []

    const Rejected = data?.filter((reject: any) => reject.status === "Rejected") || []
    const visitorData = [
        {
            icon: Users,
            name: "All Visitor",
            count: data?.length || 0,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
        },
        {
            icon: Shield,
            name: "Approved",
            count: Approved?.length || 0,
            color: "text-green-600",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",

        },
        {
            icon: UserCheck,
            name: "Pending",
            count: Pending?.length || 0,
            color: "text-yellow-600",
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-200",
        },
        {
            icon: ShieldCheck,
            name: "Rejected",
            count: Rejected?.length || 0,
            color: "text-red-600",
            bgColor: "bg-red-50",
            borderColor: "border-red-200",

        },
    ]
    const today = new Date().toISOString().split("T")[0]
    const todaysVisitor = useMemo(() => {
        return visitor?.filter((visitor: any) => {
            const visitorDate = new Date(visitor.createdAt).toISOString().split("T")[0];
            return visitorDate === today
        })
    }, [visitor])

    useEffect(() => {
        const inputSearch = search?.toLowerCase().trim()
        if (inputSearch) {
            const filtered = todaysVisitor.filter((v: Visitor) =>
                v.name.toLowerCase().includes(inputSearch));
            setFilteredVisitors(filtered)
        } else {
            setFilteredVisitors(todaysVisitor)
        }
    }, [search, todaysVisitor])
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Approved":
                return "bg-green-100 text-green-800 hover:bg-green-200"
            case "Pending":
                return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            case "Rejected":
                return "bg-red-100 text-red-800 hover:bg-red-200"
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }
    }

    const maxVisitors = Math.max(...chartData.map((d) => d.visitors))
    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header */}
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
                                    onClick={() => {
                                        (document.getElementById('my_modal_3') as HTMLInputElement).showModal()
                                    }}
                                >
                                    <UserPlus className="w-4 h-4" /> Add Visitor
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                    {visitorData &&
                        visitorData.map((visitor: any, index: number) => {
                            const IconComponent = visitor.icon
                            return (
                                <div
                                    key={index + 1}
                                    className={`bg-white rounded-lg border-l-4 ${visitor.borderColor} shadow-sm hover:shadow-md transition-shadow duration-200`}
                                >
                                    <div className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">{visitor.name}</p>
                                                <p className="text-3xl font-bold text-gray-900 mt-2">{visitor.count}</p>
                                            </div>
                                            <div className={`${visitor.bgColor} p-3 rounded-full`}>
                                                <IconComponent className={`w-6 h-6 ${visitor.color}`} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>

                {/* Chart Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5" />
                            Weekly Visitor Trends
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="h-64 flex items-end justify-between gap-4 px-4">
                            {chartData.map((data, index) => (
                                <div key={index} className="flex flex-col items-center flex-1">
                                    <div className="w-full flex justify-center gap-1 mb-2">
                                        {/* Approved bar */}
                                        <div className="flex flex-col items-center flex-1">
                                            <div
                                                className="w-full bg-green-500 rounded-t-sm transition-all duration-300 hover:bg-green-600 cursor-pointer"
                                                style={{
                                                    height: `${(data.approved / maxVisitors) * 200}px`,
                                                    minHeight: data.approved > 0 ? "8px" : "0px",
                                                }}
                                                title={`Approved: ${data.approved}`}
                                            />
                                            <div className="text-xs text-green-600 font-medium mt-1">{data.approved}</div>
                                        </div>
                                        {/* Rejected bar */}
                                        <div className="flex flex-col items-center flex-1">
                                            <div
                                                className="w-full bg-red-500 rounded-t-sm transition-all duration-300 hover:bg-red-600 cursor-pointer"
                                                style={{
                                                    height: `${(data.rejected / maxVisitors) * 200}px`,
                                                    minHeight: data.rejected > 0 ? "8px" : "0px",
                                                }}
                                                title={`Rejected: ${data.rejected}`}
                                            />
                                            <div className="text-xs text-red-600 font-medium mt-1">{data.rejected}</div>
                                        </div>
                                    </div>
                                    <div className="text-xs font-medium text-gray-600 mt-2">{data.day}</div>
                                    <div className="text-xs text-gray-500">Total: {data.visitors}</div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center gap-6 mt-4 pt-4 border-t">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded"></div>
                                <span className="text-sm text-gray-600">Approved</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded"></div>
                                <span className="text-sm text-gray-600">Rejected</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Today's Visitors Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <Eye className="w-5 h-5" />
                                Today's Visitors
                                {/* ({filteredVisitors.length}) */}
                            </h2>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64 text-sm"
                                    placeholder="Search visitors..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Desktop Table */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Visitor
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Purpose
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Host
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Check In
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Check Out
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredVisitors.map((visitor) => (
                                        <tr key={visitor._id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{visitor.name}</div>
                                                    <div className="text-sm text-gray-500">{visitor.email}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{visitor.purpose}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{visitor.host}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(visitor.createdAt).toLocaleTimeString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{visitor.checkOut || "-"}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(visitor.status)}`}
                                                >
                                                    {visitor.status.charAt(0).toUpperCase() + visitor.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    {visitor.status === "Pending" && (
                                                        <>
                                                            <button className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-md text-xs font-medium transition-colors duration-150">
                                                                Approve
                                                            </button>
                                                            <button className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-xs font-medium transition-colors duration-150">
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile/Tablet Cards */}
                        <div className="lg:hidden space-y-4">
                            {filteredVisitors.map((visitor) => (
                                <div key={visitor._id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{visitor.name}</h3>
                                            <p className="text-sm text-gray-500">{visitor.email}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(visitor.status)}`}>
                                            {visitor.status.charAt(0).toUpperCase() + visitor.status.slice(1)}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                                        <div className="flex items-center text-gray-600">
                                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                            <span className="font-medium">Phone:</span>
                                            <span className="ml-1">{visitor.contact}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <span className="font-medium">Purpose:</span>
                                            <span className="ml-1">{visitor.purpose}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <span className="font-medium">Host:</span>
                                            <span className="ml-1">{visitor.host}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <span className="font-medium">Check In:</span>
                                            <span className="ml-1">{new Date(visitor.createdAt).toLocaleTimeString()}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <span className="font-medium">Check Out:</span>
                                            <span className="ml-1">{visitor.checkOut || "Not checked out"}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        {visitor.status === "Pending" && (
                                            <>
                                                <button className="flex-1 bg-green-100 text-green-700 hover:bg-green-200 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-150">
                                                    Approve
                                                </button>
                                                <button className="flex-1 bg-red-100 text-red-700 hover:bg-red-200 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-150">
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        <button
                                            className={`${visitor.status === "Pending" ? "" : "flex-1"} bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-150`}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredVisitors.length === 0 && (
                            <div className="text-center py-12">
                                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No visitors found</h3>
                                <p className="text-gray-500">
                                    {/* {
                                        // searchTerm ?
                                        "Try adjusting your search criteria." 
                                        : "No visitors scheduled for today."} */}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
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

            {/* add visitor modal */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <CreateVisitor />
                </div>
            </dialog>
        </div>
    )
}

export default VisitorDashboard
