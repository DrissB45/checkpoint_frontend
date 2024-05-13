import { Continent } from '@/types/continent.type'

export type Country = {
    code: string;
    continent: Continent;
    emoji: string;
    id: number;
    name: string;
  }