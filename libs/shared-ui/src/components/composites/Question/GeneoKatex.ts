//Katex has to be loaded separately.
//The size is quite big which significantly impacts our initial load times.

import katex from 'katex';
import 'katex/dist/katex.min.css';

// declare var katex: any;
export interface KatexRenderPartModel {
  text: string;
  type: KatexRenderType;
}

export type KatexRenderType = 'inline' | 'block' | 'none';
export const defaultCenterAlignClassName = 'katex-genius-content-center';
export class GeneoKatex {
  private renderParts: KatexRenderPartModel[];
  constructor(
    public rawString: string,
    public centerAlignClassName: string = defaultCenterAlignClassName
  ) {
    if (!katex || typeof katex.renderToString !== 'function') {
      console.log(
        "'katex' is not loaded. This should not happen. Please contact Geneo Team.",
        'INVALID_STATE'
      );
    }

    this.renderParts = this.processRawString(rawString);
  }

  isParsable(): boolean {
    return this.renderParts.every((part) => {
      if (part.type !== 'none') {
        try {
          katex.renderToString(part.text);
        } catch (e) {
          console.error(e);
          return false;
        }
      }

      return true;
    });
  }

  parsedHtml(): string {
    const parts = this.renderParts;
    const html = parts
      .map((part, i) => {
        if (part.type === 'inline') {
          return this.parseLatex(part.text);
        } else if (part.type === 'block') {
          let html = '';
          if (i > 0 && parts[i - 1].type !== 'block') html += ''; //html += "<br/><br/>"
          html += `<span class="${this.centerAlignClassName}">${this.parseLatex(
            part.text
          )}</span>`;
          if (i < parts.length - 1) html += ''; //html += "<br/>"
          return html;
        }

        return part.text;
      })
      .join('');

    const a = this.processRawString(html);

    return html;
  }

  private parseLatex(text: string): string {
    try {
      return katex.renderToString(text);
    } catch (e) {
      console.error(e);
      throw new Error(`${text} is not parsable by Katex`);
    }
  }

  private processRawString(str: string): KatexRenderPartModel[] {
    const group1 = '\\$\\$(.*?)\\$\\$';
    const group2 = '##(.*?)##';
    const regex = new RegExp(
      `((?:${this.rmGroups(group1)})|(?:${this.rmGroups(group2)}))`
    );

    const parts = str.split(regex);

    const group1Regex = new RegExp(group1);

    const group2Regex = new RegExp(group2);

    return parts
      .filter((p) => p)
      .map<KatexRenderPartModel>((part) => {
        if (group1Regex.test(part)) {
          return {
            text: part.replace(group1Regex, '$1'),

            type: 'block',
          };
        } else if (group2Regex.test(part)) {
          return {
            text: part.replace(group2Regex, '$1'),

            type: 'inline',
          };
        } else {
          return {
            text: part,

            type: 'none',
          };
        }
      });
  }

  private rmGroups(str: string): string {
    return str.replace(/[()]/g, '');
  }
}
