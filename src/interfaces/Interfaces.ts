export interface Iuser{
    name: string;
    uid: string;
    bio?: string;
    dpUrl?: string;
}

export interface IuserInfo {
    name: string;
    uid: string;
    bio?: string;
    dpUrl?: string;
    posts?: Ipost[];
}

export interface Ipost {
    text?: string;
    imageUrl?: string;
    creationTime: Idate;
    uid: string;
}

export interface IpostProps extends Ipost {
    name: string;
}

export interface Idate {
    seconds: number,
    minutes: number,
    hours: number,
    day: number,
    month: number,
    year: number,
}

export interface Ijwt{
    jwt: string;
}