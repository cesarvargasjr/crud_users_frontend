export const cepMask = [
  /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/
];

export const phoneNumberMask = [
  "(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/
];

export const formatText = (e: any) => (
  !/[a-zA-Z\u00C0-\u00FF ]+/i.test(e.key) && !(e.code === 'Space') ? e.preventDefault() : true
);

export const formatNumber = (e: any) => {
  const validKeys = ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete']

  return !/[0-9]/.test(e.key) && !validKeys.includes(e.code) ? e.preventDefault() : true
}
