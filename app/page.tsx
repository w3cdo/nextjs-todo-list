import AddItemPanel from "./_panels/AddItemPanel";
import TaskListPanel from "./_panels/TaskListPanel";
import { Task } from "./tasks";
import { useEffect, useState } from "react";
import TaskListContext from "./_providers/TaskListContext";

export default function Home() {
  const taskListState = useState<Task[]|undefined>([]);
  const [taskList, setTaskList] = taskListState;

  useEffect(() => {
    fetch("api/todo").then(async r => setTaskList(await r.json()));
  }, [])

  console.log(taskList)

  return (
      <TaskListContext value={taskListState}>
        <main>
          <h1>
            Todo list
          </h1>
          <AddItemPanel />
          {taskList ? <TaskListPanel /> : <h2>Fetching data from server</h2>}
        </main>
      </TaskListContext>
  );
}
