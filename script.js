const form = document.querySelector('#form');
const numberCard = document.querySelector('.number');
const nameCard = document.querySelector('#card-name');
const monthCard = document.querySelector('#month');
const yearCard = document.querySelector('#year');
const cvcCard = document.querySelector('.cvs');

const inputName = document.querySelector('#name')
const inputNumber = document.querySelector('#number')
const inputMM = document.querySelector('#mm')
const inputYY = document.querySelector('#yy')
const inputCVC = document.querySelector('#cvc')

const erroName = document.querySelector('.erro-name')
const erroNumber = document.querySelector('.erro-number')
const erroDate = document.querySelector('.erro-date')
const erroCVC = document.querySelector('.erro-cvc')

const regex = /\d/g

// Função para definir erro
function setErro(span, input) {
    span.classList.add('active');
    input.classList.add('border-erro');
}

// Função para remover erro
function removeErro(span, input) {
    span.classList.remove('active');
    input.classList.remove('border-erro');
}

// Atualiza o nome no cartão
function writeNameCard(e) {
    nameCard.innerHTML = e.target.value || "Jane Appleseed";
}

// Valida o nome (mínimo de 5 caracteres)
function isNameValidy() {
    if (inputName.value.length <=5 && inputName.value === "") {
        setErro(erroName, inputName)
    }else{
        removeErro(erroName, inputName)
    }
}

// Formata o número do cartão e exibe no cartão virtual
function writeNumberCard(e) {
    let formattedNumber = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
    numberCard.innerHTML = formattedNumber || "0000 0000 0000 0000";
}

// Valida o número do cartão (16 dígitos numéricos)
function isNumberValidy() {
    if (!regex.test(inputNumber.value || inputNumber.value === "")) {
        setErro(erroNumber, inputNumber)
    }else{
        removeErro(erroNumber, inputNumber)
    }
}

// Valida o mês e o ano da data de expiração
function isDateValidy() {
    if ((!regex.test(inputMM.value) && inputMM.value === "") || (!regex.test(inputYY.value) && inputYY.value === "")) {
        erroDate.classList.add('active')
        inputMM.classList.add('border-erro')
        inputYY.classList.add('border-erro')
    }else{
        erroDate.classList.remove('active')
        inputMM.classList.remove('border-erro')
        inputYY.classList.remove('border-erro')
    }

}

// Valida o CVC (3 dígitos numéricos)
function isCVCValidy() {
    if (!regex.test(inputCVC.value) || inputCVC.value === "") {
        setErro(erroCVC, inputCVC)
    }else{
        removeErro(erroCVC, inputCVC)
    }
}

// Atualiza o mês no cartão
function writeMMCard(e) {
    monthCard.innerHTML = e.target.value || "00";
}

// Atualiza o ano no cartão
function writeYYCard(e) {
    yearCard.innerHTML = e.target.value || "00";
}

// Atualiza o CVC no cartão
function writeCVCCard(e) {
    cvcCard.innerHTML = e.target.value || "000";
}

// Função para submeter o formulário e validar todos os campos
function submitForm(e) {
    e.preventDefault();
    isNameValidy();
    isNumberValidy();
    isDateValidy();
    isCVCValidy();

    if (document.querySelectorAll('.border-erro').length === 0) {
       const containerSucess = document.querySelector('.container-sucess')
       form.style.display = 'none'
       containerSucess.classList.add('active', 'animate')
    }
}

form.addEventListener('submit', submitForm);

// Eventos de input para atualização e validação em tempo real
inputName.addEventListener('input', (e) => {
    writeNameCard(e);
    isNameValidy();
});

inputNumber.addEventListener('input', (e) => {
    writeNumberCard(e);
    isNumberValidy()
});

inputMM.addEventListener('input', (e) => {
    writeMMCard(e);
    isDateValidy();
});

inputYY.addEventListener('input', (e) => {
    writeYYCard(e);
    isDateValidy();
});

inputCVC.addEventListener('input', (e) => {
    writeCVCCard(e);
    isCVCValidy();
});