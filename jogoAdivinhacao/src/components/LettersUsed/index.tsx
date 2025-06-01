import styles from "./styles.module.css"
import { Letters } from "../Letters"

export type LettersUsedProps = {
    value: string
    correct: boolean
}

type Props = {
    data: LettersUsedProps[]
}

export function LettersUsed ({data}:Props){
    return (
        <div className={styles.LettersUsed}>
            <h5>Letra Utilizadas</h5>

            <div>
                {
                    data.map(({value, correct})=>(
                        <Letters key={value} value={value} size="small" color={correct? "correct" : "wrong"}/> 
                    ))
                }
            </div>
        </div>
    )
}