import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';

import { TravelStore, Travel } from '../../stores/travel.store';
import { TravelCheckListItem } from './travel.checklist.item';
import categoris from '../thingsCategory/catrgoris.json';
import { ThingStore } from '../../stores/thing.store';

interface TravelListProps {
  travelStore?: TravelStore
  thingStore?: ThingStore
};

const TravelCheckListComponent = ({ travelStore, thingStore }: TravelListProps) => {
  const [sortedTravelList, setSortedTravelList] = useState("default");

  const listReturn = (list: Travel[]) => list.map((travel: Travel) => {
    const thing = thingStore!.getThing(travel.thing_id);
    if (!!thing) {
      return (
        <TravelCheckListItem 
          key={travel.id}
          thing={thing}
          travel_id={travel.id}
          checked={travel.isComplete}
        />
      )
    }
    return null
  })

  let listContent = <>{listReturn(travelStore!.travelList)}</>;

  switch (sortedTravelList) {
    case "category":
      listContent = <>{categoris.categoris.map(category => {
        const things = travelStore!.travelList.filter(travel => {
          const thing = thingStore!.getThing(travel.thing_id);
          return thing!.category_id === category.id
        });
        return (
          <>
            <h6>{category.name}</h6>
            {listReturn(things)}
          </>
        )}
      )}</>
      break;
    case "take":
      listContent = <>
        <h6>Done</h6>
        {listReturn(travelStore!.travelList.filter(travel => !!travel.isComplete))}
        <h6>Not done</h6>
        {listReturn(travelStore!.travelList.filter(travel => !travel.isComplete))}
      </>
      break;
    case "default":
    default:
      listContent = <>{listReturn(travelStore!.travelList)}</>;
      break;
  }

  return (
    <div>
      <button onClick={() => setSortedTravelList("default")}>Defualt sort</button>
      <button onClick={() => setSortedTravelList("category")}>Sort by category</button>
      <button onClick={() => setSortedTravelList("take")}>Group what you take</button>
      <div className="checkerList">
        {listContent}
      </div>
    </div>
  )
}

export const TravelCheckList = inject('travelStore', 'thingStore')(observer(TravelCheckListComponent));
