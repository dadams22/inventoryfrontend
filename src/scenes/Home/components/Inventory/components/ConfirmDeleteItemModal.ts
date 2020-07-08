import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RouteComponentProps } from 'react-router-dom';
import { Modal } from 'antd';
import { deleteItem, InventoryItem } from '../../../../../services/items';
import store, { ApplicationState } from '../../../../../store';

const renderDeleteItemConfirm = (
  item: InventoryItem,
  history?: RouteComponentProps['history'],
) => {
  const dispatch = store.dispatch as ThunkDispatch<
    ApplicationState,
    void,
    AnyAction
  >;
  Modal.confirm({
    title: `Are you sure you want to delete ${item.name}?`,
    content:
      'Deleting an item causes all data collected for that item to be permanently deleted',
    okText: 'Delete',
    onOk: () => {
      dispatch(deleteItem(item.id));
      if (history) {
        history.push('/inventory');
      }
    },
  });
};

export default renderDeleteItemConfirm;
