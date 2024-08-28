
export function renderCheckoutHeader(itemQuantity)
{
  let html = `
    Checkout (<a class="return-to-home-link js-checkout-items-num"
            href="amazon.html">${itemQuantity} items</a>)
  `;

  document.querySelector('.checkout-header-middle-section').innerHTML = html;
}