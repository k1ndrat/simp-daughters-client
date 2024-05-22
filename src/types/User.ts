interface User {
  id: number;
  name: string;
  email: string;
  picture?: string;
}

interface ICredentials {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
