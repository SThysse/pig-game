'use strict';
// choose player names
// let player1Name = prompt('Player 1 name?');
// let player2Name = prompt('Player 2 name?');

// let player1Name = document.querySelector('#name--0').innerHTML;
// let player2Name = document.querySelector('#name--1').innerHTML;

// Selecting Elements
let diceSound = new Audio('move.wav');
let winSound = new Audio('win.mp3');
let errorSound = new Audio('error.wav');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const curren0El = document.getElementById('current--0');
const curren1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnRules = document.querySelector('.btn--rules');
const btnPlayers = document.querySelector('.btn--players');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const modal2 = document.querySelector('.modal2');
const btnCloseModal2 = document.querySelector('.enter-name');

// Starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  curren0El.textContent = 0;
  curren1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    diceSound.play();
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1

    if (dice !== 1) {
      //********remeber this line for hardmode later on */
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else if (dice === 1) {
      //Switch to next player
      errorSound.play();
      currentScore = 0;
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] = scores[activePlayer] + currentScore;
    score0El.textContent = scores[0];
    score1El.textContent = scores[1];
    if (scores[activePlayer] >= 100) {
      winSound.play();
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  init();
});

btnRules.addEventListener('click', function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});

btnPlayers.addEventListener('click', function () {
  modal2.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

const closeModal2 = function () {
  modal2.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal2.addEventListener('click', function () {
  let nameOne = document.getElementById('player1--name').value;
  let nameTwo = document.getElementById('player2--name').value;
  if (nameOne !== '' && nameTwo !== '') {
    document.querySelector('#name--0').innerHTML = nameOne;
    document.querySelector('#name--1').innerHTML = nameTwo;
    closeModal2();
  } else closeModal2();
});
overlay.addEventListener('click', closeModal2);
