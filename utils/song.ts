export function handleSingerName(arr: any[]) {
  return arr.reduce((p: any, n: any) => p + n.name + " ", "");
}
