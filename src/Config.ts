class Config {

  public publicDir:string;
  public actionsDir:string;
  public port:number;
  public allowCORSFromAll:boolean;

  constructor() {
    this.port = 3913;
    this.allowCORSFromAll = false;
    this.publicDir = '../public';
    this.actionsDir = 'actions';
  }

}

export = Config;