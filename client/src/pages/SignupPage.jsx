import { UserCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function SignupPage () {
	const [name, setName] = useState( "" );
	const [email, setEmail] = useState( "" );
	const [password, setPassword] = useState( "" );
	const [confirmPassword, setConfirmPassword] = useState( "" );

	const navigate = useNavigate();

	const signup = async ( e ) => {
		e.preventDefault();

		if ( password !== confirmPassword ) {
			alert( "Passwords do not match" );
			return;

		}
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const { data } = await axios.post(
				"http://localhost:5000/hosts",
				{ name, email, password },
				config
			);
			console.log( data );
			localStorage.setItem( "hostInfo", JSON.stringify( data ) );
			navigate( "/host" );
		} catch ( error ) {
			console.log( error );
		}


	};
	return (
		<div className="h-screen w-screen">
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<UserCircleIcon
						className="mx-auto h-12 w-auto text-black"
						aria-hidden="true"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Create your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" action="#" method="POST">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Name
							</label>
							<div className="mt-2">
								<input
									id="name"
									name="name"
									type="text"
									value={name}
									onChange={( e ) => setName( e.target.value )}
									autoComplete="name"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									value={email}
									onChange={( e ) => setEmail( e.target.value )}
									autoComplete="email"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									value={password}
									onChange={( e ) => setPassword( e.target.value )}
									autoComplete="current-password"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="confirmPassword"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Confirm Password
								</label>
							</div>
							<div className="mt-2">
								<input
									id="confirmPassword"
									name="confirmPassword"
									type="password"
									value={confirmPassword}
									onChange={( e ) => setConfirmPassword( e.target.value )}
									autoComplete="current-confirmPassword"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
								onClick={signup}
							>
								Sign up
							</button>
						</div>
					</form>
					<p className="mt-10 text-center text-sm text-gray-500">
						Already have an account?{" "}
						<Link
							to="/login"
							className="font-semibold leading-6 text-gray-600 hover:text-gray-500"
						>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
export default SignupPage;
