import styles from "./styles.module.css"

type Props = React.ComponentProps<"button"> & {
    title: string
}

export function Button ({title}:Props){
    return (
        <button type="button" className={styles.button}>
            {title}
        </button>
    )
}