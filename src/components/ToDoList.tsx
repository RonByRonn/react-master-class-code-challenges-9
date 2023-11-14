import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface IForm {
	toDo: string;
}

interface IToDo {
	text: string;
	id: number;
	category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
	key: "toDo",
	default: [],
});

function ToDoList() {
	const [toDos, setToDos] = useRecoilState(toDoState);
	// const value = useRecoilValue(toDoState);
	// const modFn = useSetRecoilState(toDoState);
	const { register, handleSubmit, setValue } = useForm<IForm>();
	const handleValid = ({ toDo }: IForm) => {
		setToDos((oldToDos) => [
			{ text: toDo, id: Date.now(), category: "TO_DO" },
			...oldToDos,
		]);
		setValue("toDo", "");
	};
	return (
		<div>
			<form onSubmit={handleSubmit(handleValid)}>
				<input
					{...register("toDo", {
						required: "Write To-Do",
					})}
					placeholder="Write a To-Do"
				/>
				<button>Add</button>
			</form>
			<ul>
				{toDos.map((toDo) => (
					<li key={toDo.id}>{toDo.text}</li>
				))}
			</ul>
		</div>
	);
}

export default ToDoList;