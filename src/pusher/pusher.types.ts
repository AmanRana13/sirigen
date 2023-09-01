/* eslint-disable no-unused-vars */
import {PusherConnectionStatus} from './../globals/enums';

export type PusherSateChangeHandler = (status: PusherConnectionStatus) => void;
export type TListenEventHandler = (data: any) => void;

export interface IPusherApp {
  unsubscribeAppChannel(): void;
  unsubscribeAllEvent(): void;
  establishConnection(pusherKey: string, pusherCluster: any): void;
}
