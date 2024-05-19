interface IError {
  data: {
    message: string | string[];
    error: string;
    statusCode: string;
  };
  status: number;
}
// data : {message: 'Wrong login or password', error: 'Unauthorized', statusCode: 401}
// status: 401
