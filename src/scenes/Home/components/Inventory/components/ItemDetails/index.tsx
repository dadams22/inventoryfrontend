import React from 'react';
import { RouteComponentProps, useParams, withRouter } from 'react-router-dom';
import { Empty, PageHeader } from 'antd';
import { useSelector } from 'react-redux';
import { itemsSelectors } from '../../../../../../services/selectors';
import { ApplicationState } from '../../../../../../store';

const ItemDetails = ({ history }: RouteComponentProps) => {
  let { itemId } = useParams();
  itemId = Number(itemId);
  const item = useSelector((state: ApplicationState) =>
    itemsSelectors.selectById(state, itemId),
  );

  if (!item) {
    return (
      <Empty description='Sorry, the item you are looking for could not be found' />
    );
  }

  return (
    <PageHeader
      title={item.name}
      onBack={() => history.push('/inventory')}
      ghost={false}
    />
  );
};

export default withRouter(ItemDetails);
