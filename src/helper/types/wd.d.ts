declare module "wd" {
    namespace wd {
      interface PromiseChainWebdriver {
        init(caps: Record<string, any>): Promise<void>;
        elementById(id: string): Promise<any>;
        elementByXPath(xpath: string): Promise<any>;
        elementByAccessibilityId(id: string): Promise<any>;
        quit(): Promise<void>;
        [key: string]: any;
      }
  
      function promiseChainRemote(serverUrl: string): PromiseChainWebdriver;
    }
  
    export = wd;
  }
  