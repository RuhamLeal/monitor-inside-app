export {};

declare global {
  namespace Express {
      interface Request {
        user:  {
          id: number;
          email: string;
          admin: boolean;
        }
      }
  }
}
