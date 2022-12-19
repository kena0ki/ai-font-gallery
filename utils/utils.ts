export function shuffle<T>(array:Array<T>) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function toFileChar(chr:string) {
  if ('A'<=chr&&chr<='Z') {
    return chr+'+';
  } else {
    return chr;
  }
}
