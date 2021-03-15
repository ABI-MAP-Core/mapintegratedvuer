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
});

const getters = {
  getSlotById: (state) => (id) => {
    let slot = state.slotInfo.find(slotInfo => slotInfo.id === id);
    return slot;
  },
  getFirstAvailableSlot: (state) => () => {
    return state.slotInfo.find(slotInfo => slotInfo.id === 0);
  },
  getIdbySlotName: (state) => (name) => {
    let slot = state.slotInfo.find(slotInfo => slotInfo.name === name);
    return slot !== undefined ? slot.id : undefined;
  },
  isSlotActive: (state) => (slot) => {
    if (slot) {
      let view = state.viewIcons.find(view => state.activeView === view.icon);
      return (view.min >= slot.activation);
    }
    return false;
  },
}

const mutations = {
  updateActiveView(state, activeView) {
    state.activeView = activeView;
  },
  assignIdToSlot(state, payload)  {
    state.slotInfo.find(
      slotInfo => slotInfo.name === payload.slot.name).id = payload.id;
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
