import React, { useState } from 'react';
import { Steps, Button, message, Form, Input, Select } from 'antd';
import { useSelector } from 'react-redux';
import { ApplicationState, InventoryItem } from '../services/types';

const { Step } = Steps;
const { Option } = Select;

interface AddNewItemProps {
  closeModal: () => void
}

function AddNewItem(props: AddNewItemProps) {


  const [currentStep, setCurrentStep] = useState(0);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [selectedScales, setSelectedScales] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const initializeState = () => {
    setLoading(false);
    setCurrentStep(0);
    setItemName('');
    setItemDescription('');
    setSelectedScales([]);
  }

  const scales = useSelector((state: ApplicationState) => state.scales);
  const scalesDataSource = scales
    .filter((scale) => (!scale.inUse))
    .map((scale) => (<Option value={scale.id} key={scale.id}>{scale.id}</Option>));

  const previousButton = (
    <Button style={{ margin: '0 8px' }} onClick={() => setCurrentStep(currentStep - 1)}>
      Previous
    </Button>
  );

  const onFinishFirstStep = (values: any) => {
    console.log('Success: ', values);

    // Grab item name, description
    setItemName(values.itemName);
    setItemDescription(values.itemDescription);
    setCurrentStep(currentStep + 1);
  }

  const onFinishSecondStep = (values: any) => {
    console.log('Success: ', values);

    // Grab selected scales
    setSelectedScales(values.selectedScales);
    setCurrentStep(currentStep + 1);
  }

  const onFinishFailed = (values: any) => {
    console.log('Failure: ', values);
  }


  const finishAndPostNewItem = () => {
    // Begin 'loading' and attempt to post to database
    setLoading(true);

    return new Promise( resolve => setTimeout(resolve, 2000))
      .then(() => {
        // After success, message and close modal
        initializeState();
        props.closeModal();
        message.success('Item successfully paired with scale and added to inventory!');
      })

  }

  const firstStep = (
    <>
      <Form
        layout='vertical'
        onFinish={onFinishFirstStep}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name='itemName'
          label='Name'
          rules={[{ required: true, message: 'Please enter the new item\'s name.' }]}
        >
          <Input placeholder='New item name' />
        </Form.Item>

        <Form.Item
          name='itemDescription'
          label='Description'
        >
          <Input.TextArea placeholder='New item description' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>Next</Button>
        </Form.Item>
      </Form>
    </>
  )

  const secondStep = (
    <>
      <Form
        layout='vertical'
        onFinish={onFinishSecondStep}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name='selectedScales'
          label='Scales'
          rules={[{ required: true, message: 'Please select at least one scale.' }]}
        >
          <Select
            mode='multiple'
            placeholder='Please select scales'
            style={{ width: '100%' }}
          >
            {scalesDataSource}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>Next</Button>
        </Form.Item>

        {previousButton}
      </Form>
    </>
  )

  const thirdStep = (
    <>
      <h3>Item name</h3>
      <ul>
        <li>{itemName}</li>
      </ul>

      <h3>Item description</h3>
      <ul>
        <li>{itemDescription}</li>
      </ul>

      <h3>Linked scales</h3>
      <ul>
        {selectedScales.map(scale =>
          <li>{scale}</li>
        )}
      </ul>

      <Button loading={isLoading} type='primary' onClick={finishAndPostNewItem}>
        Done
      </Button>

      {previousButton}
    </>
  )

  const steps = [
    {
      title: 'Item Info',
      content: firstStep
    },
    {
      title: 'Scale Pairing',
      content: secondStep
    },
    {
      title: 'Review',
      content: thirdStep
    }
  ];

  return (
    <>
      <Steps current={currentStep}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      {steps[currentStep].content}
    </>
  );
}
export default AddNewItem;