import { useRef } from "react"
import { useDrop } from "react-dnd";
import { CardContainer, ColumnTitle } from './styles';
import { AddNewItem } from "./AddNewItem"
import { useAppState } from "./state/AppStateContext"
import { Card } from "./Card"
import { addTask, moveList } from "./state/actions"
import { useItemDrag } from "./utils/useItemDrag"
import { isHidden } from "./utils/isHidden"

type ColumnProps = {
    text: string
    id: string
}

export const Column = ({ text, id }: ColumnProps) => {

    const { draggedItem, getTasksByListId, dispatch } = useAppState()
    const tasks = getTasksByListId(id)
    const ref = useRef<HTMLDivElement>(null)

    const [, drop] = useDrop({
        accept: "COLUMN",
        hover() {
            if (!draggedItem) {
                return
            }
            if (draggedItem.type === "COLUMN") {
                if (draggedItem.id === id) {
                    return
                }
                dispatch(moveList(draggedItem.id, id))
            }
        }
    })

    const { drag } = useItemDrag({ type: "COLUMN", id, text })

    drag(drop(ref))

    return (
        <CardContainer 
            ref={ref}
            isHidden={isHidden(draggedItem, "COLUMN", id)}
        >
            <ColumnTitle>{text}</ColumnTitle>
            {tasks.map(task => <Card text={task.text} key={task.id} id={task.id} />)}
            <AddNewItem 
                toggleButtonText="+ Add another task"
                onAdd={text => dispatch(addTask(text, id))}
                dark
            />
        </CardContainer>
    )
}