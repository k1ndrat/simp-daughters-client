interface IError {
  data: {
    message: string | string[];
    error: string;
    statusCode: string;
  };
  status: number;
}
