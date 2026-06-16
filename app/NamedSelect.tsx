import styles from "./NamedSelect.module.scss"

export default function NamedSelect({children, name, defaultValue}: Readonly<{
    children: React.ReactNode,
    name: string,
    defaultValue?: string
}>) {
    return (
        <div className={styles.namedSelectContainer}>
            <div>
                {name}
            </div>
            <select name={name} defaultValue={defaultValue}>
                {children}
            </select>
        </div>
    )
}