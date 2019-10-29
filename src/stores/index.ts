import { observable } from "mobx"
import { MessageStore, messageStore } from "./message.store";
import { TravelStore, travelStore } from "./travel.store";
import { ThingStore, thingStore } from "./thing.store";

export class RootStore {
  @observable messageStore: MessageStore = messageStore;
  @observable travelStore: TravelStore = travelStore;
  @observable thingStore: ThingStore = thingStore;
}

export const rootStore = new RootStore();
