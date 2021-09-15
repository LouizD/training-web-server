console.log('Hello client')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('p#message-1')
const messageTwo = document.querySelector('p#message-2')

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = search.value;
  console.log(location)

  messageOne.textContent = 'Loading'
  messageTwo.textContent = ''


  fetch('http://localhost:3000/weather?address=' + location)
  .then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
        console.log(data.location)
        console.log(data.forecast)
      }
    })
  })
  .catch(error => console.log(error))
})