import { motion } from "framer-motion";
import { Trash, Star, Edit } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

	return (
		<motion.div
			className='max-w-7xl mx-auto'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
		>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
				{products?.map((product, index) => (
					<motion.div
						key={product._id}
						className='bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-emerald-700/50'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
					>
						<div className='relative'>
							<img
								className='h-56 w-full object-cover'
								src={product.image}
								alt={product.name}
							/>
							<div className='absolute top-2 right-2 flex space-x-2'>
								<button
									onClick={() => toggleFeaturedProduct(product._id)}
									className={`p-2 rounded-full transition-colors duration-200 ${product.isFeatured
										? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
										: "bg-gray-900/50 text-white hover:bg-gray-700"
									}`}
								>
									<Star className='h-5 w-5' />
								</button>
							</div>
						</div>
						<div className='p-4'>
							<h3 className='text-lg font-semibold text-white truncate'>{product.name}</h3>
							<p className='text-sm text-gray-400 mt-1'>{product.category}</p>
							<div className='flex justify-between items-center mt-4'>
								<p className='text-xl font-bold text-emerald-400'>${product.price.toFixed(2)}</p>
								<div className='flex space-x-2'>
									<button className='text-blue-400 hover:text-blue-300'>
										<Edit className='h-5 w-5' />
									</button>
									<button
										onClick={() => deleteProduct(product._id)}
										className='text-red-400 hover:text-red-300'
									>
										<Trash className='h-5 w-5' />
									</button>
								</div>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
};
export default ProductsList;
