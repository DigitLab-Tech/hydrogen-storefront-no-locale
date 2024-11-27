export default class Cookies {
  constructor(cookieString) {
    this.cookies = {};

    this.cookies = cookieString.split('; ').map((cookie) => cookie.split('='));
  }

  get(key) {
    const cookie = this.cookies.find((cookie) => cookie[0] === key);

    if (!cookie) {
      return null;
    }

    try {
      return JSON.parse(decodeURIComponent(cookie[1]));
    } catch (e) {
      return decodeURIComponent(cookie[1]);
    }
  }
}
