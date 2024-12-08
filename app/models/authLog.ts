export interface AuthLog{
    _id:string;
    admin:{
        _id:string;
        username:string;
    };
    ip_address: string;
    browser: string;
    os:string;
    is_mobile:string;
    date:string;
}