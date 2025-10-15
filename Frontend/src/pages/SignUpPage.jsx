import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";

const SignUpPage = () => {
    const loading = false;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    return (
        <>
            {/* motion div */}
            <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <motion.div
                    className="sm:mx-auto sm:w-full sm:max-w-md"
                    initial={{ opacity: 0, y: -20 }} //-20 :: coming from the top -->distance between top and the element
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">
                        Create your account
                    </h2>
                </motion.div>
                <motion.div
                    className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
                    initial={{ opacity: 0, y: 20 }} //coming from the bottom --> +ve value
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }} //delay to make it appear after the heading
                >
                    <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                {/* htmlFor-->means: associates the label with the input whose id is name*/}
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-300">
                                    Full name
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    {/* User icon */}
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="block w-full pl-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-200"
                                        placeholder="Full name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                {/* htmlFor-->means: associates the label with the input whose id is name*/}
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-300">
                                    Email address
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    {/* User icon */}
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="block w-full pl-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-200"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                {/* htmlFor-->means: associates the label with the input whose id is name*/}
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    {/* User icon */}
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="block w-full pl-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-200"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                {/* htmlFor-->means: associates the label with the input whose id is name*/}
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-300">
                                    Confirm Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    {/* User icon */}
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <input
                                        type="password"
                                        name="confirmpassword"
                                        id="confirmpassword"
                                        className="block w-full pl-10 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-200"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm dont-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
                                disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader
                                            className="animate-spin h-5 w-5 mr-2"
                                            aria-hidden="true"
                                        />
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus
                                            className="mr-2 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        Sign Up
                                    </>
                                )}
                            </button>
                        </form>

                        <p className='mt-8 text-center text-sm text-gray-400'>
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-emerald-400 hover:text-emerald-300">
                                Login here <ArrowRight className='inline h-4 w-4' />
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default SignUpPage;
