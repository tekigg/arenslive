import { atom } from 'jotai';

export type StreamerInfo = {
    profilePictureUrl: string;
    isLive: boolean;
    description: string;
    displayName: string;
  };


export const StreamersLoaded = atom([] as StreamerInfo[]);