import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";

const AnalyticsTab = () => {
	const [analyticsData, setAnalyticsData] = useState({
		users: 0,
		products: 0,
		totalSales: 0,
		totalRevenue: 0,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [dailySalesData, setDailySalesData] = useState([]);

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const response = await axios.get("/analytics");
				setAnalyticsData(response.data.analyticsData);
				setDailySalesData(response.data.dailySalesData);
			} catch (error) {
				console.error("Error fetching analytics data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAnalyticsData();
	}, []);

	if (isLoading) {
		return <div className="text-center text-white">Loading...</div>;
	}

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
				<AnalyticsCard
					title='Total Users'
					value={analyticsData.users.toLocaleString()}
					icon={Users}
					color='from-blue-500 to-blue-700'
				/>
				<AnalyticsCard
					title='Total Products'
					value={analyticsData.products.toLocaleString()}
					icon={Package}
					color='from-green-500 to-green-700'
				/>
				<AnalyticsCard
					title='Total Sales'
					value={analyticsData.totalSales.toLocaleString()}
					icon={ShoppingCart}
					color='from-yellow-500 to-yellow-700'
				/>
				<AnalyticsCard
					title='Total Revenue'
					value={`$${analyticsData.totalRevenue.toLocaleString()}`}
					icon={DollarSign}
					color='from-red-500 to-red-700'
				/>
			</div>
			<motion.div
				className='bg-gray-800/60 rounded-lg p-6 shadow-lg border border-emerald-700/50'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.25 }}
			>
                <h3 className="text-xl font-semibold text-white mb-4">Daily Sales and Revenue</h3>
				<ResponsiveContainer width='100%' height={400}>
					<AreaChart data={dailySalesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
						<defs>
							<linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
								<stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
							</linearGradient>
							<linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
								<stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray='3 3' stroke="#4A5568" />
						<XAxis dataKey='name' stroke='#D1D5DB' />
						<YAxis yAxisId='left' stroke='#D1D5DB' />
						<Tooltip 
                            contentStyle={{ 
                                backgroundColor: '#1F2937', 
                                border: '1px solid #4A5568',
                                color: '#D1D5DB'
                            }} 
                        />
						<Legend />
                        <Area yAxisId="left" type="monotone" dataKey="sales" stroke="#10B981" fillOpacity={1} fill="url(#colorSales)" name="Sales" />
						<Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
					</AreaChart>
				</ResponsiveContainer>
			</motion.div>
		</div>
	);
};
export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
	<motion.div
		className={`bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden relative border border-emerald-700/50`}
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
        <div className={`absolute top-0 left-0 h-full w-1 bg-gradient-to-b ${color}`} />
		<div className='flex justify-between items-center'>
			<div className='z-10'>
				<p className='text-gray-300 text-sm mb-1 font-semibold'>{title}</p>
				<h3 className='text-white text-3xl font-bold'>{value}</h3>
			</div>
            <div className={`p-3 rounded-full bg-gradient-to-br ${color}`}>
			    <Icon className='h-6 w-6 text-white' />
            </div>
		</div>
	</motion.div>
);