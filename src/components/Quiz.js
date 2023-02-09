import React, { useState } from 'react';
import { QuestionList } from './QuestionList';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showHint, setShowHint] = useState(false);

    const handleAnswerClick = index => {
        setAnswers([...answers, index]);
        setCurrentQuestion(currentQuestion + 1);
    };

    const handleHintClick = () => {
        setShowHint(true);
    };

    const handleSkipClick = () => {
        setCurrentQuestion(currentQuestion + 1);
    };

    const renderQuestion = () => {
        const question = QuestionList[currentQuestion];

        return (
            <>
                <p className='question'>{question.text}</p>
                <div className='answers'>
                    {question.answers.map((answer, index) => (
                        <button key={answer.text} onClick={() => handleAnswerClick(index)}>
                            {answer.text}
                        </button>
                    ))}
                </div>
                {showHint && <p className='hint'>{question.hint}</p>}
                <button onClick={handleHintClick}>Show hint</button>
                <button onClick={handleSkipClick}>Skip</button>
            </>
        );
    };

    const renderResults = () => {
        let correctAnswers = 0;
        QuestionList.forEach((question, index) => {
            if (question.answers[answers[index]].correct) {
                correctAnswers += 1;
            }
        });

        return (
            <>
                <p>
                    You got {correctAnswers} out of {QuestionList.length} questions right
                </p>
            </>
        );
    };

    return (
        <div className='quiz'>
            {currentQuestion < QuestionList.length ? renderQuestion() : renderResults()}
        </div>
    );
};

export default Quiz;
