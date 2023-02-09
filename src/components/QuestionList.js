export const QuestionList = [
    {
        id: 1,
        question: 'What is the capital of France?',
        answers: [
            { text: 'Paris', correct: true },
            { text: 'Berlin', correct: false },
            { text: 'London', correct: false },
            { text: 'Madrid', correct: false },
        ],
        hint: 'It is one of the most famous cities in the world',
    },
    {
        id: 2,
        question: 'Какой язык учить',
        answers: [
            { text: 'React', correct: true },
            { text: 'Angular 8', correct: false },
            { text: 'Vie', correct: false },
        ],
        hint: '???',
    },

    {
        id: 3,
        question: 'Какую базу использовать',
        answers: [
            { text: 'PHP', correct: false },
            { text: 'MongoDB', correct: true },
            { text: 'Oraqle', correct: false },
        ],
        hint: 'даже не знаю',
    },
    {
        id: 4,
        question: 'что такое Sass',
        answers: [
            { text: 'компилятор', correct: true },
            { text: 'style', correct: false },
            { text: 'Redux', correct: false },
        ],
        hint: 'препроцесор',
    },
    {
        id: 5,
        question: 'к чему относится reducer',
        answers: [
            { text: 'npm', correct: false },
            { text: 'html', correct: false },
            { text: 'Redux', correct: true },
            { text: 'php', correct: false },
        ],
        hint: 'препроцесор',
    },
];
