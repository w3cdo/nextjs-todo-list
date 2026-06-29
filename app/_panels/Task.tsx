import { Task as ITask, useTaskListContext } from "../tasks"
import styles from "./Task.module.scss"

export default function Task({task}: {task: ITask}) {
    const [taskList, setTaskList] = useTaskListContext();
    return (
        <li className={styles.task}>
            <div className={styles.dataCell} data-value={task.priority}>
                <span>{task.priority}</span>
            </div>
            <div className={styles.dataCell}>
                <span>{task.category}</span>
            </div>
            <button className={styles.headerCell} data-complete={task.completed} onClick={() => {
                task.completed = !task.completed;
                setTaskList([...taskList])
            }}>
                <h3>{task.name}</h3>
            </button>
            {/* todo: maybe tasklist should be a map */}
            <button onClick={() => {
                taskList.splice(taskList.findIndex(e => e === task), 1)
                setTaskList([...taskList])
            }}>Remove</button>
        </li>
    )
}