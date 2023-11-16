import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
	border-radius: 5px;
	padding: 10px 10px;
	background-color: ${(props) =>
		props.isDragging ? "#74b9ff" : props.theme.cardColor};
	margin-bottom: 5px;
	box-shadow: ${(props) =>
		props.isDragging ? "0px 2px 5px rgba(0,0,0,0.1)" : "none"};
	// 위 5px 부분은 blur 관련된 부분임.
`;

interface IDraggableCardProps {
	toDo: string;
	index: number;
}

function DraggableCard({ toDo, index }: IDraggableCardProps) {
	return (
		// key와 draggableId가 같아야 함 (이 패키지 특징)
		<Draggable key={toDo} draggableId={toDo} index={index}>
			{(magic, snapshot) => (
				<Card
					isDragging={snapshot.isDragging}
					ref={magic.innerRef}
					{...magic.draggableProps}
					{...magic.dragHandleProps}
				>
					{toDo}
				</Card>
			)}
		</Draggable>
	);
}

// props가 변하지 않았다면 DraggableCard를 다시 렌더링하지 말 것
export default React.memo(DraggableCard);
