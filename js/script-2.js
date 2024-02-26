"use strict";
detonatorTimer(3);

function detonatorTimer(delay) {
    if (delay < 1) {                           // перевіряю чи треба зупитини роботу функції
        console.log("BOOM!");                  // базис рекурсії
        return                               
    }
    console.log(delay);                      //якщо рекурсія не зупинилася, то виводжу кількість секунд, що лишилися і зменшую їх на 1
    setTimeout(detonatorTimer, 1000, delay - 1);
}   