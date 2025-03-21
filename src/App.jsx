import { useState, useEffect } from 'react';
import { DATA } from './data';
import './App.css';

const alphabet = ["A", "B", "C", "Ç", "D", "E", "F", "G", "Ğ", "H", "I", "İ", "J", "K", "L", "M", "N", "O", "Ö", "P", "R", "S", "Ş", "T", "U", "Ü", "V", "Y", "Z"];

function App() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState("");
  const [answerArray, setAnswerArray] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  const setKeyword = (keyword) => {
    if (keywords.length < answers.length) {
      keywords.push(keyword);
      setKeywords([...keywords]);
    }
    if (keywords.length === answers.length) {
      const isCorrect = answers === keywords.join("");
      if (isCorrect) {
        setCorrectCount(correctCount + 1);
      } else {
        setWrongCount(wrongCount + 1);
      }
      setCorrectAnswers([...correctAnswers, answers]);
      if (index + 1 < DATA.length) {
        setIndex(index + 1);
      } else {
        setIsQuizFinished(true);
      }
      setKeywords([]);
    }
  };

  useEffect(() => {
    if (!isQuizFinished && typeof DATA[index] !== "undefined") {
      const answer = DATA[index].answer.toLowerCase();
      setAnswers(answer);
      setQuestion(DATA[index].question);
      const stringToArray = answer.split("");
      stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
      stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
      stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
      const alphabetLowerData = stringToArray.map((char) => char.toLowerCase());
      setAnswerArray(shuffle(alphabetLowerData));
    }
  }, [index, isQuizFinished]);

  const removeKeyword = (index) => {
    keywords.splice(index, 1);
    setKeywords([...keywords]);
  };

  return (
    <div className="App">
      {isQuizFinished ? (
        <div>
          <h1>Quiz Tamamlandı!</h1>
          <p>Doğru Sayısı: {correctCount}</p>
          <p>Yanlış Sayısı: {wrongCount}</p>
          <h2>Doğru Cevaplar:</h2>
          <ul>
            {correctAnswers.map((answer, i) => (
              <li key={i}>{answer}</li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <div>
            <span>{question}</span>
          </div>
          <div>
            {keywords.map((item, index) => (
              <span onClick={() => removeKeyword(index)} key={index}>
                {item}
              </span>
            ))}
          </div>
          <div>
            {answerArray.map((item, index) => (
              <button key={index} onClick={() => setKeyword(item)}>
                {item}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
