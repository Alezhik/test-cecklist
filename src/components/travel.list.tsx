import React from 'react';
import { observer, inject } from 'mobx-react';

import { TravelStore, Travel } from '../travel.store';
import { TravelListItem } from './travel.list.item';

interface TravelListProps {
  travelStore?: TravelStore
};

const TravelListComponent = ({ travelStore }: TravelListProps) => (
  <>
    {travelStore!.travelList.map((travel: Travel, idx: number) => (
      <TravelListItem key={idx} travel={travel} />
    ))}
  </>
)

export const TravelList = inject('travelStore')(observer(TravelListComponent));
