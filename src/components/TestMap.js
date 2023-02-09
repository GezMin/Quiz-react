import { QuestionList } from './QuestionList';
import { useState, useEffect } from 'react';
import './quiz.scss';

const TestMap = () => {
    const testing = QuestionList;
    const [showHint, setShowHint] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(testing[0]);

    useEffect(() => {
        activOne();
    }, []);

    const activOne = () => {
        let buttons = document.querySelectorAll('.btn');
        buttons[0].classList.add('active');
    };

    const handleClick = e => {
        setShowHint(false);
        let buttons = document.querySelectorAll('.btn');
        for (let button of buttons) {
            button.classList.remove('active');
        }
        let but = e.target;
        but.classList.add('active');

        const selected = testing.find(item => item.id == but.innerHTML);
        setSelectedQuestion(selected);
    };

    const handleHintClick = () => {
        setShowHint(!showHint);
    };

    return (
        <>
            <span>
                Список вопросов:
                <br />
            </span>
            {testing &&
                testing.map((item, i) => (
                    <button className='btn' onClick={handleClick} key={item.id}>
                        {item.id}
                    </button>
                ))}
            {selectedQuestion.answers.map((item, i) => (
                <p>{item.text}</p>
            ))}

            <div>{selectedQuestion.question}</div>

            {showHint && <p className='hint'>{selectedQuestion.hint}</p>}
            <button onClick={handleHintClick}> Show hint</button>
        </>
    );
};

export default TestMap;
