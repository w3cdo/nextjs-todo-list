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