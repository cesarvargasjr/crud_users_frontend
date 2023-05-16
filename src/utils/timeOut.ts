export function timeOut(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}