export interface IGetWinnerResponse {
  id: number;
  wins: number;
  time: number;
}

export interface IGetWinnersRequest {
  items: IGetWinnerResponse[];
}

export type ICreateWinnerRequest = Required<Pick<IGetWinnerResponse, 'wins' | 'time'>>;
export type IUpdateWinnerRequest = Required<Pick<IGetWinnerResponse, 'wins' | 'time'>>;
