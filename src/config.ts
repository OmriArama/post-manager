export interface IConfigInterface {
    mongoConnectionString: string;
    createRequestName: string;
    getRequestName: string
}


export const Config: IConfigInterface = {
    mongoConnectionString: 'mongodb+srv://Admin:Jbz5rkMXBS6n6MyX@cluster0-cfbwn.mongodb.net/postManager?retryWrites=true&w=majority',
    createRequestName: "createPost",
    getRequestName: "getPosts"
}

