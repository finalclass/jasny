class Config {

  public publicDir:string;
  public port:number;
  public allowCORSFromAll:boolean;

  constructor() {
    this.port = 3913;
    this.allowCORSFromAll = false;
    this.publicDir = '../public';
  }

}

export = Config;