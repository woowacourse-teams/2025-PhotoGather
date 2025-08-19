interface CookieStoreSetOptions {
  name: string;
  value: string;
  expires?: number;
  domain?: string;
  path?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

interface CookieStoreDeleteOptions {
  name: string;
  domain?: string;
  path?: string;
}

declare class CookieStore {
  get(name: string): Promise<CookieStoreGetResult | null>;
  get(options: { name: string }): Promise<CookieStoreGetResult | null>;
  getAll(name?: string): Promise<CookieStoreGetResult[]>;
  getAll(options?: { name: string }): Promise<CookieStoreGetResult[]>;
  set(options: CookieStoreSetOptions): Promise<void>;
  delete(options: CookieStoreDeleteOptions): Promise<void>;
}

interface Window {
  cookieStore: CookieStore;
}
