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
  const [score, setScore] = useState(0)
  
  const [letter, setLetter] = useState("")
  const [challenger, setChallenge] = useState<Challenge | null>(null)
  const [letterUsed, setLetterUsed] = useState<LettersUsedProps[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  const ATTEMPTS_MARGIN = 5

  function handleRestartGame (){
    const isConfirmed = window.confirm("Você tem certeza que deseja reiniciar o jogo?")

    if(isConfirmed){
      startGame()
    }
  }

  function startGame(){
    const index = Math.floor(Math.random() * WORDS.length)

    const randomWord = WORDS[index]

    setChallenge(randomWord)

    setScore(0)
    setLetter("")
    setLetterUsed([]) // resetando quando o jogo começa
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
      setLetter("")
      return alert("Você já utilizou essa letra!" + value)
    }

    const hits = challenger.word.toUpperCase().split("").filter((char) => char === value).length

    const correct = hits > 0

    const currentScore = score + hits

    setLetterUsed((prevState) => [...prevState, {value, correct}])
    setScore(currentScore)

    setLetter("")

    inputRef.current?.focus()
  }

  function endGame(message: string){
    alert(message)
    startGame()
  }

  useEffect(()=>{
    startGame()
  },[])

  useEffect(()=>{
    if(!challenger){
      return
    }

    setTimeout(()=>{
      if(score === challenger?.word.length){
        return endGame("Parabéns, você descobriu a palavra!")
      }

      const attempLimit = challenger.word.length + ATTEMPTS_MARGIN

      if(letterUsed.length === attempLimit){  
        return endGame("Que pena, você usou todas as tentativas")
      }
    }, 200)

  },[score, letterUsed.length])

  if(!challenger){
    return
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={letterUsed.length} max={challenger.word.length + ATTEMPTS_MARGIN} onRestart={handleRestartGame}/>
        <Tip tip={challenger.tip}/>

        <div className={styles.word}>
          {challenger.word.split("").map((letter, index)=> {
            const usedLetter = letterUsed.find((used) => used.value.toUpperCase() === letter.toUpperCase())

            return <Letters 
              key={index} 
              value={usedLetter?.value} 
              color={usedLetter?.correct ? "correct" : "default"}
            />
          })}
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
