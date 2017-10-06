console.log('loading')
const sun = document.querySelector('.sun')
const orbs = document.querySelectorAll('.cell')
const walk = 100
const instructions = document.querySelector('.instructions')
const windowWidth = window.innerWidth
const windowHeight = window.innerHeight

document.documentElement.style.setProperty('--sun-top', `${(windowHeight /2) - 25}px`)
document.documentElement.style.setProperty('--sun-left', `${(windowWidth / 2) - 25}px`)
orbs.forEach(orb => shadow(orb))

let moving = false;

sun.addEventListener('mousedown', drag);
sun.addEventListener('mouseup', end);
sun.addEventListener('mouseleave', end);
document.documentElement.addEventListener('keydown', keyMove)

function drag(event) {
  hide(instructions)
  moving = true;
  let width = this.offsetWidth / 2
  let height = this.offsetHeight / 2
  sun.addEventListener('mousemove', (e) => {
    if( moving ) {
      let x = e.clientX - width;
      let y = e.clientY - height;
      document.documentElement.style.setProperty('--sun-top', `${y}px`)
      document.documentElement.style.setProperty('--sun-left', `${x}px`)

      orbs.forEach(orb => shadow(orb))
    }
  })
}

function keyMove(event) {
  let y = parseInt(document.documentElement.style.getPropertyValue('--sun-top').split('px')[0])
  let x = parseInt(document.documentElement.style.getPropertyValue('--sun-left').split('px')[0])
  let key = event.keyCode
  console.log(x, y, key)
  switch(key){
    case 38:
      document.documentElement.style.setProperty('--sun-top', `${y - 10}px`)
      break;
    case 40:
    document.documentElement.style.setProperty('--sun-top', `${y + 10}px`)
      break;
    case 39:
      document.documentElement.style.setProperty('--sun-left', `${x + 10}px`)
      break;
    case 37:
    document.documentElement.style.setProperty('--sun-left', `${x - 10}px`)
      break;
    default:
      break;
  }
}

function hide(element){
  element.classList.add('hidden')
}

function end(event) {
  moving = false;
}

function shadow(orb) {
  const sunX = parseInt(document.documentElement.style.getPropertyValue('--sun-left').split('px')[0])
  const sunY = parseInt(document.documentElement.style.getPropertyValue('--sun-top').split('px')[0])
  const { offsetWidth: width, offsetHeight: height} = document.documentElement

  let x = (orb.offsetLeft + (orb.offsetWidth/2)) - (sunX + 25);
  let y = (orb.offsetTop + (orb.offsetHeight/2)) - (sunY + 25);

  const xWalk = Math.round(x/10)
  const yWalk = Math.round(y/10)
  const blur = Math.abs(xWalk + yWalk)
  let calculated = `${xWalk}px ${yWalk}px ${blur}px 3px, inset ${-xWalk/5}px ${-yWalk/5}px ${blur}px ${blur/3}px rgba(50, 50, 50, .5), inset ${-xWalk/5}px ${-yWalk/5}px ${blur/3}px ${blur/6}px rgba(0, 0, 0, .5)`

  orb.style.boxShadow = calculated
}
