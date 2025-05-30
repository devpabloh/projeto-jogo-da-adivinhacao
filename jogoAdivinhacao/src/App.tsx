import styles from './app.module.css'

/* Components */
import { Header } from './components/Header'
import { Letters } from './components/Letters'
import { Tip } from './components/Tip'
import { Input } from './components/Input'

function App() {
  function handleRestartGame (){
    alert("Reiniciar o jogo")
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={5} max={10} onRestart={handleRestartGame}/>
        <Tip tip='Linguagem de programação mais utilizadas'/>
        <div className={styles.word}>
          <Letters value="r"/>
          <Letters value="e"/>
          <Letters value="a"/>
          <Letters value="c"/>
          <Letters value="t"/>
        </div>
        <h4>Palpite</h4>
        <div>
          <Input autoFocus maxLength={1} placeholder='?'/>
        </div>
      </main>
    </div>
  )
}

export default App
