import { JSDOM } from 'jsdom';
import { MetaTagsConstants } from './meta-tags.constants';

/* Should be split into property of the meta tag required and the suffix (like "og:")  */
const TYPESOFTAGS = ["property='og:", "name='", "itemprop='"];

export class MetaTags {
  title: string;
  description: string;
  image: string;

  importTagsFromDOM(dom: JSDOM) {
    const head = dom.window.document.head;
    for (const typeofTag of TYPESOFTAGS) {
      const { titleElement, descriptionElement, imageElement } =
        this.getTagElementsFromHead(head, typeofTag);

      this.populateWithContent(titleElement, descriptionElement, imageElement);

      if (this.tagsAreFound()) {
        this.fillInMissingTags();
        return true;
      }
    }
    return false;
  }

  private populateWithContent(
    titleElement: Element,
    descriptionElement: Element,
    imageElement: Element
  ) {
    this.title = this.getContentFromElement(titleElement);
    this.description = this.getContentFromElement(descriptionElement);
    this.image = this.getContentFromElement(imageElement);
  }

  //Should've just made an tagElements array instead for simplicity
  private getTagElementsFromHead(head: HTMLHeadElement, typeofTag: string) {
    const titleElement = head.querySelector('[' + typeofTag + "title'" + '][content]');
    const descriptionElement = head.querySelector(
      '[' + typeofTag + "description'" + '][content]'
    );
    const imageElement = head.querySelector('[' + typeofTag + "image'" + '][content]');

    return { titleElement, descriptionElement, imageElement };
  }

  private getContentFromElement(element: Element) {
    return element ? element.getAttribute('content') : null;
  }

  private tagsAreFound() {
    if (this.title === null && this.description === null && this.image === null) {
      return false;
    }
    return true;
  }

  private fillInMissingTags() {
    if (this.title === null) {
      this.title = MetaTagsConstants.titleNotFound;
    }
    if (this.description === null) {
      this.description = MetaTagsConstants.descriptionNotFound;
    }
    if (this.image === null) {
      this.image = MetaTagsConstants.imageNotFoundB64;
    }
  }
}
