interface Message {
  id: number;
  description: string;
  details: string;
}
interface Person {
  id: number;
  token: string;
  name: string;
  username: string;
  email: string;
  password: string;
  message: Array<Message>;
}

class UserMessage implements Message {
  constructor(public id: number, public description: string, public details: string) {}
}

class User implements Person {
  constructor(
    public id: number,
    public token: string,
    public name: string,
    public username: string,
    public email: string,
    public password: string,
    public message: Array<UserMessage>
  ) {}
}

export { UserMessage, User };
