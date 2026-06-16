import { useContext } from "react";
import { Task as ITask, TaskListContext } from "../tasks"
import styles from "./Task.module.scss"

export default function Task({task}: {task: ITask}) {
    const [taskList, setTaskList] = useContext(TaskListContext)!;
    return (
        <li className={styles.task} key={task.id}>
            <div className={styles.dataCell} data-value={task.priority}>
                <span>{task.priority}</span>
            </div>
            <div className={styles.dataCell}>
                <span>{task.category}</span>
            </div>
            <h3>{task.name}</h3>
            {/* todo: maybe tasklist should be a map */}
            <button onClick={() => {
                taskList!.splice(taskList!.findIndex(e => e === task), 1)
                setTaskList([...taskList!])
            }}>Remove</button>
        </li>
    )
}