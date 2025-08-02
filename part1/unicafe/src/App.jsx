import { useState } from 'react'



const Button = ({text, handler}) => <button onClick={handler}>{text}</button> 

const StatisticLine = ({text, value}) => {
  return (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good > 0 || neutral > 0 || bad > 0) {
    const all = good + bad + neutral;
    const average  = (good - bad)/all
    const positivePercentage = (good/all) * 100
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="all" value={all}/>
            <StatisticLine text="average" value={average}/>
            <StatisticLine text="positive" value={`${positivePercentage}%`}/>
          </tbody>
        </table>
      </>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  //  anecdotes with their corresponding state
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0) 
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  
  const handleGoodFeedback = () => {
    setGood(good + 1) 
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
  }

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const handleAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
    console.log(copy)
  }

  const maxIndex = (arr) => {
    if (arr.length === 0) return -1; 
    let maxIndex = 0;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > arr[maxIndex]) {
        maxIndex = i;
      }
    }
    return maxIndex;
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={handleGoodFeedback} text="good"/>
      <Button handler={handleNeutralFeedback} text="neutral"/>
      <Button handler={handleBadFeedback} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Button handler={handleVote} text="vote"/>
      <Button handler={handleAnecdote} text="next anecdote"/>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[maxIndex(votes)]}</p>

    </div>
  )
}

export default App