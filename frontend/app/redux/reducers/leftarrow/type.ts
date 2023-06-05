export interface Card {
    id: number;
    title: string;
  }
  export interface User {
    userName: string;
  }
  export interface TodosState {
    cards: Card[];
    loading: boolean;
  }
  export interface UserState {
    user: User[];
    loading: boolean;
  }
  