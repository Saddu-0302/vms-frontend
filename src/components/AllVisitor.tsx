import { Download, FilterIcon, UserCheck, UserX } from "lucide-react"
import { useGetAllVisitorsQuery } from "../redux/visitorApi"
import MenuList from "./MenuList"
import { useEffect, useState } from "react"
import jsPDF from 'jspdf'
import autoTable from "jspdf-autotable"
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
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
const AllVisitor = () => {

    const [search, setSearch] = useState<string>()
    const [filterStatus, setFilterStatus] = useState<string>()
    const [selectDate, setSelectDate] = useState<string>('')
    const [filteredData, setFilteredData] = useState<Visitor[]>()
    const { data } = useGetAllVisitorsQuery(undefined)
    console.log(filteredData);

    useEffect(() => {
        const searchInput = search?.toLowerCase().trim()
        let filteredVisitor: Visitor[] = data
        if (searchInput) {
            filteredVisitor = data?.filter((v: any) =>
                v.name.toLowerCase().includes(searchInput)
            )
        }
        if (filterStatus) {
            filteredVisitor = data.filter((v: any) => v.status === filterStatus)
        }
        setFilteredData(filteredVisitor)
    }, [search, data, filterStatus])
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
    const openModal = () => {
        const modal = document.getElementById("my_modal_3") as HTMLDialogElement || null;
        if (modal) {
            modal.showModal()
        }
    }
    const filterData = data?.filter((v: any) => {
        if (!v.checkIn) return false;
        const checkInDateObj = new Date(v.checkIn);
        const checkInDate = checkInDateObj.toISOString().split('T')[0];
        return selectDate ? checkInDate === selectDate : true;
    })
    const exportToPDF = () => {
        const doc = new jsPDF();
        const fileLabel = selectDate || 'all';

        const dataToExport = (selectDate
            ? data?.filter((v: any) => {
                if (!v.checkIn) return false;
                const checkInDateObj = new Date(v.checkIn);
                const checkInDate = checkInDateObj.toISOString().split('T')[0];
                return checkInDate === selectDate;
            })
            : filteredData) || [];

        if (dataToExport.length === 0) {
            alert("No visitor data available to export.");
            return;
        }

        doc.text(`Visitor Report (${fileLabel})`, 14, 10);

        autoTable(doc, {
            startY: 20,
            head: [['Name', "Email", "Contact", "Status", "Host", "Purpose", "CheckIn"]],
            body: dataToExport.map((v: any) => [
                v.name,
                v.email,
                v.contact,
                v.status,
                v.host,
                v.purpose,
                new Date(v.createdAt).toLocaleString()
            ])
        });

        doc.save(`visitors_${fileLabel}.pdf`);
    };

    const exportToExcel = () => {
        const fileLabel = selectDate || 'all';

        const dataToExport = (selectDate
            ? data?.filter((v: any) => {
                if (!v.createdAt) return false;
                const createdDate = new Date(v.createdAt).toISOString().split('T')[0];
                return createdDate === selectDate;
            })
            : filteredData) || [];

        if (dataToExport.length === 0) {
            alert("No visitor data available to export.");
            return;
        }

        const formattedData = dataToExport.map((v: any) => ({
            Name: v.name,
            Email: v.email,
            Contact: v.contact,
            Status: v.status,
            Host: v.host,
            Purpose: v.purpose,
            'Created At': new Date(v.createdAt).toLocaleString() // ✅ use createdAt
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Visitors");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array"
        });
        const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(dataBlob, `visitors_${fileLabel}.xlsx`);
    };



    return <>
        <div className="min-h-screen mx-2">
            {/* header */}
            <div className="navbar bg-base-100 shadow-sm ">
                <div className="navbar-start">
                    <div className="flex items-center gap-3">
                        <div className="text-sm text-gray-600">
                            <label htmlFor="my-drawer" className="cursor-pointer drawer-button rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                            </svg></label>
                        </div>
                        <h1 className="lg:text-2xl md:text-2xl font-bold text-gray-900">Visitor Dashboard</h1>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="flex">
                        <input value={search || ""} onChange={(e) => setSearch(e.target.value)} className="input hidden lg:block" placeholder="Search" type="text" />
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn border-2 border-gray-300 ">
                                <FilterIcon className="w-4 h-4" />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><a onClick={() => setFilterStatus("")}>All Visitor</a></li>
                                <li><a onClick={() => setFilterStatus("Pending")}>Pending</a></li>
                                <li><a onClick={() => setFilterStatus("Approved")}>Approved</a></li>
                                <li><a onClick={() => setFilterStatus("Rejected")}>Rejected</a></li>
                                <li><input value={search || ""} onChange={(e) => setSearch(e.target.value)} className="input lg:hidden" placeholder="Search" type="text" /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-5 mx-4">
                <div className="text-start text-3xl font-semibold text-gray-400 ">
                    <h1>Visitors</h1>
                </div>
                <div>
                    <button onClick={openModal} className="btn">
                        <Download />
                    </button>
                </div>
            </div>
            {
                filteredData && <div className="hidden lg:block md:block overflow-x-auto mt-5">
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
                                <th className="px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">CheckIn</th>
                                <th className="px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredData?.map((visitor: any) => <tr key={visitor._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{visitor._id.slice(-6)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{visitor.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{visitor.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{visitor.contact}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{visitor.host}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{visitor.purpose}</td>
                                    <td className={statusBadge(visitor.status)}>
                                        {visitor.status}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(visitor.createdAt).toLocaleTimeString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                                        {
                                            visitor.status == "Pending"
                                                ? <div className="flex gap-2">

                                                    <button className="btn btn-soft btn-success btn-sm">
                                                        <UserCheck className="w-4 h-4" />
                                                        Approve
                                                    </button>

                                                    <button className="btn btn-soft btn-error btn-sm">
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
                    filteredData && filteredData.map((v: any) => <div key={v._id} className="p-6">
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


            {/* download modal */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box w-72">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                        <div className="mt-5">
                            <div className="">
                                <label className="text-lg font-semibold text-gray-500">Select Date</label>
                                <input
                                    value={selectDate || ""}
                                    onChange={(e) => setSelectDate(e.target.value)} type="date" className="input  border-gray-500" />
                            </div>
                            <div className="mt-5 ">
                                <button onClick={exportToPDF} className="btn btn-soft btn-primary rounded-l-full"> Word pdf</button>
                                <button onClick={exportToExcel} className="btn btn-soft btn-success rounded-r-full"> Excel pdf</button>
                            </div>
                        </div>
                    </form>

                </div>
            </dialog>
        </div >

    </>
}

export default AllVisitor