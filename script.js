const tantar = document.querySelector('.mosquito');
const bkgrnd = document.querySelector('body');
const scor = document.querySelector('p');

let posX = Math.random() * window.innerWidth;
let posY = Math.random() * window.innerHeight;
let targetX, targetY;
let speed = 1;
let dog = Math.floor(Math.random() * 8)+1;
let test = 0;  
let dogTimer = null;

function newTarget() {
  targetX = Math.random() * (window.innerWidth - 100);
  targetY = Math.random() * (window.innerHeight - 100);
}

function moveSmoothly() {
  const dx = targetX - posX;
  const dy = targetY - posY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 5) newTarget();
  else {
    posX += (dx / distance) * speed;
    posY += (dy / distance) * speed;
  }

  tantar.style.left = posX + "px";
  tantar.style.top = posY + "px";

  requestAnimationFrame(moveSmoothly);
}

tantar.addEventListener("click", () => {
  let currentScore = parseInt(scor.innerHTML);
  //tantar.src.include('doggo')
  if (test === 1) {
    scor.innerHTML = currentScore - 1;  
    dog = Math.floor(Math.random() * 8)+1;
    test = 0;                          
    tantar.src = './photos/tantar.png';  
    clearTimeout(dogTimer);
    return;
  }

  posX = Math.random() * (window.innerWidth - 100);
  posY = Math.random() * (window.innerHeight - 100);
  tantar.style.left = posX + "px";
  tantar.style.top = posY + "px";
  newTarget();

  scor.innerHTML = currentScore + 1;

  if (parseInt(scor.innerHTML) === dog && test === 0) {
    tantar.src = './photos/doggo.png';
    test = 1;

    dogTimer = setTimeout(() => {
      tantar.src = './photos/tantar.png';
      test = 0;
    }, 3000);
  }

  if (scor.innerHTML === '10') {
    tantar.style.display = 'none';
    const winText = document.createElement('h1');
    winText.innerText = "You Win!";
    bkgrnd.appendChild(winText);
    bkgrnd.style.background = 'green';
    winText.style.textAlign = 'center';
    winText.style.marginTop = '20%';
  }
});

tantar.style.position = 'absolute';
tantar.style.left = posX + 'px';
tantar.style.top = posY + 'px';

newTarget();
moveSmoothly();
