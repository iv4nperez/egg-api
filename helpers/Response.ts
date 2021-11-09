export class Response {
    constructor(
        public result: object,
        public count: number,
        public isCorrect: boolean
    ){}
}


export class ResultLogin {
    constructor(
        public result?: object,
        public menssage?: string,
        public isCorrect?: boolean,
        public token?: any
    ){}
}