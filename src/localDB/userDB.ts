import { Ipost, Iuser, IuserInfo } from "../interfaces/Interfaces";

export const users:Iuser[] = [{
    uid: "1",
    name: "Barry Allen"
},{
    uid: "2",
    name: "Diana Prince",
},{
    uid: "3",
    name: "Wanda Maximof",
},{
    uid: "4",
    name: "Clarke Kent",
},{
    uid: "5",
    name: "Hank Mcvoy",
},{
    uid: "6",
    name: "Billy Batson",
}]

export const userInfos:IuserInfo[] = [{
    uid: "1",
    name: "Barry Allen"
},{
    uid: "2",
    name: "Diana Prince",
},{
    uid: "3",
    name: "Wanda Maximof",
},{
    uid: "4",
    name: "Clarke Kent",
},{
    uid: "5",
    name: "Hank Mcvoy",
},{
    uid: "6",
    name: "Billy Batson",
}]

type PostList = {
    uid: string,
    posts: Ipost[]
}

export const posts: PostList[] = [{
    uid: "1",
    posts: [{
        uid: "1",
        text: `One last thing. I feel like I was stuck in some English-school + engineering college bubble for many years. I didn't understand what India was or who the average Indian was. 

        Hundreds of thousands of comments taught me who and what this country is, and burst my own bubble.`,
        creationTime: {
            seconds: 0,
            minutes: 0,
            hours: 0,
            day: 0,
            month: 0,
            year: 0,
        }
    },{
        uid: "1",
        text: "Run barry run",
        creationTime: {
            seconds: 0,
            minutes: 0,
            hours: 0,
            day: 0,
            month: 0,
            year: 0,
        }
    },{
        uid: "1",
        text: "You can hide but you can't run",
        creationTime: {
            seconds: 0,
            minutes: 0,
            hours: 0,
            day: 0,
            month: 0,
            year: 0,
        }
    }]
},{
    uid: "2",
    posts: [{
        uid: "2",
        text: "Princess of thymescira",
        creationTime: {
            seconds: 0,
            minutes: 0,
            hours: 0,
            day: 0,
            month: 0,
            year: 0,
        }
    },{
        uid: "2",
        text: "I killed things from other worlds before",
        creationTime: {
            seconds: 0,
            minutes: 0,
            hours: 0,
            day: 0,
            month: 0,
            year: 0,
        }
    },{
        uid: "2",
        text: "Wonder Woman",
        creationTime: {
            seconds: 0,
            minutes: 0,
            hours: 0,
            day: 0,
            month: 0,
            year: 0,
        }
    },{
        uid: "2",
        text: "Where is my invisible plane",
        creationTime: {
            seconds: 0,
            minutes: 0,
            hours: 0,
            day: 0,
            month: 0,
            year: 0,
        }
    }]
},{
    uid: "3",
    posts: [{
        uid: "3",
        text: "I just want my children",
        creationTime: {
            seconds: 0,
            minutes: 0,
            hours: 0,
            day: 0,
            month: 0,
            year: 0,
        }
    },{
        uid: "3",
        text: "You took everything from me",
        creationTime: {
            seconds: 0,
            minutes: 0,
            hours: 0,
            day: 0,
            month: 0,
            year: 0,
        }
    },{
        uid: "3",
        text: "What mouth ?",
        creationTime: {
            seconds: 0,
            minutes: 0,
            hours: 0,
            day: 0,
            month: 0,
            year: 0,
        }
    }]
},{
    uid: "4",
    posts: []
},{
    uid: "5",
    posts: []
},{
    uid: "6",
    posts: []
}]