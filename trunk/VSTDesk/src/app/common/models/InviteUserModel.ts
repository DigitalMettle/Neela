export class InviteUserModel  {
    public Email: string;
    public Id: number[];
    public UserName: string;
  
    constructor() {
        this.Email = "";
        this.Id = [];
        this.UserName = "";
   }
}