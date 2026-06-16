"use client";

import NamedSelect from "../_components/NamedSelect";
import Form from "next/form";
import styles from "../page.module.scss";
import { Category, categoryList, Priority, priorityList, Task, TaskListContext } from "../tasks";
import { useContext } from "react";

export default function AddItemPanel() {
  const [taskList, setTaskList] = useContext(TaskListContext)!;
  
    return (
      <div className={styles.panel}>
        <h2>Add item</h2>
        <Form className={styles.addItem} action="" onSubmit={(e) => {
          /* We'll maybe preventDefault() when a backend is implemented */
          e.preventDefault();
          setTaskList([
            ...taskList!,
            {
              name: (e.target.elements.namedItem("task") as HTMLInputElement).value,
              id: crypto.randomUUID(),
              // TODO: validate against a zod enum instead of casting
              category: (e.target.elements.namedItem("category") as HTMLInputElement).value as Category,
              priority: (e.target.elements.namedItem("priority") as HTMLInputElement).value as Priority,
              completed: false
            }
          ]);
        }}>
          {/* these could honestly just accept a string[] */}
          <NamedSelect name="category">
            {categoryList.map(e => <option value={e} key={e}>{e}</option>)}
          </NamedSelect>
          <input type="text" placeholder="task..." name="task" required />
          <NamedSelect name="priority">
            {priorityList.map(e => <option value={e} key={e}>{e}</option>)}
          </NamedSelect>
          <input type="submit" value="Add" />
        </Form>
      </div>
    )
}