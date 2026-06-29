import styles from "./NamedSelect.module.scss"

export default function NamedSelect({children, name, defaultValue}: Readonly<{
    children: React.ReactNode,
    name: string,
    defaultValue?: string
}>) {
    return (
        <div className={styles.namedSelectContainer}>
            {/* todo - use label and id and htmlFor attribute */}
            <div>
                {name}
            </div>
            <select name={name} defaultValue={defaultValue}>
                {children}
            </select>
        </div>
    )
}