interface User {
  id: number;
  name: string;
  email: string;
  picture?: string;
  // password: string;
  // createdAt: Date;
  // updatedAt: Date;
  // deletedAt: Date;
}

interface ICredentials {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
