import { Pipe, PipeTransform } from '@angular/core';
import * as MarkdownIt from 'markdown-it';
/*
 * Transform Markdown to HTML with MarkdownIt
*/
@Pipe({
  name: 'myTransformMarkdown'
})
export class TransformMarkdownPipe implements PipeTransform {
  private md: any;
  constructor() {
    this.md = MarkdownIt({ html: true, linkify: false, html_inline: true, escape: false });
  }
  public transform(strMrkdwn: string|undefined): string {
    return (strMrkdwn ? this.md.render(strMrkdwn) : '');
  }
}
