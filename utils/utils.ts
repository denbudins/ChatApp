export async function wait(interval_in_ms: number): Promise<undefined> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(undefined);
    }, interval_in_ms);
  });
}

export function splitOnRandomPieces(stringToSplit: string, separator: string, limit: number): string[] {
  let splittedArray: string[] = stringToSplit.split(separator);
  if (splittedArray.length < limit) {
    const rowsForAdd: number = limit - splittedArray.length;
    for (let index: number = 0; index < rowsForAdd; index++) {
      splittedArray.push('');
    }
  } else if (splittedArray.length > limit) {
    const indexToPut: number = limit - 1;
    let mergedString: string = '';
    for (let index: number = indexToPut; index < splittedArray.length; index++) {
      mergedString += `${splittedArray[index]} `;
    }
    splittedArray = splittedArray.slice(0, indexToPut);
    splittedArray[indexToPut] = mergedString.trim();
  }
  return splittedArray;
}
