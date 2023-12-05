import { XCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminPage() {
	const [loading, setLoading] = useState(false);
	const [hosts, setHosts] = useState();

	const getHosts = async () => {
		setLoading(true);

		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const { data } = await axios.get("http://127.0.0.1:5000/hosts", config);
			console.log(data);
			setHosts(data.hosts);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		getHosts();
	}, []);

	if (loading) return <span className="loading loading-ring loading-lg"></span>;

	return (
		<div className="flex flex-col gap-1 ">
			<div className="p-4 flex justify-between bg-gray-200 ">
				<div className="uppercase text-gray-700 text-2xl tracking-tight font-extrabold pl-4">
					Hosts Dashboard
				</div>
				<Link to="/signup">
					<button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
						Create Host
					</button>
				</Link>
			</div>
			<div className="flex justify-center mt-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1444px] ">
					{hosts &&
						hosts.map((host) => (
							<Link
								className="  bg-gray-50 border-gray-100 border shadow-md rounded-md w-72 p-4 flex flex-col  "
								to="/host"
							>
								<div className="flex justify-between">
									<div className="font-bold text-gray-700 tracking-tight">
										{host.name}
									</div>
									<XCircleIcon className="w-6 h-6 cursor-pointer" />
								</div>
								<div className="text-gray-500 text-sm">{host.email}</div>
							</Link>
						))}
				</div>
			</div>
		</div>
	);
}
export default AdminPage;
