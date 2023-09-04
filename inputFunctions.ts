import messeges from "./models/messegs";

export function paresMesseges(inputMesseges: string): messeges[] {
  let allRoomsMesseges: messeges[] = [];
  const chatInfo: string[] | null = returnChatInfoArray(inputMesseges);
  const messegesArray: string[] = returnMessegArray(inputMesseges);
  let index: number = 1;
  chatInfo?.forEach((element) => {
    const id: string = element.split(/\@/)[1];
    const ANYTHING: string = element.split(/\@/)[0];
    const messeg: messeges = new messeges(
      ANYTHING,
      id,
      returnMesseg(messegesArray, index)
    );
    allRoomsMesseges.push(messeg);
    index++;
  });
  return allRoomsMesseges;
}

function returnMesseg(allMesseges: string[], index: number): string {
  return allMesseges[index];
}

function returnMessegArray(inputSting: string): string[] {
  const spliter: RegExp = /[^@\s]+\@+[A-Za-z0-9_\-]+:/gm;
  return inputSting.split(spliter);
}

function returnChatInfoArray(inputSting: string): string[] | null {
  const findingRegExp: RegExp = /[^@\s]+\@+[A-Za-z0-9_\-]+/gm;
  return inputSting.match(findingRegExp);
}
