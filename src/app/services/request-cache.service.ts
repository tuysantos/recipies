import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

const maxAge = 30000;
@Injectable()
export class RequestCacheService  {

  cache = new Map();

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }
    return cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    let url = req.url;
    let newUrl  = this.buildCachedUrl(url);

    const entry = { url, response, lastRead: Date.now() };
    this.cache.forEach(expiredEntry => {
      let oldUrl = this.buildCachedUrl(expiredEntry.url);
        if (newUrl === oldUrl) {
          this.cache.delete(expiredEntry.url);
        }
      });

    this.cache.set(url, entry);
  }

  private buildCachedUrl(url: string): string {
    let temp = url.split('&');
    return `${temp[0]}`;
  }
}  