console.log('client side JavaScript loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = 'Location: ' + data.location.location;
                messageTwo.textContent = 'The weather is ' + (data.forecast.weather_desc[0]).toLowerCase() + '. ';
                messageTwo.textContent += 'The temperature is currently ' + data.forecast.temperature + '\xB0C' + ' but feels like ' + data.forecast.feelslike + '\xB0C. ';
                messageTwo.textContent += 'The humidity is ' + data.forecast.humidity + '%.';
            }
        })
    });
});