import { LovelaceCardConfig } from 'custom-card-helpers'

export type Entity = {
    entity: string;
    name?: string;
    icon?: string;
};

export type LoopCardConfig = {
    entities: Entity[];
    card: LovelaceCardConfig;
};
