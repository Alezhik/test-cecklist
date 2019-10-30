import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';

import { TravelStore, Travel } from '../../stores/travel.store';
import { ThingStore } from '../../stores/thing.store';
import categories from '../../constants/thingsCategory/catrgoris.json';

interface TravelListItemProps {
  travel: Travel
  travelStore?: TravelStore
  thingStore?:ThingStore
}

interface Category {
  name: string
  id: number
  defaultThings: number
}

const TravelListItemComponent = ({ travel, travelStore, thingStore }: TravelListItemProps) => {
  const thing = thingStore!.getThing(travel.thing_id);
  const [value, setValue] = useState({ 
    edit: false, 
    newName: thing!.name,
    category_id: thing!.category_id,
    newCount: travel.count,
    thing_id: travel.thing_id,
    thing: thingStore!.getThing(travel.thing_id)
  });

  const handlerDelete = (id: number) => {
    travelStore!.removeTravel(id);
  } 

  const handleChangeTravel = () => {
    travelStore!.editTravel(travel.id, value.newName, value.category_id, travel.count);
    setValue({ ...value, edit: false });
  };

  const handleCountChange = (count: string) => {
    travelStore!.editTravel(travel.id, value.newName, value.category_id, parseInt(count));
    setValue({ ...value, newCount: parseInt(count)});
  }

  const handleSelect = (event: React.FormEvent<HTMLSelectElement>): void => {
    const newCategoryId = parseInt(event.currentTarget.value);
    travelStore!.editTravel(travel.id, value.newName, newCategoryId, travel.count);
    setValue({ ...value, category_id: newCategoryId});
  }

  const sameDom = () => <>
    <input 
      key="count_input"
      type="number"
      value={value.newCount} 
      onChange={obj => handleCountChange(obj.target.value)}
    />
    <select name="select" onChange={e => handleSelect(e)} value={value.category_id}>
      {categories.categories.map((category: Category) => 
        <option
          value={category.id}
          key={`category_${category.id}`}
        >
          {category.name}
        </option> 
      )}
    </select>
  </>

  return (
    <div key={travel.id}>
      {value.edit ? 
        <>
          <input
            key="edit_input"
            value={value.newName} 
            onChange={obj => setValue({ ...value, newName: obj.target.value }) } 
          />
          {sameDom()}
          <button onClick={handleChangeTravel} key="save_button">save</button>
        </>
      : 
        <>
          {`${thing!.name} - ${thing!.countUse}`}
          {sameDom()}
          <button onClick={() => setValue({ ...value, edit: true})} key="edit_button">edit</button>
          <button onClick={() => handlerDelete(travel.id)} key="delete_button">x</button>
        </>
      }
    </div>
  ) 
};

export const TravelListItem = inject('travelStore', 'thingStore')(observer(TravelListItemComponent));
