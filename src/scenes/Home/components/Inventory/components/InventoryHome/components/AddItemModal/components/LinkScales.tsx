import React from 'react';
import { Form, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { useSelector } from 'react-redux';
import { scalesSelectors } from '../../../../../../../../../services/selectors';

interface Props {
  form: FormInstance;
}

const LinkScales = ({ form }: Props) => {
  const scales = useSelector(scalesSelectors.selectAll);
  const availableScales = scales.filter((scale) => scale.item === null);

  return (
    <Form form={form} name='LinkScales' layout='vertical'>
      <Form.Item
        name='scales'
        label='Scales'
        rules={[
          { required: true, message: 'Please select at least one scale.' },
        ]}
      >
        <Select
          mode='multiple'
          placeholder='Enter the IDs of the scales you would like to pair...'
        >
          {availableScales.map((scale) => (
            <Select.Option value={scale.id} key={scale.id}>
              {scale.id}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default LinkScales;
