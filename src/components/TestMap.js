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

    // делаю неактивной кнопку Save если не один ответ не выбран
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

    // очищаю все инпуты
    const clearRadioSelection = () => {
        const radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.checked = false;
        });
        changeQuesttion();
    };

    // определяем ответ который выбрал пользователь
    const onChange = e => {
        let radioValue = e.target.value;
        setChangeRadio(radioValue);

        changeQuesttion();
    };

    // сохраняем результат и переходим автоматически к следующему вопросу при условии если есть активные кнопки
    const saveAnsver = e => {
        const btn = document.querySelector('.active');
        btn.classList.remove('active');
        btn.setAttribute('disabled', 'disabled');

        const btns = document.querySelectorAll('.btn');
        const btnSave = document.querySelector('.save');

        // проверяет есть ли активные кнопки
        // const allBtnNotActive = Array.from(btns).every(btn => !btn.hasAttribute('disabled'));

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

        // if (allBtnNotActive) {
        // }
    };

    // при загрузке выставляю первой кнопке класс Active
    const activeOne = () => {
        let buttons = document.querySelectorAll('.btn');
        buttons[0].classList.add('active');
    };

    // дает возможноть переключится на другой вопрос по клику по кнопке
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

    // показывает и срывает подсказку при клике
    const handleHintClick = () => {
        setShowHint(!showHint);
    };

    // показывает массив ответов
    console.log(allAnswer);

    // создаем массив и ищем совпадения в объекте с ответами
    // const results = [];
    // allAnswer.forEach((answer, i) => {
    //     const question = QuestionList.find(q => q.id === i + 1);
    //     if (question && question.answers.find(a => a.text === answer)) {
    //         results[i] = question.answers.find(a => a.text === answer).correct;
    //     }
    // });

    // функция отрабатывает когда на все вопросы получены ответы и все кнопки вопросов неактивны
    const resultAnswer = () => {
        const results = [];
        for (let i = 0; i < allAnswer.length; i++) {
            const [id, answer] = allAnswer[i].split(',');
            const question = QuestionList.find(q => q.id === Number(id));
            if (question) {
                const a = question.answers.find(a => a.text === answer);
                if (a) {
                    results[i] = {
                        id: id,
                        text: answer,
                        correct: a.correct,
                        question: question.question,
                    };
                }
            }
        }
        console.log(results);

        return (
            <>
                {results.map((result, i) => (
                    <div key={i}>
                        <h4>Вопрос №{result.id}</h4>
                        <h2>
                            "{result.question}" Ваш ответ {result.text}
                        </h2>

                        {result.correct ? (
                            <h3 style={{ color: 'green', fontWeight: 700 }}>правильно</h3>
                        ) : (
                            <h3 style={{ color: 'red', fontWeight: 700 }}> не правильно</h3>
                        )}
                    </div>
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
                    <div>Список вопросов:</div>
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
                                value={[selectedQuestion.id, item.text]}
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
