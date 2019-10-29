import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';

import { TravelStore } from '../../stores/travel.store';
import { Thing } from '../../stores/thing.store';

interface TravelListItemProps {
  thing: Thing
  travelStore?: TravelStore
  travel_id: number
  checked: boolean
}

const TravelCheckListItemComponent = ({ thing, travelStore, travel_id, checked }: TravelListItemProps) => {
  const [check, setCheck] = useState(checked);

  const lableText = check ? <span className="crossed">{thing.name}</span> : thing.name;

  const handleChecked = () => {
    travelStore!.setCompleted(travel_id, !check);
    setCheck(!check);
  }

  return (
    <div key={travel_id}>
      <input 
        type="checkbox"
        onClick={handleChecked}
        checked={check}
      />&nbsp;{lableText}
    </div>
  ) 
};

export const TravelCheckListItem = inject('travelStore', 'thingStore')(observer(TravelCheckListItemComponent));
