import { atom } from "recoil";

export interface IToDo {
	id: number;
	text: string;
}

// 아래와 같이 키/밸류에 대해서 알려줘야 toDo, doing, done 이외의 키도 추가할 수 있어진다.
// 안 그러면 딱 toDo, doing, done 3개만 키로 가질 수 있는 것으로 타입스크립트가 오해한다.
interface IToDoState {
	[key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
	key: "toDo",
	default: {
		"To Do": [],
		Doing: [],
		Done: [],
	},
});
