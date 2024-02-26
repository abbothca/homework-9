"use strict";

var order = {
    id: Symbol,
    date: new Date(2024, 1, 22, 1, 10),
    orderNumber: "340-332-4",
    user: {
        firstName: "Beatrix",
        lastName: "Kiddo",
        email: "example@google.com",
        phone: "(555) 555-1234",
    },
    delivery: {
        address: {
            city: "New York",
            streetName: "Park Avenue",
            streetNumber: "456",
            zip: "10022",
            suiteNumber: 102
        },
        service: {
            name: "USPS",
            price: 6,
            deliveryTime: 5
        }
    },
    payment: {
        method: "online",
        hasPaid: true,
    },
    shoppingList: {
        "BB5481": {
            name: "Gazelle Originals",
            color: "blue",
            link: "https://www.adidas.ua/adidas-bb5481-1",
            amount: 1,
            size: "9US",
            price: 93.53,
            discountPercent: 15,
        },
        "GH7306": {
            name: "Tiro 21 Performance",
            color: "black",
            link: "https://www.adidas.ua/shtani-tiro-21-performance-gh7306",
            amount: 2,
            size: "XS",
            price: 62.13,
            discountPercent: 0,
        }
    },
    promocode: {
        code: "last-chance",
        percent: 15
    },

    calcOrderPrice() {
        const deliveryPrice = this.delivery?.service?.price;
        let price = 0;
        for (let item in this.shoppingList) {
            price += this.shoppingList[item]?.price * this.shoppingList[item]?.amount * (1 - this.shoppingList[item]?.discountPercent / 100);
        };
        return {
            fullPrice: +(price + deliveryPrice).toFixed(2),
            priceWithPromo: +(price * (1 - this.promocode?.percent / 100) + deliveryPrice).toFixed(2),
        };
    },

    getExpectedDataDelivery() {
        let expectingDateOrdering = new Date(this.date);
        expectingDateOrdering.setDate(expectingDateOrdering.getDate() + this.delivery?.service?.deliveryTime);
        return expectingDateOrdering.toDateString();
    },
    getShopList() {
        let orderDescribe = " Your order includes:\n";
        for (let item in this.shoppingList) {
            orderDescribe += `| ${item} | ${this.shoppingList[item]?.name} | color ${this.shoppingList[item]?.color} | ${this.shoppingList[item]?.amount} * ${this.shoppingList[item]?.price} | discount -${this.shoppingList[item]?.discountPercent}% | \n`;
        };
        return orderDescribe;
    },

};

//Прив'язуємо контекст виклику функцій
let calcOrderPrice = order.calcOrderPrice.bind(order),
    getExpectedDataDelivery = order.getExpectedDataDelivery.bind(order),
    getShopList = order.getShopList.bind(order);

const interval = 1500; 
//оскільки функції повертають тільки значення і нічого не виводять в консоль - в таймаути передаю аннонімні функції, які і викликатимуть ті методи, які описані вище

setTimeout(function () {
    console.log(`setTimeout for calcOrderPrice() after ${interval / 1000}sec`);
    console.log(calcOrderPrice());
}, interval);

setTimeout(function () {
    console.log(`setTimeout for getExpectedDataDelivery() after ${2 * interval / 1000}sec`);
    console.log(getExpectedDataDelivery());
}, 2 * interval);


setTimeout(function () {
    console.log(`setTimeout for getShopList() after ${3 * interval / 1000}sec`);
    console.log(getShopList());
}, 3 * interval);

// order = {};                   //кожен setTimeout спрацює коректно, виведе очікувано дані прив'язані до початкового об'єкта order
// order = null;                 //кожен setTimeout спрацює коректно, виведе очікувано дані прив'язані до початкового об'єкта order
order.shoppingList = {};         //жоден setTimeout не спрацює так як очікувала, виведе вже з урахуванням внесених модифікацій об'єкта order

console.log("order = ", order);