declare type ApiResponse <A> = {
    statusCode: number,
    message : string,
    content : A,
}