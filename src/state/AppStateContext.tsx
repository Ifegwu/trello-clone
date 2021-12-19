import { 
    createContext, 
    useContext, 
    // useReducer, 
    Dispatch, 
    FC } from "react"
import { useImmerReducer } from "use-immer"

import { Action } from './actions'
import {
    appStateReducer,
    AppState,
    List,
    Task} from "./appStateReducer"

// type Task = {
//     id: string
//     text: string
// }

// type List = {
//     id: string
//     text: string
//     tasks: Task[]
// }

// export type AppState = {
//     lists: List[]
// }

type AppStateContextProps = {
    lists: List[]
    getTasksByListId(id: string): Task[]
    dispatch: Dispatch<Action>
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

const appData: AppState = {
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{ id: "c0", text: "Generate app scaffold" }]
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [{ id: "c1", text: "Learn TypeScript" }]
        },
        {
            id: "2",
            text: "Done",
            tasks: [{ id: "c2", text: "Begin to use tatic typing" }]
        },
    ]
}

export const AppStateProvider: FC = ({ children }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, appData)

    const { lists } = appData
    const getTasksByListId = (id: string) => {
        return lists.find((list) => list.id === id)?.tasks || []
    }

    return (
        <AppStateContext.Provider value={{ lists, getTasksByListId, dispatch }}>
            {children}
        </AppStateContext.Provider>
    )
}

export const useAppState = () => {
    return useContext(AppStateContext)
}