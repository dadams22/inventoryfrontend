export interface ApplicationState {
    items: InventoryItem[];
    scales: Scale[];
}


export interface InventoryItem {
    id: number;
    name: string;
    weight: number;
}

export interface Scale {
    id: number;
    inUse: boolean;
}