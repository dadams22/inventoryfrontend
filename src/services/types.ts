export interface ApplicationState {
    items: InventoryItem[];
}


export interface InventoryItem {
    id: number;
    name: string;
    description: string;
    weight: number;
}