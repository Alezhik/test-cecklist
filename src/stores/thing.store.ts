import { observable, action } from 'mobx';
import things from '../constants/things/things.json';

import { filter } from 'lodash';

export interface Thing {
  name: string
  category_id: number
  synonyus_ids: number[]
  countUse: number
  id: number
};

export class ThingStore {
  idCount: number = 10;
  @observable thingList: Thing[] = things.things;

  getId(): number {
    return this.idCount++;
  }

  @action
  changeCount(id: number, sign: boolean = true) {
    const thingIndex = this.thingList.findIndex(thing => thing.id === id);
    if (sign) {
      this.thingList[thingIndex].countUse++;
    } else {
      this.thingList[thingIndex].countUse--;
    }
  }

  @action
  getThing(id: number | undefined, name?: string): Thing | undefined {
    if (id !== undefined) {
      return this.thingList.find(thing => thing.id === id);
    }
    return this.thingList.find(thing => thing.name === name);
  }

  @action
  addThing(name: string, category_id: number = 7) {
    const addIndex = this.thingList.findIndex(thing => thing.name === name);
    if (addIndex === -1) {
      const id = this.getId();
      this.thingList.push({ 
        name,  
        category_id,
        synonyus_ids: [],
        countUse: 1,
        id
      });
      return id;
    }
    this.changeCount(addIndex);
    return this.thingList[addIndex].id;
  }

  @action
  editThing(id: number, name: string, category_id: number = 7) {
    const thingIndex = this.thingList.findIndex(thing => thing.id === id);
    this.thingList[thingIndex].name = name;
    this.thingList[thingIndex].category_id = category_id;
    // this.thingList = [...this.thingList];
  }

  // @action
  // deleteThing(id: number) {
  //   this.changeCount(id, false);
  // }

  @action
  getThingToCategory(category_id: number, maxCount: number) {
    return filter(this.thingList, 
      thing => thing.category_id === category_id && thing.countUse > 0
    )
      .sort((a, b) => b.countUse - a.countUse)
      .slice(0, maxCount)
  }
}

export const thingStore = new ThingStore();
