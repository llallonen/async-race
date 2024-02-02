export interface IGetCarResponse {
  id: number;
  name: string;
  color?: string;
}

export interface IGetCarsRequest {
  items: IGetCarResponse[];
  count: number;
}

export type ICreateCarRequest = Required<Pick<IGetCarResponse, 'name' | 'color'>>;
export type IUpdateCarRequest = Required<Pick<IGetCarResponse, 'name' | 'color'>>;
