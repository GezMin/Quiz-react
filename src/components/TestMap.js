import { QuestionList } from './QuestionList';
import { useState, useEffect } from 'react';
import './quiz.scss';

const TestMap = () => {
    const testing = QuestionList;
    const [showHint, setShowHint] = useState(false);
    const [showHintText, setShowHintText] = useState(testing[0].hint);
    const [question, setQuestion] = useState(testing[0].question);

    useEffect(() => {
        activOne();
    }, []);

    const activOne = () => {
        let buttons = document.querySelectorAll('.btn');
        buttons[0].classList.add('active');
    };

    const handleClick = e => {
        let buttons = document.querySelectorAll('.btn');
        for (let button of buttons) {
            button.classList.remove('active');
        }
        let but = e.target;
        but.classList.add('active');
        // console.log(but.innerHTML);
        const questionResult = testing.map(item => {
            if (item.id == but.innerHTML) {
                // console.log(item.hint);
                return item.question;
            }
        });
        const questionResult2 = testing.map(item => {
            if (item.id == but.innerHTML) {
                // console.log(item.hint);
                return item.hint;
            }
        });
        setQuestion(questionResult);
        setShowHintText(questionResult2);
    };

    const handleHintClick = () => {
        if (showHint) {
            setShowHint(false);
        } else {
            setShowHint(true);
        }
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
            <div>{question}</div>

            {showHint && <p className='hint'>{showHintText}</p>}
            <button onClick={handleHintClick}>Show hint</button>
        </>
    );
};

export default TestMap;
