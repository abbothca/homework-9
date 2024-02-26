"use strict";
detonatorTimer(5);

function detonatorTimer(delay) {
    let counter = delay;                      //запам'ятовую вхідне значення параметра в лічильник counter, щоб не змінювати вхідні дані і не вносити зміни в зовнішній код
    const idInterval = setInterval(() => {
        if (counter > 0) {                      //спочатку i>0 бо очікую, що частіше буде число, то умова проходитиме
            console.log(counter--);             //виводжу значення лічильника і зменшую після цього його на 1
        } else {                              //Використовую else бо треба, щоб минула секунда, перш ніж виведеться "BOOM!"
            console.log("BOOM!")              //Або треба писати зайву перевірку, щоб замінити "0" на "BOOM!" 
            clearInterval(idInterval);
        }
    }, 1000);
}            