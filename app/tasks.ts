import { createContext, useState } from "react";

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

// Maybe this could be @ts-expect-error'ed and shoved into a client-only file
// because this should only be null on the server, when there's no state to access,
// right?
export const TaskListContext = createContext<ReturnType<typeof useState<Task[]>> | null>(null)