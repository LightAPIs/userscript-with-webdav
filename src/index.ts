import G from './common/gm';

class Webdav {
  /**
   * Constructor
   * @param domainURL WebDAV domain
   * @param user User name
   * @param password User password
   */
  constructor(private domainURL: string = '', private user: string = '', private password: string = '') {
    if (!this.domainURL.endsWith('/')) {
      this.domainURL += '/';
    }
  }

  /**
   * Generate validation request header
   * @returns Verification request header
   */
  private generateHeaders() {
    const auth = window.btoa(this.user + ':' + this.password);
    return {
      Authorization: 'Basic ' + auth,
    };
  }

  /**
   * Generate the full file URL
   * @param fileURL Relative file URL
   * @returns Full URL
   */
  private generateFullURL(fileURL: string): string {
    if (fileURL.startsWith('/')) {
      fileURL = fileURL.slice(1);
    }
    return this.domainURL + fileURL;
  }

  /**
   * Update Config
   * @param domainURL WebDAV domain
   * @param user User name
   * @param password User password
   */
  updateConfig(domainURL: string, user: string, password: string) {
    this.domainURL = domainURL;
    this.user = user;
    this.password = password;
  }

  /**
   * Download file content
   * @param fileURL Relative file URL
   * @returns Response
   */
  async download(fileURL: string) {
    const headers = this.generateHeaders();
    try {
      const res = await G.ajax(this.generateFullURL(fileURL), {
        method: 'GET',
        headers,
      });
      return {
        status: res.status,
        data: res.responseText,
      };
    } catch {
      return {
        status: -1,
        data: '',
      };
    }
  }

  /**
   * Upload file content
   * @param fileURL Relative file URL
   * @param data Data
   * @returns Response
   */
  async upload(fileURL: string, data: string) {
    const headers = this.generateHeaders();
    try {
      const res = await G.ajax(this.generateFullURL(fileURL), {
        method: 'PUT',
        headers,
        data,
      });
      return {
        status: res.status,
        data: res.response,
      };
    } catch {
      return {
        status: -1,
        data: null,
      };
    }
  }
}

export default Webdav;
