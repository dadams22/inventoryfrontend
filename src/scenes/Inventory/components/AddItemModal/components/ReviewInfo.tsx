import React from 'react';
import { Descriptions, Tag } from 'antd';
import { FormData } from '../index';

interface Props {
  formData: FormData;
}

const ReviewInfo = ({ formData }: Props) => {
  return (
    <Descriptions title='Item Overview'>
      <Descriptions.Item label='Name'>{formData.name}</Descriptions.Item>
      <Descriptions.Item label='Description'>
        {formData.description}
      </Descriptions.Item>
      <Descriptions.Item label='Linked Scales'>
        {formData.scales.map((scale) => (
          <Tag>{scale}</Tag>
        ))}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ReviewInfo;
