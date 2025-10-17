import { LovelaceCardConfig } from 'custom-card-helpers'

export type Entity = {
    entity: string;
    name?: string;
    icon?: string;
};

export type LoopCardStyles = {
    card: Record<string, string>[];
    children: Record<string, string>[];
    extra?: string; // Added optional extra property for advanced CSS rules
};

export type LoopCardConfig = {
    entities: Entity[];
    card: LovelaceCardConfig;
    styles?: LoopCardStyles
};
