import { NetMagVrPage } from './app.po';

describe('net-mag-vr App', function() {
  let page: NetMagVrPage;

  beforeEach(() => {
    page = new NetMagVrPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
