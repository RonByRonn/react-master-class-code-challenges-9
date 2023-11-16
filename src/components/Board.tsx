import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
	padding-top: 10px;
	background-color: ${(props) => props.theme.boardColor};
	border-radius: 5px;
	width: 300px;
	min-height: 300px;
	display: flex;
	flex-direction: column;
`;

const Title = styled.h2`
	text-align: center;
	font-weight: 600;
	margin-bottom: 10px;
	font-size: 18px;
`;

interface IAreaProps {
	isDraggingFromThis: boolean;
	isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
	background-color: ${(props) =>
		props.isDraggingOver
			? "#dfe6e9"
			: props.isDraggingFromThis
			? "#b2bec3"
			: "transparent"};
	flex-grow: 1;
	transition: background-color 0.3s ease-in-out;
	padding: 20px;
`;

interface IBoardProps {
	toDos: string[];
	boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
	return (
		<Wrapper>
			<Title>{boardId}</Title>
			<Droppable droppableId={boardId}>
				{(magic, snapshot) => (
					<Area
						isDraggingOver={snapshot.isDraggingOver}
						// Boolean(arg)의 arg가 null이면 false, 아니면 true
						isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
						ref={magic.innerRef}
						{...magic.droppableProps}
					>
						{toDos.map((toDo, index) => (
							<DraggableCard key={toDo} index={index} toDo={toDo} />
						))}
						{magic.placeholder}
					</Area>
				)}
			</Droppable>
		</Wrapper>
	);
}

export default Board;
