import React from 'react';
import { observer, inject } from 'mobx-react';

import { TravelStore, Thing } from '../travel.store';
import { TravelListItem } from './travel.list.item';

interface TravelListProps {
  travelStore?: TravelStore
};

const TravelListComponent = ({ travelStore }: TravelListProps) => (
  <>
    {console.log('TravelListComponent', travelStore)}
    {travelStore!.travelList.map((thing: Thing, idx: number) => (
      <TravelListItem key={idx} thing={thing} />
    ))}
  </>
)

export const TravelList = inject('travelStore')(observer(TravelListComponent));
