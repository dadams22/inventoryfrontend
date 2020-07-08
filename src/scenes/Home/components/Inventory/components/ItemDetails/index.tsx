import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Col,
  Descriptions,
  Empty,
  PageHeader,
  Row,
  Statistic,
  Tag,
} from 'antd';
import { useSelector } from 'react-redux';
import { itemsSelectors } from '../../../../../../services/selectors';
import { ApplicationState } from '../../../../../../store';

const ItemDetails = () => {
  let { itemId } = useParams();
  itemId = Number(itemId);
  const item = useSelector((state: ApplicationState) =>
    itemsSelectors.selectById(state, itemId),
  );

  const history = useHistory();

  if (!item) {
    return (
      <Empty description='Sorry, the item you are looking for could not be found' />
    );
  }

  return (
    <Row justify='center'>
      <Col span={18}>
        <PageHeader
          title={item.name}
          subTitle='Item Details'
          onBack={() => history.push('/inventory')}
          ghost={false}
        >
          <Descriptions>
            {item.description && (
              <Descriptions.Item label='Description'>
                {item.description}
              </Descriptions.Item>
            )}
            <Descriptions.Item label='Date Stocked'>
              {item.created_at}
            </Descriptions.Item>
            <Descriptions.Item label='Linked Scales'>
              {item.scales.map((scale) => (
                <Tag>{scale}</Tag>
              ))}
            </Descriptions.Item>
          </Descriptions>
          {item.last_measurement && (
            <Statistic
              title='Current Weight'
              value={item.last_measurement.value}
              precision={2}
              suffix='lbs.'
            />
          )}
        </PageHeader>
      </Col>
    </Row>
  );
};

export default ItemDetails;
