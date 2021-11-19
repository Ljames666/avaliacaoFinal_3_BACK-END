interface Message {
  id: string;
  description: string;
  details: string;
}
interface Person {
  id: string;
  name: string;
  email: string;
  password: string;
  message: Array<Message>;
}

class UserMessage implements Message {
  constructor(public id: string, public description: string, public details: string) {}
}

class User implements Person {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public message: Array<UserMessage>
  ) {}
}

export { UserMessage, User };
