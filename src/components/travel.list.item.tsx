import React from 'react';

import { Travel } from '../travel.store'

interface TravelListItemProps {
  travel: Travel
}

export const TravelListItem = ({ travel }: TravelListItemProps) => <div>{travel.task}</div>;
