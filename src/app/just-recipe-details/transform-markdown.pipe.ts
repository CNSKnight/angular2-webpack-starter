import { Pipe, PipeTransform } from '@angular/core';
import * as MarkdownIt from 'markdown-it';
/*
 * Transform Markdown to HTML with MarkdownIt
*/
@Pipe({
  name: 'transformMarkdown'
})
export class transformMarkdownPipe implements PipeTransform {
  md: any;
  constructor() {
    this.md = MarkdownIt({html: true, linkify: false, html_inline: true, escape: false});
  }
  transform(strMrkdwn: string): string {
    return this.md.render(strMrkdwn);
  }
}
