import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';

import { TravelStore, Thing } from '../stores/travel.store';

interface TravelListItemProps {
  thing: Thing
  travelStore?: TravelStore
}

interface TravelListItemProps {
  thing: Thing
  travelStore?: TravelStore
}

const TravelListItemComponent = ({ thing, travelStore }: TravelListItemProps) => {
  const [value, setValue] = useState({ 
    edit: false, 
    newName: thing.name, 
    newCount: thing.count 
  });

  const handlerDelete = (id: number) => {
    travelStore!.removeTravel(id);
  } 

  const handleChangeTravel = () => {
    travelStore!.editTravel(thing.id, value.newName, thing.category, thing.count);
    setValue({ ...value, edit: false });
  };

  const handleCountChange = (count: string) => {
    travelStore!.editTravel(thing.id, value.newName, thing.category, parseInt(count));
    setValue({ ...value, newCount: parseInt(count)});
  }

  return (
    <>
      {value.edit ? 
        <div>
          <input
            key="edit_input"
            value={value.newName} 
            onChange={obj => setValue({ ...value, newName: obj.target.value }) } 
          />
          <input 
            key="count_input"
            type="number"
            value={value.newCount} 
            onChange={obj => handleCountChange(obj.target.value)} 
          />
          <button onClick={handleChangeTravel}>save</button>
        </div>
      : 
      <div>
        {thing.name}
        <input
          key="count_input"
          type="number"
          value={value.newCount} 
          onChange={obj => handleCountChange(obj.target.value)} 
        />
        <button onClick={() => setValue({ ...value, edit: true})}>edit</button>
        <button onClick={() => handlerDelete(thing.id)}>x</button>
      </div>} 
    </>
  ) 
};

export const TravelListItem = inject('travelStore')(observer(TravelListItemComponent));
