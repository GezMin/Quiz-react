import { QuestionList } from './QuestionList';
import { useState, useEffect } from 'react';
import './quiz.scss';

const TestMap = () => {
    const testing = QuestionList;
    const [showHint, setShowHint] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(testing[0]);
    const [allAnswer, setAllAnswer] = useState([]);
    const [changeRadio, setChangeRadio] = useState('');

    useEffect(() => {
        activeOne();
    }, []);

    const clearRadioSelection = () => {
        const radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.checked = false;
        });
    };

    const onChange = e => {
        let radioValue = e.target.value;
        setChangeRadio(radioValue);
        console.log('текущие ' + radioValue);
    };

    const saveAnsver = e => {
        const btn = document.querySelector('.active');
        let a = btn.innerHTML;
        btn.classList.remove('active');
        btn.setAttribute('disabled', 'disabled');

        const btns = document.querySelectorAll('.btn');
        const firstEnabledBtn = Array.from(btns).find(item => !item.hasAttribute('disabled'));
        if (firstEnabledBtn) {
            firstEnabledBtn.click();
            clearRadioSelection();
        }

        console.log(a);
        setAllAnswer(allAnswer => [...allAnswer, changeRadio]);
        console.log('предыдущие ' + allAnswer);
    };

    const activeOne = () => {
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
        clearRadioSelection();
        but.classList.add('active');

        const selected = testing.find(item => item.id == but.innerHTML);
        setSelectedQuestion(selected);
    };

    const handleHintClick = () => {
        setShowHint(!showHint);
    };
    console.log(allAnswer);
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
            <h2>{selectedQuestion.question}</h2>
            {selectedQuestion.answers.map((item, i) => (
                <div className='form-check' key={i}>
                    <input
                        key={i}
                        className='check-answer'
                        name='form-check-input'
                        type='radio'
                        id={`input${i}`}
                        value={item.text}
                        onChange={onChange}
                    />
                    <label className='form-check-label' htmlFor={`input${i}`}>
                        {item.text}
                    </label>
                </div>
            ))}

            <button className='save' onClick={saveAnsver}>
                Save
            </button>
            {showHint && <p className='hint'>{selectedQuestion.hint}</p>}
            <button onClick={handleHintClick}> Show hint</button>
        </>
    );
};

export default TestMap;
