"use client";

import NamedSelect from "../_components/NamedSelect";
import Form from "next/form";
import styles from "../page.module.scss";
import { Category, categoryList, Priority, priorityList, Task, TaskListContext } from "../tasks";
import { useContext, useEffect, useRef } from "react";

// i have a feeling this is shared state across
// all instances here, but this should be fine for now.
// i'll just wait for an answer on how to properly do this
let animation: Animation;
export default function AddItemPanel() {
  const addButton = useRef<HTMLInputElement>(null);
  useEffect(() => {
    animation = new Animation(
      new KeyframeEffect(addButton.current!, [
        { offset: 0, backgroundColor: "var(--mantle-brighter)", padding: ".5em .75em" },
        { offset: 1 }
      ], {duration: 250, easing: "ease-out"})
    )
  }, [])

  const [taskList, setTaskList] = useContext(TaskListContext)!;
  
  return (
    <div className={styles.panel}>
      <h2>Add item</h2>
      <Form className={styles.addItem} action="" onSubmit={(e) => {
        /* We'll maybe preventDefault() when a backend is implemented */
        e.preventDefault();

        animation.play()
        
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
        <input type="submit" value="Add" ref={addButton} />
      </Form>
    </div>
  )
}