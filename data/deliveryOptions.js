import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import isWeekend from '../../practice/scripts/isWeekend.js';

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
},{
  id: '2',
  deliveryDays: 3,
  priceCents:499
},{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId)
{
  let deliveryOption;

  deliveryOptions.forEach((options)=> {
    if(options.id === deliveryOptionId)
    {
      deliveryOption = options
    }
  });

  return deliveryOption || deliveryOption[0];
}


export function calculateDeliveryDate(deliveryOption)
{
  let today = dayjs();
  let daysToAdd = deliveryOption.deliveryDays;

  while(daysToAdd > 0)
  {
    today = today.add(1, 'days');
    while(isWeekend(today))
    {
      today = today.add(1, 'days');
    }
    daysToAdd--;
  }
    
  const deliveryDate = today;
  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  )

  return dateString;
}