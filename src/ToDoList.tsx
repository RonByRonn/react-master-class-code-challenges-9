/* function ToDoList() {
	const [toDo, setToDo] = useState("");
	const [toDoError, setToDoError] = useState("");
	const onChange = (event: React.FormEvent<HTMLInputElement>) => {
		const {
			currentTarget: { value },
		} = event;
		setToDoError("");
		setToDo(value);
	};
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (toDo.length < 10) {
			return setToDoError("To do should be longer");
		}
		setToDo("");
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input onChange={onChange} value={toDo} placeholder="Write a to-do" />
				<button>Add</button>
				{toDoError !== "" ? toDoError : null}
			</form>
		</div>
	);
} */

import { useForm } from "react-hook-form";

interface IForm {
	email: string;
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	password1: string;
	errors: {
		email: {
			message: string;
		};
	};
}

function ToDoList() {
	const {
		register,
		handleSubmit,
		// formState,
		formState: { errors },
	} = useForm<IForm>({
		defaultValues: {
			email: "@naver.com",
		},
	});
	const onValid = (data: any) => {
		// console.log(data);
	};
	console.log(errors);
	return (
		<div>
			<form
				style={{ display: "flex", flexDirection: "column" }}
				onSubmit={handleSubmit(onValid)}
			>
				<input
					{...register("email", {
						required: "Email is required",
						pattern: {
							value: /^[A-Za-z0-9._%+-]+@naver.com$/,
							message: "Only naver.com emails are allowed",
						},
					})}
					placeholder="Email"
				/>
				<span>{errors.email?.message}</span>
				<input
					{...register("firstName", { required: "Write here!" })}
					placeholder="First Name"
				/>
				<span>{errors.firstName?.message}</span>
				<input
					{...register("lastName", { required: "Write here!" })}
					placeholder="Last Name"
				/>
				<span>{errors.lastName?.message}</span>
				<input
					{...register("username", {
						required: "Write here!",
						minLength: {
							value: 10,
							message: "Your username should be longer than or equal to 10.",
						},
					})}
					placeholder="Username"
				/>
				<span>{errors.username?.message}</span>
				<input
					{...register("password", {
						required: "Password is required",
						minLength: {
							value: 5,
							message: "Your password is too short.",
						},
					})}
					placeholder="Password"
				/>
				<span>{errors.password?.message}</span>
				<input
					{...register("password1", {
						required: "Password is required",
						minLength: {
							value: 5,
							message: "Your password is too short.",
						},
					})}
					placeholder="Password1"
				/>
				<span>{errors.password1?.message}</span>
				<button>Add</button>
			</form>
		</div>
	);
}

export default ToDoList;
