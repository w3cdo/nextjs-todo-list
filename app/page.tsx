"use client";
import AddItemPanel from "./_panels/AddItemPanel";
import TaskListPanel from "./_panels/TaskListPanel";
import { Task, TaskListContext } from "./tasks";
import { useEffect, useState } from "react";

export default function Home() {
  const taskListState = useState<Task[]>([]);
  const [taskList, setTaskList] = taskListState;

  useEffect(() => {
    const response = fetch("api/todo");

    const res2 = fetch("api/todo", {
      method: "post",
      body: JSON.stringify({name: "test"})
    })
    .then(console.log);
    
    let savedData = localStorage.getItem("taskList")
    if (savedData)
      setTaskList(JSON.parse(savedData))
  }, [])

  // TODO: this also fires on the first mount with the initial [] and writes "[]" to localStorage
  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList))
  }, [taskList])

  return (
      <TaskListContext value={taskListState}>
        <main>
          <h1>
            Todo list
          </h1>
          <AddItemPanel />
          <TaskListPanel />
        </main>
      </TaskListContext>
  );
}
