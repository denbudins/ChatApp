import messeges from "./models/messegs";

export function outputMesseges(messegesArray: messeges[]): string {
  let outputText: string = "";
  let previusElement: messeges = new messeges("", "", "");
  messegesArray.sort((a, b) => {
    let fa = a.ID,
      fb = b.ID;

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  messegesArray.forEach((element) => {
    if (element.ID !== previusElement.ID) {
      outputText += "\n" + element.ID + ":\n\n" + element.MESSAGE + "\n";
    } else {
      outputText += element.MESSAGE + "\n";
    }
    previusElement = element;
  });

  return outputText;
}
