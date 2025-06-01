import styles from './app.module.css'

/* Hooks */
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'

/* Utils */
import { WORDS, type Challenge } from './utils/words'

/* Components */
import { Header } from './components/Header'
import { Letters } from './components/Letters'
import { Tip } from './components/Tip'
import { Input } from './components/Input'
import { Button } from './components/Button'
import {LettersUsed, type LettersUsedProps} from "./components/LettersUsed"

function App() {
  const [attempts, setAttempts] = useState(0)
  const [letter, setLetter] = useState("")
  const [challenger, setChallenge] = useState<Challenge | null>(null)
  const [letterUsed, setLetterUsed] = useState<LettersUsedProps[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  function handleRestartGame (){
    alert("Reiniciar o jogo")
  }

  function startGame(){
    const index = Math.floor(Math.random() * WORDS.length)

    const randomWord = WORDS[index]

    setChallenge(randomWord)
    setAttempts(0)
    setLetter("")
  }

  function handledConfirm(){
    if(!challenger){
      return 
    }

    if(!letter.trim()){
      return alert("Digite uma letra")
    }

    const value = letter.toLocaleUpperCase()

    const exists = letterUsed.find(
      (used)=> used.value.toLocaleUpperCase() === value)

    if(exists){
      return alert("Você já utilizou essa letra!")
    }

    setLetterUsed((prevState) => [...prevState, {value, correct: false}])

    setLetter("")

    inputRef.current?.focus()
  }

  useEffect(()=>{
    startGame()
  },[])

  if(!challenger){
    return
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={attempts} max={10} onRestart={handleRestartGame}/>
        <Tip tip='Linguagem de programação mais utilizadas'/>

        <div className={styles.word}>
          {challenger.word.split("").map(()=>(
            <Letters value=""/>
          ))}
        </div>

        <h4>Palpite</h4>

        <div className={styles.guess}>
          <Input
            ref={inputRef} 
            autoFocus 
            maxLength={1} 
            placeholder='?' 
            value={letter}
            onChange={(e)=>setLetter(e.target.value)}
          />
          <Button title='Confirmar' onClick={handledConfirm}/>
        </div>

        <LettersUsed data={letterUsed}/>
      </main>
    </div>
  )
}

export default App
