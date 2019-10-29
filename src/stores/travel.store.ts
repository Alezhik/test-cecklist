import { observable, action } from 'mobx';
import { messageStore } from './message.store';
import { thingStore } from './thing.store';
import categorys from '../components/thingsCategory/catrgoris.json';

export interface Travel {
  thing_id: number
  isComplete: boolean
  count: number
  id: number
};

export class TravelStore {
  @observable travelList: Travel[] = [];
  @observable messageStore = messageStore;
  @observable thingStore = thingStore;

  idInList: number = 0;

  @action
  createNewTravelList() {
    let things: any[] = [];
    categorys.categoris.forEach(category => {
      const newThings = thingStore.getThingToCategory(category.id, category.defaultThings);
      things = [ ...things, ...newThings ];
    })

    things.forEach(thing => this.addTravel(thing.name, thing.category_id));
  }

  constructor() {
    this.createNewTravelList();
  }

  @action
  getIdInList(): number {
    return this.idInList++;
  }

  @action
  setCompleted(id: number, isComplete: boolean = true) {
    this.travelList.find(travel => travel.id === id)!.isComplete = isComplete;
  }

  @action
  getTravel(name: string): Travel | undefined {
    const duplicateThing = thingStore.getThing(undefined, name);
    if (!duplicateThing) {
      return undefined
    }
    return this.travelList.find(travel => travel.thing_id === duplicateThing.id);
  }

  @action
  addTravel(name: string, category_id: number = 7) {
    const duplicateThing = this.getTravel(name);
    if (!duplicateThing) {
      const newThingId = thingStore.addThing(name, category_id);
      this.travelList.push({ 
        thing_id: newThingId,
        isComplete: false,
        id: this.getIdInList(),
        count: 1
      });
    } else {
      this.messageStore.addMessage({ message: "This thing is already in your list", show: true });
    }
  }

  @action
  removeTravel(id: number) {
    const deletedTravelID = this.travelList.findIndex(travel => travel.id === id);
    thingStore.changeCount(this.travelList[deletedTravelID].thing_id, false);
    this.travelList.splice(deletedTravelID, 1);
  }

  @action
  editTravel(id: number, name: string, category_id: number = 7, count: number) {
    const travelIndex = this.travelList.findIndex(thing => thing.id === id);
    const oldThing = thingStore.getThing(this.travelList[travelIndex].thing_id);
    const newTravel = travelStore.getTravel(name);
    const newThing = thingStore.getThing(undefined, name);

    if (!!newTravel && newThing!.id !== oldThing!.id) { 
      thingStore.changeCount(oldThing!.id, false);
      travelStore.removeTravel(id);
      return null
    } else {
      if (oldThing!.countUse === 1 || newThing!.id === oldThing!.id) {
        thingStore.editThing(oldThing!.id, name, category_id);
      } else {
        this.addTravel(name, category_id);
      }
    }

    this.travelList[travelIndex].count = count;
  }

  @action
  clearTravelList() {
    this.travelList = [];
  }
}

export const travelStore = new TravelStore();
