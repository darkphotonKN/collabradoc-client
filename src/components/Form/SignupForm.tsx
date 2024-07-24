import { postRequest } from "@/lib/api/requestHelpers";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import * as Yup from "yup";

type Values = {
	name: string;
	password: string;
	email: string;
};

function SignupForm() {
	const [res, setRes] = useState();

	const SignupSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, "Name needs to be at least 2 characters long.")
			.max(50, "Name can't be longer than 2 characters long.")
			.required("The name field is required."),
		email: Yup.string()
			.email("Invalid email")
			.required("The email field is required."),
		password: Yup.string()
			.min(6, "Password needs to be longer.")
			.required("The password field is required."),
	});

	return (
		<Formik
			initialValues={{
				name: "",
				email: "",
				password: "",
			}}
			validationSchema={SignupSchema}
			onSubmit={async (
				values: Values,
				{ setSubmitting }: FormikHelpers<Values>,
			) => {
				const res = await postRequest("/user/signup", values);
				console.log("res:", res);
			}}
		>
			{({ errors, touched }) => (
				<Form className="flex flex-col justify-center">
					<div className="text-gray-700 text-lg font-semibold">Sign Up</div>
					<label htmlFor="name" className="mt-8 mb-2">
						First Name
					</label>
					<Field
						className="border border-black px-2 py-1 rounded"
						id="name"
						name="name"
						placeholder="Enter Name"
					/>

					{errors.name && touched.name ? (
						<div className="mt-2 text-red-600">{errors.name}</div>
					) : null}

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

export default SignupForm;
