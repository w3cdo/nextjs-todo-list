"use client";
import { useContext, useState } from "react"
import pageStyles from "../page.module.scss"
import { TaskListContext } from "../tasks"
import NumberFlow from "@number-flow/react";
import Task from "./Task";

export default function TaskListPanel() {
    const [taskList, setTaskList] = useContext(TaskListContext)!
    const completedCount = taskList!.reduce((p,c) => p += (c.completed ? 1 : 0), 0)

    return (
        <div className={pageStyles.panel}>
            <h2>{
                taskList!.length
                ? <>
                    <NumberFlow value={completedCount} />/<NumberFlow value={taskList!.length} /> task{taskList!.length === 1 ? "" : "s"} completed
                </>
                : "No tasks added"
            }</h2>
            {
                taskList!.length
                ? <>
                    <ul className={pageStyles.taskList}>
                        {taskList!.map(task => <Task task={task} />)}
                    </ul>
                </>
                : <></>
            }
        </div>
    )
}