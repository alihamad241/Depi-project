import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {login, loading }=useUserStore()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        login(email, password);
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
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
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
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
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
                                        <LogIn
                                            className="mr-2 h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        Login
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-gray-400">
                            Not a member?{" "}
                            <Link
                                to="/signup"
                                className="font-medium text-emerald-400 hover:text-emerald-300">
                                Sign up now{" "}
                                <ArrowRight className="inline h-4 w-4" />
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default LoginPage;
