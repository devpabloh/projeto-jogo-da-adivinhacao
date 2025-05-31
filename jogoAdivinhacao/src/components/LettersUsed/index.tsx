import styles from "./styles.module.css"
import { Letters } from "../Letters"

export function LettersUsed (){
    return (
        <div className={styles.LettersUsed}>
            <h5>Letra Utilizadas</h5>

            <div>
                <Letters value="x" size="small" color="default"/>
                <Letters value="x" size="small" color="correct"/> 
                <Letters value="x" size="small" color="wrong"/>
                <Letters value="x" size="small"/>
            </div>
        </div>
    )
}