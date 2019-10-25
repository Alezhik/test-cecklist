import { observable, action, reaction, computed } from 'mobx';

export interface Thing {
  name: string
  category: string
  synonyus: string[]
  useCount: number
  isComplete: boolean
  id: number
  count: number
};

export interface Message {
  message: string
  show: boolean
};

export class TravelStore {
  @observable travelList: Thing[] = [];
  @observable message: Message = { message: "", show: false };
  idCount: number = 0;

  constructor() {
    reaction(
      () => this.travelList.filter(thing => !thing.isComplete),
      incompletedThings => {
        if (incompletedThings.length > 5) {
          alert("Dude. You've got too much on your plate.")
        }
      }
    )
  }

  @computed
  get completedThings(): number {
    return this.travelList.filter(thing => thing.isComplete).length;
  }

  @action
  findThings(name: string): Boolean {
    return this.travelList.filter(thing => thing.name === name).length === 0;
  }

  @action
  addMessage(message: Message) {
    this.message.message = message.message;
    this.message.show = message.show;
    return message;
  }

  @action
  getId(): number {
    return this.idCount++;
  }

  @action
  addTravel(name: string, category: string = "first") {
    if (this.findThings(name)) {
      this.travelList.push({ 
        name, 
        isComplete: false, 
        category,
        synonyus: [],
        useCount: 1,
        id: this.getId(),
        count: 1
      });
    } else {
      this.addMessage({ message: "This thing is already in your list", show: true });
    }
  }

  @action
  completeTravel(completedTravel: Thing) {
    this.travelList.find(thing => thing === completedTravel)!.isComplete = true;
  }

  @action
  removeTravel(id: number) {
    this.travelList.splice(this.travelList.findIndex(thing => thing.id === id), 1);
  }

  @action
  editTravel(id: number, name: string, category: string = "first", count: number) {
    const thingIndex = this.travelList.findIndex(thing => thing.id === id);
    this.travelList[thingIndex].name = name;
    this.travelList[thingIndex].category = category;
    this.travelList[thingIndex].count = count;
    this.travelList = [...this.travelList];
  }
}

export const travelStore = new TravelStore();
