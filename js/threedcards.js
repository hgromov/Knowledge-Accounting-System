document.addEventListener('DOMContentLoaded', ready);

function ready() {
  const cards = document.querySelectorAll('.card');

  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('mousemove', startRotate);
    cards[i].addEventListener('mouseout', stopRotate);
  }

  function startRotate(e){
  const cardItem = this.querySelector('.gallery-item'),
        halfHeight = cardItem.offsetHeight / 2;
        
  cardItem.style.transform = `rotateX(${-(e.offsetY - halfHeight)/3}deg) 
                              rotateY(${(e.offsetX - halfHeight)/6}deg)`;
  }

  function stopRotate(e) {
    this.querySelector('.gallery-item').style.transform = 'rotate(0)';
  }
}