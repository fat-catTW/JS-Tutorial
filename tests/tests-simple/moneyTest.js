import {formatCurrency} from '../../scripts/utils/money.js';


describe('test suite: renderOrderSummary', ()=>{

  it('Rounds down to nearest cent.', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  })

  it('Negative number.', ()=> {
    expect(formatCurrency(-2000)).toEqual('-20.00');
  })

  
});

