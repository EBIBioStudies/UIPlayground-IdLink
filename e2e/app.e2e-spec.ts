import { IdLinkPage } from './app.po';

describe('id-link App', () => {
  let page: IdLinkPage;

  beforeEach(() => {
    page = new IdLinkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
