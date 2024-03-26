import { Response, StatusCodeType } from './Response.js';
import { ResponseStatus } from '../common/ResponseStatus.js';
import { PostResponseBody } from './ResponseBody.js';
import { Request as expressRequest, Response as expressResponse } from 'express';

export class CreatedResponse implements Response {
    public readonly StatusCode: StatusCodeType;
    public readonly Body: PostResponseBody;

    constructor(message: string, createdId: number){
        this.StatusCode = StatusCodeType.CREATED;
        this.Body = {
            status: ResponseStatus.SUCCESS,
            message: message,
            CreatedId: createdId
        }
    }

    buildResponse (req: expressRequest, res: expressResponse ) {
        res.status(this.StatusCode).json(this.Body);
    }
}
