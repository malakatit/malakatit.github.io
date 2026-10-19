console.log("site.js is linked correctly!");


const hours = new Date().getHours(); // get the current hour

const isMorning = hours >= 4 && hours < 12;   // is it morning?
const isAfternoon = hours >= 12 && hours < 17; // is it afternoon?
const isEvening = hours >= 17 || hours < 4;    // is it evening?

let message;

if (isMorning) {
  message = "Good morning! Thanks for stopping by.";
} else if (isAfternoon) {
  message = "Good afternoon! Glad you're here.";
} else if (isEvening) {
  message = "Good evening! Thanks for visiting.";
}

document.getElementById("welcome").textContent = message;

// Secret Message 
localStorage.setItem(
  "It's a secret to everybody.",
  "You weren't supposed to find this. Or were you."
);


// Carousel


const urls = [
    './img/Pride and Prejudice.jpg',
    './img/The Boyfriend.jpg',
    './img/Not-Quite-Dead-Yet.jpg',
    './img/Beautiful World.jpg',
    './img/The Alchemist.jpg'
].map(url => { (new Image()).src = url; return url })
 
const images = document.querySelectorAll('#carousel img')
 
let currentImage = 0
const showImages = () => {
    const offset = currentImage % urls.length
    images.forEach((image, index) => {
        const imageIndex = (index + offset + urls.length) % urls.length
        image.src = urls[imageIndex]
        image.style.animation = 'none'
        image.offsetWidth
        image.style.animation = ''
    })
}
 
showImages()
 
// Previous / Next buttons
document.getElementById('prev').addEventListener('click', () => {
    currentImage--
    showImages()
})
 
document.getElementById('next').addEventListener('click', () => {
    currentImage++
    showImages()
})
 
// Automatically advance every 5 seconds
setInterval(() => {
    currentImage++
    showImages()
}, 5000)