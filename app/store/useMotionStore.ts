import { create } from "zustand";
import { persist } from "zustand/middleware";
import useLpStore, { LpStateProp, lpInitState, noneLp } from "./useLpStore";

type Store = LoadingState & LoadingAction;

interface State {
  switch?: boolean;
  spinStop?: boolean;
  recode?: boolean;
  sound?: boolean;
  play?: boolean;
  boxState?: boolean;
  lp?: object;
  lpSwitch? : boolean;
}

interface LoadingState {
  intro: State;
  main: State;
}

interface LoadingAction {
  setState: (
    option: keyof LoadingState,
    key: keyof State,
    state?: boolean
  ) => void;
  setChangeState: (option: keyof LoadingState, key: keyof State) => void;
  setLp: (lp: LpStateProp) => void;
  getState: (option: keyof LoadingState, key: keyof State) => boolean;
  getLp: () => LpStateProp;
  LpAnimationSwitch: () => void;
}

const initialState: LoadingState = {
  intro: {
    switch: false,
    spinStop: false,
    recode: false,
  },
  main: {
    lp: lpInitState[0],
    lpSwitch : false,
    sound: true,
    play: false,
    boxState: false,
  },
};

const actions = (set: any, get: any): LoadingAction => ({
  setState: (option, key, state = true) => {
    set((currentState: LoadingState) => ({
      ...currentState,
      [option]: {
        ...currentState[option],
        [key]: state,
      },
    }));
  },
  setLp: (lp: LpStateProp) => {
    const lpObj = lp ? lp : noneLp
    set((currentState: LoadingState) => ({
      ...currentState,
      main: {
        ...currentState["main"],
        lp: lpObj,
      },
    }));
  },
  setChangeState: (option, key) => {
    set((currentState: LoadingState) => ({
      ...currentState,
      [option]: {
        ...currentState[option],
        [key]: !currentState[option][key],
      },
    }));
  },

  getState: (option, key) => {
    const currentState = get();
    return currentState[option][key];
  },
  getLp: () => {
    const mainState = get().main;
    return mainState.lp;
  },

  LpAnimationSwitch : () => {
    set((currentState: LoadingState) => ({
      ...currentState,
      main: {
        ...currentState["main"],
        lpSwitch: true,
      },
    }));
    console.log("switch 실행")
   setTimeout(()=> {
    set((currentState: LoadingState) => ({
      ...currentState,
      main: {
        ...currentState["main"],
        lpSwitch: false,
      },
    }));
    console.log("3초뒤 switch 종료")
   },3000)

  }
});

const useMotionStore = create<Store>((set, get) => ({
  ...initialState,
  ...actions(set, get),
}));

export default useMotionStore;
