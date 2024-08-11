"use client";
import { postRequest } from "@/lib/api/requestHelpers";
import { AxiosResponse } from "axios";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

type Values = {
	password: string;
	email: string;
};

type SignupRes = {
	data: string;
	status: number;
};

function LoginForm() {
	const [res, setRes] = useState<SignupRes | AxiosResponse<any, any> | null>();

	const SignupSchema = Yup.object().shape({
		email: Yup.string()
			.email("Invalid email")
			.required("The email field is required."),
		password: Yup.string()
			.min(6, "Password needs to be longer.")
			.required("The password field is required."),
	});

	useEffect(() => {
		if (res?.status === 200) {
			// store access token then re-direct
			localStorage.setItem("access", res?.data.access_token);
		}
	}, [res]);

	return (
		<Formik
			initialValues={{
				email: "",
				password: "",
			}}
			validationSchema={SignupSchema}
			onSubmit={async (
				values: Values,
				{ setSubmitting }: FormikHelpers<Values>,
			) => {
				const res = await postRequest<SignupRes>("/user/login", values);
				console.log("res:", res);

				setRes(res);
			}}
		>
			{({ errors, touched }) => (
				<Form className="flex flex-col justify-center">
					<div className="text-gray-700 text-lg font-semibold">Login</div>

					<label htmlFor="email" className="my-2">
						Email
					</label>
					<Field
						className="border border-black px-2 py-1 rounded"
						id="email"
						name="email"
						placeholder="Enter Email"
						type="email"
					/>

					{errors.email && touched.email ? (
						<div className="mt-2 text-red-600">{errors.email}</div>
					) : null}

					<label htmlFor="password" className="my-2">
						Password
					</label>
					<Field
						className="border border-black px-2 py-1 rounded"
						id="password"
						name="password"
						placeholder="Enter Password"
						type="password"
					/>

					{errors.password && touched.password ? (
						<div className="mt-2 text-red-600">{errors.password}</div>
					) : null}

					{/* Sign Up Results */}
					<div className="mt-3">
						{res?.data && res?.status === 200 ? (
							<div className="text-green-600">
								You have successfully logged in.
							</div>
						) : res?.status === 400 ? (
							<div className="text-red-600">Error with login</div>
						) : (
							<div className="text-red-600">
								Something went wrong with your request.
							</div>
						)}
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="rounded border text-white bg-gray-700 hover:bg-gray-300 p-2 mt-8 hover:text-gray-500 transition"
					>
						Submit
					</button>
				</Form>
			)}
		</Formik>
	);
}

export default LoginForm;
