import { renderOrderSummary } from "./checkout/orderSummarys.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
//import '../data/backend-practice.js';
//import '../data/cart-class.js';
//import {Car, RaceCar} from "../../practice/scripts/data/car.js"

async function loadPage(){

  try{
    //throw 'error';
    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ]);
    

    

  }catch(error){
    console.log('Unexpected error. Please try again later.');
  };

  

  renderOrderSummary();
  renderPaymentSummary();


}

loadPage();


/*Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })

]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve)=>{
  loadProducts(()=>{
    resolve('value1');
  });

}).then((value)=>{
  console.log(value);

  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  });

}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
*/




/*
loadProducts(() => {
  loadCart(()=>{
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/


/*const car1 = new Car({brand:'Toyota', model: 'Corolla'});
const car2 = new Car({brand:'Tesla', model:'Model 3'});
const racecar1 = new RaceCar({brand: 'McLaren', model:'F1', acceleration: 20});

car1.openTrunk();
car1.closeTrunk();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();

car2.break();
car2.go();
car2.break();
car2.go();
car2.break();
car2.go();
car2.go();
car2.break();
car2.break();
car2.openTrunk();

racecar1.go();
racecar1.go();
racecar1.openTrunk();
racecar1.go();
racecar1.go();
racecar1.go();
racecar1.go();
racecar1.go();
racecar1.go();
racecar1.go();
racecar1.go();
racecar1.closeTrunk();
racecar1.go();


car1.displayInfo();
car2.displayInfo();
racecar1.displayInfo();
*/