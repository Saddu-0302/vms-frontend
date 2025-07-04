import { useFormik } from "formik"
import * as yup from 'yup'
import { Chrome, Lock, Mail } from "lucide-react"
import { useLoginMutation } from "../redux/userApi"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Login = () => {
    const navigate = useNavigate();
    const [login, { isSuccess, isLoading, isError }] = useLoginMutation()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            email: yup.string().email().required("Enter Valid Email"),
            password: yup.string().required("Enter Valid Password")
        }),
        onSubmit: (values, { resetForm }) => {
            login(values)
            resetForm()
        }
    })

    useEffect(() => {
        if (isSuccess) {
            navigate("/visitors")
            toast.success("Login Success")
        }
        if (isError) {
            toast.error("Enter Valid Email and Password")
        }
    }, [isSuccess, isError])
    return <>
        <div className="min-h-screen -mx-5">
            {/* Background Pattern */}
            <div className="relative flex items-center justify-center">
                <div className="w-full max-w-md">
                    {/* Main Card */}
                    <div className="card bg-white shadow-2xl border border-gray-100">
                        <div className="">
                            {/* Header */}
                            <div className="text-start mb-8">
                                <h1 className="text-2xl font-bold">Sign In</h1>
                                <p className="text-gray-600">Sign in to your account to continue</p>
                            </div>
                            {/* Login Form */}
                            <form onSubmit={formik.handleSubmit} className="space-y-6">
                                {/* Email Field */}
                                <div className="text-start">
                                    <span className="font-medium text-start text-gray-700">Email Address</span>
                                    <div className="relative">
                                        <input
                                            {...formik.getFieldProps("email")}
                                            type="email"
                                            placeholder="Enter your email"
                                            className="input input-bordered w-full focus:input-primary pl-8"
                                            required
                                        />
                                        <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    </div>
                                    {
                                        formik.touched.email && formik.errors.email &&
                                        <div className="text-red-500 mt-2">{formik.errors.email}</div>
                                    }
                                </div>

                                {/* Password Field */}
                                <div className="text-start">
                                    <span className="label-text font-medium text-gray-700">Password</span>
                                    <div className="relative">
                                        <input
                                            {...formik.getFieldProps("password")}
                                            type="password"
                                            placeholder="Enter your password"
                                            className="input input-bordered w-full pl-8 focus:input-primary"
                                            required
                                        />
                                        <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    </div>
                                    {
                                        formik.touched.password && formik.errors.password &&
                                        <div className="text-red-500 mt-2">{formik.errors.password}</div>
                                    }
                                </div>


                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <label className="label cursor-pointer">
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                                        <span className="label-text ">Remember me</span>
                                    </label>
                                    <a href="#" className="link link-primary text-sm">
                                        Forgot password?
                                    </a>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className={`btn bg-gradient-to-r from-blue-500 to-purple-500 text-white btn-block ${isLoading ? "loading" : ""}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Signing in..." : "Sign In"}
                                </button>

                                {/* Divider */}
                                <div className="divider text-gray-400">or sign in with google</div>
                                {/* Social Login Buttons */}
                                <div className="space-y-3 mb-6">
                                    <button className="btn btn-outline btn-block">
                                        <Chrome className="w-5 h-5" />
                                        Continue with Google
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* Footer */}
                    <div className="text-center mt-8 text-gray-500 text-sm">
                        <p>© 2024 Your Company. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Login