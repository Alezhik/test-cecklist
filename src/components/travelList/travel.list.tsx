import React from 'react';
import { observer, inject } from 'mobx-react';

import { TravelStore, Travel } from '../../stores/travel.store';
import { TravelListItem } from './travel.list.item';
import { TravelAdd } from './travel.add';
import { TravelCheckList } from './travel.checklist';

interface TravelListProps {
  travelStore?: TravelStore
};

const TravelListComponent = ({ travelStore }: TravelListProps) => {
  const handleClearList = () => {
    travelStore!.clearTravelList();
  }

  const handleNewList = () => {
    travelStore!.clearTravelList();
    travelStore!.createNewTravelList();
  }

  return (
    <>
      <h4>Your travel list</h4>
      <button onClick={handleClearList}>Clear list</button>
      <button onClick={handleNewList}>New list</button>
      <div className="listBlock">
        <div className="addingList">
          {travelStore!.travelList.map((travel: Travel) => (
            <TravelListItem key={travel.id} travel={travel} />
          ))}
          <TravelAdd />
        </div>
        <TravelCheckList />
      </div>
    </>
  )
}

export const TravelList = inject('travelStore')(observer(TravelListComponent));
