let btnStart = document.querySelector('.btnStart');
let secondMenu = document.querySelector('#secondMenu');
let mainMenu = document.querySelector('#mainMenu');

let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');
orderNumberField.innerText = orderNumber;


// Функция перевода числа в его запись прописью

function numberToWords(number) {
    const units = ['0', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    const tens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    const hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];
    let result = '';
        if (number < 0) {
            result += 'минус ';
            number = Math.abs(number);
        } if (number < 20) {
            result += units[number];
        } else if (number < 100) {
            result += tens[Math.floor(number / 10)];
        if (number % 10 !== 0) {
            result += ' ' + units[number % 10];
        }
        } else if (number < 1000) {
            result += hundreds[Math.floor(number / 100)];
        if (number % 100 !== 0) {
            result += ' ' + numberToWords(number % 100)
        }
        }
   
    return result;
  }

// Начало игры

btnStart.addEventListener('click', function (){ 
    mainMenu.style.display = 'none';
    secondMenu.style.display = 'block';

    // Получение данных из input

    let minValue = parseInt(document.querySelector('#minValue').value);
    let maxValue = parseInt(document.querySelector('#maxValue').value);
      
    // Установление границ переменных

    minValue = (minValue < -999) ? minValue = -999 : (minValue > 999) ? minValue = 999 : minValue;
    maxValue = (maxValue < -999) ? maxValue = -999 : (maxValue > 999) ? maxValue = 999 : maxValue;

    // console.log(minValue)
    // console.log(maxValue)
    
    // Если Максимальное значение окажется меньше Минимального

    if (minValue > maxValue) {
		[minValue, maxValue] = [maxValue, minValue];
	};

    let answerNumber  = Math.floor((minValue + maxValue) / 2);

    answerField.innerText = answerNumber >= 0 ? numberToWords(answerNumber).length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToWords(answerNumber)}?` : `Вы загадали число ${answerNumber}?` : numberToWords(answerNumber).length < 20 ? `Вы загадали число ${numberToWords(answerNumber)}?` : `Вы загадали число минус  ${Math.abs(answerNumber)}?`;
    

// Кнопка Заново

    document.querySelector('#btnRetry').addEventListener('click', function () {
        minValue = 0;
        maxValue = 100;
        orderNumber = 1;
        mainMenu.style.display = 'block';
        secondMenu.style.display = 'none';
        orderNumberField.textContent = orderNumber;
        gameRun = true;
        location.reload();
    });

// Кнопка Больше

    document.querySelector('#btnOver').addEventListener('click', function () {
        if (gameRun){
            if (minValue === maxValue){
                const phraseRandom = Math.round( Math.random() * 3);
                switch (phraseRandom) {
                    case 1:
                        answerField.innerText = answerPhrase = `Такого числа ещё не придумали!\n\u{1F914}`
                        break;
                    case 2:
                        answerField.innerText = answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`
                        break;
                    case 3:
                        answerField.innerText = answerPhrase = `Не жульничай!\n\u{1F914}`
                        break;    
                    default:
                        answerField.innerText = answerPhrase = `Я сдаюсь..\n\u{1F92F}`;
                        break;
                }
                gameRun = false;
            } else {
                minValue = answerNumber + 1;
                answerNumber  = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = parseInt(orderNumber);
                answerField.innerText =answerNumber >= 0 ? numberToWords(answerNumber).length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToWords(answerNumber)}?` : `Вы загадали число ${answerNumber}?` : numberToWords(answerNumber).length < 20 ? `Вы загадали число минус ${numberToWords(answerNumber)}?` : `Вы загадали число минус  ${Math.abs(answerNumber)}?`;
            }
        }
    });

// Кнопка Меньше

    document.querySelector('#btnLess').addEventListener('click', function () {
        if (gameRun){
            if (minValue === maxValue || minValue == answerNumber){
                const phraseRandom = Math.round( Math.random() * 3);
                switch (phraseRandom) {
                    case 1:
                        answerField.innerText = answerPhrase = `Такого числа ещё не придумали!\n\u{1F914}`
                        break;
                    case 2:
                        answerField.innerText = answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`
                        break;
                    case 3:
                        answerField.innerText = answerPhrase = `Не жульничай!\n\u{1F914}`
                        break;
                    default:
                        answerField.innerText = answerPhrase = `Я сдаюсь..\n\u{1F92F}`;
                        break;
                }
                gameRun = false;
            } else {
                maxValue = answerNumber - 1;
                answerNumber  = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = parseInt(orderNumber);
                answerField.innerText = answerNumber >= 0 ? numberToWords(answerNumber).length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToWords(answerNumber)}?` : `Вы загадали число ${answerNumber}?` : numberToWords(answerNumber).length < 20 ? `Вы загадали число минус ${numberToWords(answerNumber)}?` : `Вы загадали число минус  ${Math.abs(answerNumber)}?`;
            }
        }
    });

// Кнопка Верно

    document.querySelector('#btnEqual').addEventListener('click', function () {
        if (gameRun){
            const random = Math.round( Math.random() * 3)
            switch (random) {
                case 1:
                    answerField.innerText = `Было легко\n\u{1F60E}`;
                    break;
                case 2:
                    answerField.innerText = `Я у тебя в голове!\n\u{1F60E}`;
                    break;
                case 3:
                    answerField.innerText = `Я всё знаю!\n\u{1F60E}`;
                    break;            
                default:
                    answerField.innerText = `Я всегда угадываю\n\u{1F60E}`;
                    break;
            }
            gameRun = false;
        }
    });
});