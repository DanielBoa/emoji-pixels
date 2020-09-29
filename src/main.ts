const [red, green, blue] = ['&#x1F7E5;', '&#x1F7E9;', '&#x1F7E6;'];
const [width, height] = [32, 32];
const numberOfPixels = width * height;
const body = document.body;
const tv = document.getElementById('tv');
const scrollSections = [...document.querySelectorAll('.scroll-section')];

function createPixel() {
  const pixelEl = document.createElement('div');
  const redEl = document.createElement('span');
  const greenEl = document.createElement('span');
  const blueEl = document.createElement('span');

  redEl.innerHTML = red;
  greenEl.innerHTML = green;
  blueEl.innerHTML = blue;

  redEl.style.opacity = '1';
  greenEl.style.opacity = '0';
  blueEl.style.opacity = '1';

  pixelEl.append(redEl, greenEl, blueEl);

  return pixelEl;
}

const pixels = new Array(numberOfPixels).fill(null).map(createPixel);

tv.append(...pixels);

const canvas = document.createElement('canvas');
const image = document.querySelector('img');
const ctx = canvas.getContext('2d');

ctx.drawImage(image, 0, 0, width, height);
const imageData = ctx.getImageData(0, 0, width, height);

for (let i = 0; i < pixels.length; i++) {
  const imageIndex = i * 4;
  const [red, green, blue] = imageData.data.slice(imageIndex, imageIndex + 4);
  const pixel = pixels[i];
  const redEl = pixel.querySelector<HTMLElement>('span:nth-child(1)');
  const greenEl = pixel.querySelector<HTMLElement>('span:nth-child(2)');
  const blueEl = pixel.querySelector<HTMLElement>('span:nth-child(3)');

  redEl.style.opacity = `${red / 255}`;
  greenEl.style.opacity = `${green / 255}`;
  blueEl.style.opacity = `${blue / 255}`;
}

let currentSection = 0;
document.addEventListener('scroll', (e) => {
  const { scrollTop, scrollHeight } = document.documentElement;
  const numberOfSections = scrollSections.length;
  const heightOfSection = (scrollHeight / numberOfSections);
  const newSection = Math.floor(scrollTop / heightOfSection);

  if (currentSection !== newSection) {
    currentSection = newSection;
    body.dataset.currentSection = '' + currentSection;
  }
})