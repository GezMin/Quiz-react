import { QuestionList } from './QuestionList';
import { useState, useEffect } from 'react';
import './quiz.scss';

const TestMap = () => {
    const testing = QuestionList;
    const [showHint, setShowHint] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(testing[0]);
    const [allAnswer, setAllAnswer] = useState([]);
    const [changeRadio, setChangeRadio] = useState('');
    const [resultsView, setResultsView] = useState(false);

    useEffect(() => {
        activeOne();
        clearRadioSelection();
    }, []);

    const changeQuesttion = () => {
        const radios = document.querySelectorAll('input[type="radio"]');
        const allRadiosNotChecked = Array.from(radios).every(radio => !radio.checked);
        const btnSave = document.querySelector('.save');
        if (allRadiosNotChecked) {
            btnSave.setAttribute('disabled', 'disabled');
        } else {
            btnSave.removeAttribute('disabled');
        }
    };

    const clearRadioSelection = () => {
        const radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.checked = false;
        });
        changeQuesttion();
    };

    const onChange = e => {
        let radioValue = e.target.value;
        setChangeRadio(radioValue);

        changeQuesttion();
    };

    const saveAnsver = e => {
        const btn = document.querySelector('.active');
        btn.classList.remove('active');
        btn.setAttribute('disabled', 'disabled');

        const btns = document.querySelectorAll('.btn');
        const btnSave = document.querySelector('.save');

        // проверяет есть ли активные кнопки
        const allBtnNotActive = Array.from(btns).every(btn => !btn.hasAttribute('disabled'));

        // проверяет массив кнопок и находит первую у которой нет атрибута 'disabled'
        const firstEnabledBtn = Array.from(btns).find(item => !item.hasAttribute('disabled'));
        if (firstEnabledBtn) {
            firstEnabledBtn.click();
            clearRadioSelection();
        } else {
            btnSave.setAttribute('disabled', 'disabled');
            setResultsView(true);
        }

        setAllAnswer(allAnswer => [...allAnswer, changeRadio]);

        if (allBtnNotActive) {
        }
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

    // показывает массив ответов
    // console.log(allAnswer);

    const results = [];

    allAnswer.forEach((answer, i) => {
        const question = QuestionList.find(q => q.id === i + 1);
        if (question && question.answers.find(a => a.text === answer)) {
            results[i] = question.answers.find(a => a.text === answer).correct;
        }
    });

    const resultAnswer = () => {
        return (
            <>
                {results.map((result, i) => (
                    <h2 key={i}>
                        Вопрос {i + 1}:
                        {result ? (
                            <span style={{ color: 'green', fontWeight: 700 }}>ПРАВИЛЬНО</span>
                        ) : (
                            <span style={{ color: 'red', fontWeight: 700 }}>НЕ ПРАВИЛЬНО</span>
                        )}
                    </h2>
                ))}
            </>
        );
    };

    return (
        <>
            {resultsView ? (
                <>{resultAnswer()}</>
            ) : (
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
            )}
        </>
    );
};

export default TestMap;
