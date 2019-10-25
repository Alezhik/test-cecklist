import { observable, action, reaction, computed } from 'mobx';

export interface Travel {
  task: string
  isComplete: boolean
};

export class TravelStore {
  @observable travelList: Travel[] = [];

  constructor() {
    reaction(
      () => this.travelList.filter(travel => !travel.isComplete),
      incompletedTasks => {
        if (incompletedTasks.length > 5) {
          alert("Dude. You've got too much on your plate.")
        }
      }
    )
  }

  @computed
  get completedTasks(): number {
    return this.travelList.filter(travel => travel.isComplete).length;
  }

  @action
  addTravel(task: string) {
    this.travelList.push({ task, isComplete: false });
  }

  @action
  completeTravel(completedTravel: Travel) {
    this.travelList.find(travel => travel === completedTravel)!.isComplete = true;
  }
}

export const travelStore = new TravelStore();
