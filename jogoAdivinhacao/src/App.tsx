import styles from './app.module.css'

/* Components */
import { Header } from './components/Header'
import { Tip } from './components/Tip'

function App() {
  function handleRestartGame (){
    alert("Reiniciar o jogo")
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={5} max={10} onRestart={handleRestartGame}/>
        <Tip tip='Linguagem de programação mais utilizadas'/>
      </main>
    </div>
  )
}

export default App
