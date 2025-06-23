import { UserCheck, Building2, Phone, Mail, User, FileText, Target } from "lucide-react"
import { useFormik } from "formik"
import * as yup from 'yup'
import { useAddVisitorMutation } from "../redux/visitorApi"
import { useEffect } from "react"

// interface VisitorFormData {
//     name: string
//     email: string
//     contact: string
//     host: string
//     purpose: string
//     idProof: string
// }

const CreateVisitor = () => {
    const [addVisitor, { isSuccess, isLoading }] = useAddVisitorMutation()
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            contact: "",
            host: "",
            purpose: "",
            idProof: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter Full Name"),
            email: yup.string().email().required("Enter Valid Email"),
            contact: yup.string().length(10).required("Enter Contact Number"),
            host: yup.string().required("Enter Host Name"),
            purpose: yup.string().required("Enter Purpose"),
            idProof: yup.string().required("Attach IdProof")
        }),
        onSubmit: (values, { resetForm }) => {
            addVisitor(values)
            resetForm()
        }
    })
    useEffect(() => {
        if (isSuccess) {
            alert("Visitor Created Successfull")
        }
    }, [isSuccess])
    return <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 flex items-center justify-center">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg">
                        <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Visitor Registration</h1>
                    <p className="text-gray-600 mb-4">Please fill out the form below to register your visit</p>
                </div>

                {/* Main Form Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    {/* Card Header */}
                    <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                        <h2 className="text-xl font-semibold text-gray-800">Visitor Information</h2>
                        <p className="text-gray-600 text-sm mt-1">All fields are required for security and tracking purposes</p>
                    </div>

                    {/* Card Content */}
                    <div className="px-8 py-8">
                        <form onSubmit={formik.handleSubmit} className="space-y-8">
                            {/* Personal Information Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <User className="w-5 h-5 text-blue-600" />
                                    <h3 className="font-semibold text-gray-800 text-lg">Personal Details</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            {...formik.getFieldProps("name")}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                                            required
                                        />
                                        {
                                            formik.touched.name && formik.errors.name && <span className="text-red-400">{formik.errors.name}</span>
                                        }
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className=" text-sm font-medium text-gray-700 flex items-center gap-1">
                                            <Mail className="w-3 h-3" />
                                            Email Address *
                                        </label>
                                        <input
                                            {...formik.getFieldProps("email")}
                                            type="email"
                                            placeholder="your.email@example.com"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                                            required
                                        />
                                        {
                                            formik.touched.email && formik.errors.email &&
                                            <span className="text-red-400">{formik.errors.email}</span>
                                        }
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="contact"
                                            className="text-sm font-medium text-gray-700 flex items-center gap-1"
                                        >
                                            <Phone className="w-3 h-3" />
                                            Contact Number *
                                        </label>
                                        <input
                                            {...formik.getFieldProps("contact")}
                                            type="tel"
                                            placeholder="+1 (555) 123-4567"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                                            required
                                        />
                                        {
                                            formik.touched.contact && formik.errors.contact &&
                                            <span className="text-red-400 ">{formik.errors.contact}</span>
                                        }
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="idProof"
                                            className=" text-sm font-medium text-gray-700 flex items-center gap-1"
                                        >
                                            <FileText className="w-3 h-3" />
                                            ID Proof Type *
                                        </label>
                                        <input
                                            {...formik.getFieldProps("idProof")}
                                            type="file"
                                            placeholder="+1 (555) 123-4567"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                                            required
                                        />
                                        {
                                            formik.touched.idProof && formik.errors.idProof &&
                                            <span className="text-red-400">{formik.errors.idProof}</span>
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Visit Information Section */}
                            <div className="space-y-6 pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <Target className="w-5 h-5 text-blue-600" />
                                    <h3 className="font-semibold text-gray-800 text-lg">Visit Details</h3>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="host" className="block text-sm font-medium text-gray-700">
                                        Host Name *
                                    </label>
                                    <input
                                        {...formik.getFieldProps("host")}
                                        type="text"
                                        placeholder="Name of person you're visiting"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                                        required
                                    />
                                    {
                                        formik.touched.host && formik.errors.host &&
                                        <span className="text-red-400">{formik.errors.host}</span>
                                    }
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
                                        Purpose of Visit *
                                    </label>
                                    <textarea
                                        {...formik.getFieldProps("purpose")}
                                        placeholder="Please describe the purpose of your visit (e.g., business meeting, interview, delivery, etc.)"
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white resize-none"
                                        required
                                    />
                                    {
                                        formik.touched.purpose && formik.errors.purpose &&
                                        <span className="text-red-400 ">{formik.errors.purpose}</span>
                                    }
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6 border-t border-gray-100">
                                <button
                                    type="submit"
                                    className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium text-base rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Processing ...
                                        </>
                                    ) : (
                                        <>
                                            <UserCheck className="w-4 h-4" />
                                            Create Visitor
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-gray-500 text-center mt-4">
                                    By submitting this form, you agree to our visitor policies and security protocols.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6 text-sm text-gray-500">
                    <p>Need assistance? Contact security at ext. 1234</p>
                </div>
            </div>
        </div>
    </>
}

export default CreateVisitor