"use client";

import NamedSelect from "../_components/NamedSelect";
import Form from "next/form";
import styles from "../page.module.scss";
import { Category, categoryList, Priority, priorityList, useTaskListContext } from "../tasks";
import { useState } from "react";

// i have a feeling this is shared state across
// all instances here, but this should be fine for now.
// i'll just wait for an answer on how to properly do this
// let animation: Animation;

// answer: module scoped vars are shared, component state stays per instance.
export default function AddItemPanel() {
  const [isAddActive, setIsAddActive] = useState(false);
  const [taskList, setTaskList] = useTaskListContext();
  
  return (
    <div className={styles.panel}>
      <h2>Add item</h2>
      
      <Form className={styles.addItem} action="" onSubmit={(e) => {
        /* We'll maybe preventDefault() when a backend is implemented */
        e.preventDefault();

        setIsAddActive(false);
        requestAnimationFrame(() => setIsAddActive(true));
        
        setTaskList([
          ...taskList,
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
        <input
          type="submit"
          value="Add"
          className={isAddActive ? styles.addButtonActive : ""}
          onAnimationEnd={() => setIsAddActive(false)}
        />
      </Form>
    </div>
  );
}