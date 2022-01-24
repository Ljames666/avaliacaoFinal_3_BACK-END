export interface IService {
  execute(data?: Object): Promise<any>;
}
