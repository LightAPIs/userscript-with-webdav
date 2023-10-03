# userscript-with-webdav

Connect WebDAV in the Tampermonkey/Violentmonkey script.

## Installation

in userscript:

```jsvascript
// @require  https://cdn.jsdelivr.net/npm/userscript-with-webdav@latest/index.iife.js
// @grant    GM_xmlhttpRequest
// @connect  *
```

or embed:

```shell
npm install userscript-with-webdav
```

## Usage

When embed:

```javascript
import Webdav from 'userscript-with-webdav';
```

## Type

```typescript
class Webdav {
  /**
   * Constructor
   * @param domainURL WebDAV domain
   * @param user User name
   * @param password User password
   */
  constructor(domainURL?: string, user?: string, password?: string);
  /**
   * Update Config
   * @param domainURL WebDAV domain
   * @param user User name
   * @param password User password
   */
  updateConfig(domainURL: string, user: string, password: string): void;
  /**
   * Download file content
   * @param fileURL Relative file URL
   * @returns Response
   */
  download(fileURL: string): Promise<
    | {
        status: number;
        data: string;
      }
    | {
        status: number;
        data: null;
      }
  >;
  /**
   * Upload file content
   * @param fileURL Relative file URL
   * @param data Data
   * @returns Response
   */
  upload(
    fileURL: string,
    data: string
  ): Promise<{
    status: number;
    data: any;
  }>;
}
```

## License

[MIT](./LICENSE)
