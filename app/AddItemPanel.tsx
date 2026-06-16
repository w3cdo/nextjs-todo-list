import NamedSelect from "./NamedSelect";
import Form from "next/form";
import styles from "./page.module.scss";

export default function AddItemPanel() {
    return (
      <div className={styles.panel}>
        <h2>Add item</h2>
        <Form className={styles.addItem} action="">
          <NamedSelect name="category">
              <option value="personal">
                Personal
              </option>
              <option value="work">
                Work
              </option>
              <option value="shopping">
                Shopping
              </option>
              <option value="health">
                Health
              </option>
          </NamedSelect>
          <input type="text" placeholder="task..." name="task" />
          <NamedSelect name="priority">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </NamedSelect>
          <input type="submit" value="Add" />
        </Form>
      </div>
    )
}