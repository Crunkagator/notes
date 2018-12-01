export class Note {
  public text: string;
  public tags?: Array<string>;
  constructor(text: string, tags?: Array<string>) {
    this.text = text;
    this.tags = tags;
  }
}
