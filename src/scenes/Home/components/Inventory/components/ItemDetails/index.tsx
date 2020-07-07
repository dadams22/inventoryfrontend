import React from 'react';
import { RouteComponentProps, useParams, withRouter } from 'react-router-dom';
import { Col, Descriptions, Empty, PageHeader, Row, Tag } from 'antd';
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
        </PageHeader>
      </Col>
    </Row>
  );
};

export default withRouter(ItemDetails);
