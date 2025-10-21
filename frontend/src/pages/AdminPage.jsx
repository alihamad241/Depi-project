import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductsForm";
import ProductsList from "../components/ProductsList";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
	{ id: "create", label: "Create Product", icon: PlusCircle },
	{ id: "products", label: "Products", icon: ShoppingBasket },
	{ id: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("create");
	const { fetchAllProducts } = useProductStore();

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	return (
		<div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-emerald-900/20" />
			<div className='relative z-10 container mx-auto px-4 py-12 sm:py-16'>
				<motion.h1
					className='text-4xl sm:text-5xl font-bold mb-10 text-emerald-400 text-center tracking-tight'
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
				>
					Admin Dashboard
				</motion.h1>

				<div className='flex justify-center mb-10 bg-gray-800/50 rounded-lg p-2 max-w-md mx-auto border border-emerald-700/30'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`relative flex items-center justify-center w-full px-4 py-2.5 mx-1 rounded-md transition-colors duration-300 ${activeTab === tab.id ? "text-white" : "text-gray-400 hover:text-white"}`}>
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-emerald-600 rounded-md"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
							<tab.icon className='mr-2 h-5 w-5 z-10' />
							<span className="z-10">{tab.label}</span>
						</button>
					))}
				</div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
				        {activeTab === "create" && <CreateProductForm />}
				        {activeTab === "products" && <ProductsList />}
				        {activeTab === "analytics" && <AnalyticsTab />}
                    </motion.div>
                </AnimatePresence>
			</div>
		</div>
	);
};
export default AdminPage;
