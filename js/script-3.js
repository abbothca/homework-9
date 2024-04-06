"use strict";

const order = {
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
            suiteNumber: "102",
        },
        service: {
            name: "USPS",
            price: "6",
            deliveryTime: "5"
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
            price: "93.53",
            discountPercent: "15",
        },
        "GH7306": {
            name: "Tiro 21 Performance",
            color: "black",
            link: "https://www.adidas.ua/shtani-tiro-21-performance-gh7306",
            amount: "2",
            size: "XS",
            price: "62.13",
            discountPercent: "0",
        }
    },
    promocode: {
        code: "last-chance",
        percent: "15"
    },

    calcOrderPrice() {   //використовую унарні +, бо всі значення рядкові (треба спочатку звести до number, перш ніж проводити обчислення)
        const deliveryPrice = +this.delivery?.service?.price; //вартість доставки
        let price = 0;
        for (let item in this.shoppingList) {
            //вартість кожного товару зі списку з урахуванням кількості і знижки на товар
            price += +this.shoppingList[item]?.price * +this.shoppingList[item]?.amount * (1 - +this.shoppingList[item]?.discountPercent / 100);
        };
        return {
            fullPrice: +(price + deliveryPrice).toFixed(2), //повна вартість товарів з доставкою
            priceWithPromo: +(price * (1 - +this.promocode?.percent / 100) + deliveryPrice).toFixed(2),  //вартість товарів з урахуванням промокоду
        };
    },

    getExpectedDataDelivery() {
        let expectingDateOrdering = new Date(this.date);
        expectingDateOrdering.setDate(expectingDateOrdering.getDate() + this.delivery?.service?.deliveryTime);
        return expectingDateOrdering.toDateString(); //очікувана дата досткавки товару
    },
    getShopList() {
        let orderDescribe = " Your order includes: \n ______________________________________________\n";
        for (let item in this.shoppingList) {
            orderDescribe += `| ${item} | ${this.shoppingList[item]?.name} | color ${this.shoppingList[item]?.color} | ${this.shoppingList[item]?.amount} * ${this.shoppingList[item]?.price} | discount -${this.shoppingList[item]?.discountPercent}% | \n`;
        };
        orderDescribe += " ______________________________________________\n";
        return orderDescribe;
    },

};

console.log("calcOrderPrice ", order.calcOrderPrice());
console.log("getExpectedDataDelivery ", order.getExpectedDataDelivery());
console.log("getShopList ", order.getShopList());