const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const message = document.querySelector('.message');
const btn = document.querySelector('input[type="submit"');
const bmiel = document.getElementById('bmi');
const classificationEL = document.getElementById('classification');
const riskEl = document.getElementById('risk');

function isItNumber(str) {
  return /^\-?[0-9]+(e[0-9]+)?(\.[0-9]+)?$/.test(str);
}

function calculateBMI(data) {
  data.height = data.height * 0.3048;

  return data.weight / Math.pow(data.height, 2);
}

function displayBMI(bmi) {
  let temp = bmi.toString();
  temp = temp.split('.');
  temp = temp[0] + '.' + temp[1].slice(0, 2);
  bmiel.innerHTML = temp + 'kg/m<sup>2</sup>';

  let classification, risk;
  if (temp < 18.5) {
    classification = 'underweight';
    risk = 'minimal';
  } else if (temp >= 18.5 && temp <= 24.9) {
    classification = 'normal weight';
    risk = 'minimal';
  } else if (temp >= 25 && temp <= 29.9) {
    classification = 'overweight';
    risk = 'increased';
  } else if (temp >= 30 && temp <= 34.9) {
    classification = 'obese';
    risk = 'high';
  } else if (temp >= 35 && temp <= 39.9) {
    classification = 'severely obese';
    risk = 'very high';
  } else if (temp >= 40) {
    classification = 'morbidly obese';
    risk = 'extreely high';
  }

  classificationEL.innerText = classification;
  riskEl.innerText = risk;
}

btn.addEventListener('click', function (e) {
  let success;
  e.preventDefault();

  if (isItNumber(height.value) && isItNumber(weight.value)) {
    const data = {
      height: Number.parseFloat(height.value),
      weight: Number.parseFloat(weight.value),
    };
    message.innerText = 'BMI Calculated Successfully';
    message.classList.remove('hide');
    message.classList.add('show');
    message.style.backgroundColor = 'green';

    const BMI = calculateBMI(data);
    displayBMI(BMI);
  } else {
    message.innerText = 'Please check your vallue';
    message.classList.remove('hide');
    message.classList.add('show');
    message.style.backgroundColor = 'red';
  }
});
