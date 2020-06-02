import React from 'react';
import {ApplicationState, InventoryItem} from "../../services/types";
import {useSelector} from "react-redux";

function Inventory() {
    const items = useSelector((state: ApplicationState) => state.items);

    return <h1>Inventory</h1>;
}

export default Inventory;