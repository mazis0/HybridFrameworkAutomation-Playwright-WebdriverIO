class GlobalState {
    private static _instance: GlobalState;
    private cartProducts: string[] = [];
    private cartProductsMobile: string[] = [];
  
    private constructor() {} // mencegah instansiasi langsung
  
    public static getInstance(): GlobalState {
      if (!GlobalState._instance) {
        GlobalState._instance = new GlobalState();
      }
      return GlobalState._instance;
    }
  
    public addProduct(productName: string): void {
      this.cartProducts.push(productName);
    }

    public removeProduct(productName: string): void {
        this.cartProducts = this.cartProducts.filter(p => p !== productName);
    }
  
    public getProducts(): string[] {
      return this.cartProducts;
    }
  
    public clearProducts(): void {
      this.cartProducts = [];
    }

    public addProductMobile(productName: string): void {
        this.cartProductsMobile.push(productName);
      }
    
      public getProductsMobile(): string[] {
        return this.cartProductsMobile;
      }

      public removeProductMobile(productName: string): void {
        this.cartProductsMobile = this.cartProductsMobile.filter(p => p !== productName);
    }
    
      public clearProductsMobile(): void {
        this.cartProductsMobile = [];
      }
  }
  
  export default GlobalState;
  