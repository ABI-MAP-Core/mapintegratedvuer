/* eslint-disable no-alert, no-console */

const state = () => ({
  activeView: "singlepanel",
  slotInfo: [
    { name: "first", id: 1, activation: 1 },
    { name: "second", id: 0, activation: 2 },
    { name: "third", id: 0, activation: 3 },
    { name: "fourth", id: 0, activation: 4 }
  ],
  viewIcons: [
    { icon: "singlepanel", name: "Single view", min: 1 },
    { icon: "2horpanel", name: "Horizontal split", min: 2 },
    { icon: "2vertpanel", name: "Vertical split", min: 2 },
    { icon: "3panel", name: "Three panes", min: 3 },
    { icon: "4panel", name: "Four panes", min: 4 }
  ],
  splitters: { "first": 50, "second": 50, "third": 50 }
});

const getters = {
  getFirstAvailableSlot: (state) => () => {
    return state.slotInfo.find(slot => slot.id === 0);
  },
  getIdbySlotName: (state) => (name) => {
    let slot = state.slotInfo.find(slot => slot.name === name);
    return slot !== undefined ? slot.id : undefined;
  },
  getSlotById: (state) => (id) => {
    let slot = state.slotInfo.find(slot => slot.id === id);
    return slot;
  },
  getSlotByName: (state) => (name) => {
    let slot = state.slotInfo.find(slot => slot.name === name);
    return slot;
  },
  isSlotActive: (state) => (slot) => {
    if (slot) {
      let view = state.viewIcons.find(view => state.activeView === view.icon);
      return (view.min >= slot.activation);
    }
    return false;
  },
  isEntryActive: (state) => (entry) => {
    let slot = state.slotInfo.find(slot => slot.id === entry.id);
    if (slot) {
      let view = state.viewIcons.find(view => state.activeView === view.icon);
      return (view.min >= slot.activation);
    }
    return false;
  },
  getState: (state) => () => {
    return {
      activeView: state.activeView, slotInfo: state.slotInfo,
      splitters: state.splitters
    };
  },
}

const mutations = {
  assignIdToSlot(state, payload) {
    state.slotInfo.find(
      slotInfo => slotInfo.name === payload.slot.name).id = payload.id;
  },
  assignOrSwapIdToSlot(state, payload) {
    let targetSlot = state.slotInfo.find(slot => slot.id === payload.id);
    if (targetSlot)
      targetSlot.id = payload.slot.id;
    payload.slot.id = payload.id;
  },
  changeViewByAvailabilty(state) {
    let count = 0;
    for (let i = 0; i < state.slotInfo.length; i++) {
      if (state.slotInfo[i].id > 0)
        count++;
    }
    let view = state.viewIcons.find(view => view.min === count);
    if (view)
      state.activeView = view.icon;
  },
  updateActiveView(state, activeView) {
    state.activeView = activeView;
  },
  setSplitter(state, payload) {
    if (state.splitters[payload.name])
      state.splitters[payload.name] = payload.value;   
  },
  setState(state, newState) {
    if (newState) {
      state.activeView = newState.activeView;
      for (let i = 0; i < state.slotInfo.length; i++) {
        state.slotInfo[i].id = newState.slotInfo[i].id;
      }
      for (const [key, value] of Object.entries(newState.splitters)) {
        state.splitters[key] = value;
      } 
    }
  },
  setIdToPrimarySlot(state, id) {
    let availableSlot = state.slotInfo.find(slot => slot.id === 0);
    let primarySlot = state.slotInfo.find(
      slotInfo => slotInfo.name === "first");
    if (availableSlot) {
      availableSlot.id = primarySlot.id;
    }
    primarySlot.id = id;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
}