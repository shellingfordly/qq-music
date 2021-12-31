export class Cookie {
  days = 1;

  constructor(config: { days: number }) {
    this.days = config.days;
  }

  getCookie(name: string, cookie = document.cookie) {
    var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = cookie.match(reg))) return decodeURI(arr[2]);
    else return null;
  }

  delCookie(name: string) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
  }

  setCookie(name: string, value: any) {
    var exp = new Date();
    exp.setTime(exp.getTime() + this.days * 24 * 60 * 60 * 1000);
    document.cookie =
      name + "=" + encodeURI(value) + ";expires=" + exp.toUTCString();
  }

  parseCookie(str: string) {
    return str.split("; ").map((s) => s.split("="));
  }
}

export const cache = new Cookie({ days: 1 });
