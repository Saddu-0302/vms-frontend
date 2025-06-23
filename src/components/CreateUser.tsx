import { useFormik } from "formik"
import * as yup from "yup"
import { useEffect } from "react"
import { User, Mail, Phone, Shield, Lock, UserPlus, Loader2 } from "lucide-react"
import { useAddUserMutation } from "../redux/userApi"


const CreateUser = () => {
    const [addUser, { isSuccess, isLoading, isError }] = useAddUserMutation()

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            contact: "",
            role: "",
            password: "",
        },
        validationSchema: yup.object({
            first_name: yup.string().required("Enter First Name"),
            last_name: yup.string().required("Enter Last Name"),
            email: yup.string().email().required("Enter Valid Email"),
            contact: yup.string().min(10).max(10).required("Enter Contact Number"),
            role: yup.string().required("Enter Role"),
            password: yup.string().min(6).required("Password must be at least 6 characters"),
        }),
        onSubmit: (values, { resetForm }) => {
            addUser(values)
            resetForm()
        },
    })

    useEffect(() => {
        if (isSuccess) {
            alert("User Created Successfully")
        }
        if (isError) {
            alert(`Something Went Wrong`)
        }
    }, [isSuccess, isError])

    return (
        <div className=" bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center  ">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl">
                {/* Header */}
                <div className="text-center mb-4 sm:mb-6 lg:mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-3 sm:mb-4">
                        <UserPlus className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                        Create New User
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 px-4 sm:px-0">
                        Fill in the details to add a new team member
                    </p>
                </div>

                {/* Form Card */}
                <div
                // className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden mx-2 sm:mx-0"
                >
                    <div className="p-4 sm:p-6 lg:p-8">
                        <form onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
                            {/* Name Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500" />
                                        First Name
                                    </label>
                                    <input
                                        {...formik.getFieldProps("first_name")}
                                        type="text"
                                        placeholder="Enter first name"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 "
                                    />
                                    {formik.touched.first_name && formik.errors.first_name && (
                                        <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                                            <span className="w-1 h-1 bg-red-500 rounded-full mr-2 flex-shrink-0"></span>
                                            <span className="break-words">{formik.errors.first_name}</span>
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500" />
                                        Last Name
                                    </label>
                                    <input
                                        {...formik.getFieldProps("last_name")}
                                        type="text"
                                        placeholder="Enter last name"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                    {formik.touched.last_name && formik.errors.last_name && (
                                        <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                                            <span className="w-1 h-1 bg-red-500 rounded-full mr-2 flex-shrink-0"></span>
                                            <span className="break-words">{formik.errors.last_name}</span>
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500" />
                                    Email Address
                                </label>
                                <input
                                    {...formik.getFieldProps("email")}
                                    type="email"
                                    placeholder="example@company.com"
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                                        <span className="w-1 h-1 bg-red-500 rounded-full mr-2 flex-shrink-0"></span>
                                        <span className="break-words">{formik.errors.email}</span>
                                    </p>
                                )}
                            </div>

                            {/* Contact and Role Fields */}
                            <div className="">
                                <div className="space-y-2">
                                    <label className="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500" />
                                        Contact Number
                                    </label>
                                    <input
                                        {...formik.getFieldProps("contact")}
                                        type="tel"
                                        placeholder="1234567890"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                    {formik.touched.contact && formik.errors.contact && (
                                        <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                                            <span className="w-1 h-1 bg-red-500 rounded-full mr-2 flex-shrink-0"></span>
                                            <span className="break-words">{formik.errors.contact}</span>
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Role Field */}
                            <div className="space-y-2">
                                <label className="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500" />
                                    Role
                                </label>
                                <select
                                    {...formik.getFieldProps("role")}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                                >
                                    <option value="" disabled>
                                        Select Role
                                    </option>
                                    <option value="admin">Admin</option>
                                    <option value="hr">HR</option>
                                    <option value="guard">Guard</option>
                                </select>
                                {formik.touched.role && formik.errors.role && (
                                    <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                                        <span className="w-1 h-1 bg-red-500 rounded-full mr-2 flex-shrink-0"></span>
                                        <span className="break-words">{formik.errors.role}</span>
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="flex items-center text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                    <Lock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500" />
                                    Password
                                </label>
                                <input
                                    {...formik.getFieldProps("password")}
                                    type="password"
                                    placeholder="Enter secure password"
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                                        <span className="w-1 h-1 bg-red-500 rounded-full mr-2 flex-shrink-0"></span>
                                        <span className="break-words">{formik.errors.password}</span>
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2 sm:pt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium sm:font-semibold py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 touch-manipulation"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                            <span>Creating User...</span>
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span>Create User</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-t border-gray-100">
                        <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">
                            Make sure all information is accurate before creating the user account.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CreateUser;
