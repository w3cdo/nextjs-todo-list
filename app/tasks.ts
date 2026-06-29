import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export const categoryList = ["Personal", "Work", "Shopping", "Health"] as const
export const priorityList = ["High", "Medium", "Low"] as const

export type Priority = typeof priorityList[number];
export type Category = typeof categoryList[number];

export interface Task {
    name: string,
    id: string,
    priority: Priority,
    category: Category,
    completed: boolean,
}

export type TaskListState = [Task[], Dispatch<SetStateAction<Task[]>>];

export const TaskListContext = createContext<TaskListState | null>(null);

export function useTaskListContext(): TaskListState {
    const context = useContext(TaskListContext);
    if (!context) {
        throw new Error("useTaskListContext must be used within TaskListContext provider");
    }
    return context;
}