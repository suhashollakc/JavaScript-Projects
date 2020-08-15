const currencyEle_one = document.getElementById('currency-one');
const amountEle_one = document.getElementById('amount-one');
const currencyEle_two = document.getElementById('currency-two');
const amountEle_two = document.getElementById('amount-two');

const rateEle = document.getElementById('rate');
const swap = document.getElementById('swap')

//Fetch exchange rates and update the DOM
function calculate() {

    const currency_one = currencyEle_one.value;
    const currency_two = currencyEle_two.value;

    fetch(` https://v6.exchangerate-api.com/v6/86ddbd068918dbccc1f0d0ce/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);

            const rate = data.conversion_rates[currency_two];

            rateEle.innerText = `1 ${currency_one} = ${rate} ${currency_two}`

            amountEle_two.value = (amountEle_one.value * rate).toFixed(2);

        });



}

//Event Listeners

swap.addEventListener('click', () => {
    const temp = currencyEle_one.value;
    currencyEle_one.value = currencyEle_two.value;
    currencyEle_two.value = temp;
    calculate();
});

currencyEle_one.addEventListener('change', calculate);
amountEle_one.addEventListener('input', calculate);
currencyEle_two.addEventListener('change', calculate);
amountEle_two.addEventListener('input', calculate);

calculate();