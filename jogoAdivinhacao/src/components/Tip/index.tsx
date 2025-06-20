import styles from "./styles.module.css"

/* Imagens */
import tipIcon from "../../assets/tip.svg"

type Props = {
    tip: string
}

export function Tip ({tip}: Props){
    return(
        <div className={styles.tip} >
            <img src={tipIcon} alt="ícone de dica" />
            <div>
                <h3>Dica</h3>
                <p>{tip}</p>
            </div>
        </div>
    )
}

