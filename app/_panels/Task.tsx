import { useContext } from "react";
import { Task as ITask } from "../tasks"
import styles from "./Task.module.scss"
import TaskListContext from "../_providers/TaskListContext";

export default function Task({task}: {task: ITask}) {
    const [taskList, setTaskList] = useContext(TaskListContext)!;
    return (
        <li className={styles.task}>
            <div className={styles.dataCell} data-value={task.priority}>
                <span>{task.priority}</span>
            </div>
            <div className={styles.dataCell}>
                <span>{task.category}</span>
            </div>
            <button className={styles.headerCell} data-complete={Boolean(task.completed)} onClick={() => {
                task.completed = !task.completed;
                setTaskList([...taskList!])
            }}>
                <h3>{task.name}</h3>
            </button>
            {/* todo: maybe tasklist should be a map */}
            <button onClick={() => {
                taskList!.splice(taskList!.findIndex(e => e === task), 1)
                setTaskList([...taskList!])
            }}>Remove</button>
        </li>
    )
}