import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption} from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

describe('test suite: addToCart', ()=> {

  beforeEach(()=>{
    spyOn(localStorage, 'setItem');
  });


  it('add an existing product to the cart', ()=> {

    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:1,
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:2,
      deliveryOptionId: '1'
    }]));
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);

  });

  it('adds a new product to the cart', ()=> {
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity:1,
      deliveryOptionId: '1'
    }]));
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});

const productId1 ='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

describe('test suite: remove from cart', ()=>{


  beforeEach(()=>{
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: productId1,
        quantity:2,
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage();
  });

  it('Remove a product that is in the cart.', ()=>{
    removeFromCart(productId1);
  
    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([]));

  });

  it('Remove a product that is not in the cart.', ()=>{
    removeFromCart(productId2);
    
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{productId: productId1,
      quantity:2,
      deliveryOptionId: '1'}]));

  });


});

describe('test suite: updateDeliveryOption',()=>{
  beforeEach(()=>{
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: productId1,
        quantity:1,
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage();
  });


  it('update the delivery option', ()=>{
    updateDeliveryOption(productId1, '3');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('3');

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId: productId1,
      quantity:1,
      deliveryOptionId: '3'
    }]));
  })

  it('update the delivery option not in cart', ()=>{
    updateDeliveryOption(productId2, '3');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('1');

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);

    expect(cart).toEqual([{
      productId: productId1,
      quantity:1,
      deliveryOptionId: '1'
    }]);
  });

  it('update the delivery option not avalible option.', ()=>{
    updateDeliveryOption(productId1, '4');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('1');

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);

    expect(cart).toEqual([{
      productId: productId1,
      quantity:1,
      deliveryOptionId: '1'
    }]);
  });
});
