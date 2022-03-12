const firePixelsArray = [];
const fireWidth = 36;
const fireHeight = 36;

function start() {
  createFireDataStructure();
  createFireSource();
  renderFire();

  setInterval(calculateFirePropagation, 50);
}

function createFireDataStructure() {
  const numberOfPixels = fireWidth * fireHeight;

  for (let i = 0; i < numberOfPixels; i++) {
    firePixelsArray[i] = 0;
  }
}

function calculateFirePropagation() {
  for (let column = 0; column < fireWidth; column++) {
    for (let row = 0; row < fireHeight; row++) {
      const pixelIndex = column + fireWidth * row;
      updateFireIntensityPerPixel(pixelIndex);
    }
  }

  renderFire();
}

function updateFireIntensityPerPixel(currentPixelIndex) {
  const belowPixelIndex = currentPixelIndex + fireWidth;

  if (belowPixelIndex >= fireWidth * fireHeight) {
    return;
  }

  const decay = Math.floor(Math.random() * 3);
  const belowPixelFireIntensity = firePixelsArray[belowPixelIndex];
  const newFireIntensity =
    belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0;

  firePixelsArray[currentPixelIndex] = newFireIntensity;
}

function renderFire() {
  let html = `<table cellpadding="0" cellspacing="0">`;
  for (let row = 0; row < fireHeight; row++) {
    html += `<tr>`;

    for (let col = 0; col < fireWidth; col++) {
      const pixelIndex = col + fireWidth * row;
      const fireIntensity = firePixelsArray[pixelIndex];

      html += `<td>`;
      html += fireIntensity;
      html += `</td>`;
    }

    html += `</tr>`;
  }
  html += `</table>`;

  document.querySelector("#fireCanvas").innerHTML = html;
}

function createFireSource() {
  for (let column = 0; column < fireWidth; column++) {
    const overflowPixelIndex = fireWidth * fireHeight;
    const pixelIndex = overflowPixelIndex - fireWidth + column;

    firePixelsArray[pixelIndex] = 36;
  }
}

start();
