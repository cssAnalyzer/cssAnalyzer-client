const shuffle = (array) => {
  let currentIndex = 52;
  let randomIndex = 0;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]]
      = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

const randomizeData = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const arrayedInput = alphabet.split("");

  const d0 = shuffle(arrayedInput);
  const d1 = [];
  const d2 = [];

  for (let i = 0; i < Math.random(1, arrayedInput.length); i++) {
    d1.push(d0[i]);
  }

  d1.forEach(d => {
    d2.push( {
      name: d,
      size: Math.random(0, 50),
    });
  });

  return d2;
}

export default randomizeData;