type AjaxHeaders = Record<string, string>;

interface AjaxOptions {
  /**
   * Request method
   * - default: `"GET"`
   */
  method?: 'GET' | 'HEAD' | 'POST' | 'PUT';
  /** Request header */
  headers?: AjaxHeaders;
  /** data body */
  data?: string;
  /** Response type */
  responseType?: 'json' | 'arraybuffer' | 'blob';
}

/** Script interface */
export default {
  /**
   * Error log
   * @param message Method name
   */
  error(message: string) {
    const msg = `The required ${message} method is incomplete!!!`;
    console.error(msg);
  },

  /**
   * GM_xmlhttpRequest
   * @param url Request URL
   * @param options Options
   * @returns Response content
   */
  ajax(url: string, options: AjaxOptions) {
    const { method = 'GET', headers, data, responseType } = options;
    return new Promise<Tampermonkey.Response<unknown>>((resolve, reject) => {
      if (typeof GM_xmlhttpRequest === 'function') {
        GM_xmlhttpRequest({
          method,
          url,
          headers,
          data,
          nocache: true,
          responseType,
          onload: res => {
            resolve(res);
          },
          onerror: res => {
            console.error(res);
            reject(null);
          },
        });
      } else {
        this.error('GM_xmlhttpRequest');
        reject(null);
      }
    });
  },
};
