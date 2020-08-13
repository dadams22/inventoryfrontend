import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Steps, Button, Form, Modal } from 'antd';
import { FormInstance } from 'antd/es/form';
import ItemInfo from './components/ItemInfo';
import LinkScales from './components/LinkScales';
import ReviewInfo from './components/ReviewInfo';
import { FormData } from './types';
import {
  createItem,
  setAddItemModalState,
} from '../../../../../../../../services/items';
import { ApplicationState } from '../../../../../../../../store';

const { Step } = Steps;

const AddItemModal = () => {
  const dispatch = useDispatch();

  const modalState = useSelector(
    (state: ApplicationState) => state.items.addItemModalState,
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    scales: [],
  });
  const [itemInfoForm] = Form.useForm();
  const [linkScalesForm] = Form.useForm();

  const resetState = () => {
    setCurrentStep(0);
    setFormData({
      name: '',
      scales: [],
    });
    itemInfoForm.resetFields();
    linkScalesForm.resetFields();
  };

  const previousButton = (
    <Button onClick={() => setCurrentStep(currentStep - 1)}>Previous</Button>
  );
  const renderNextButton = (form: FormInstance) => {
    return (
      <Button htmlType='submit' type='primary' onClick={() => form.submit()}>
        Next
      </Button>
    );
  };
  const doneButton = (
    <Button
      htmlType='submit'
      type='primary'
      onClick={() => dispatch(createItem(formData))}
    >
      Done
    </Button>
  );

  const steps = [
    {
      title: 'Item Info',
      content: <ItemInfo form={itemInfoForm} />,
      footer: [renderNextButton(itemInfoForm)],
    },
    {
      title: 'Scale Pairing',
      content: <LinkScales form={linkScalesForm} />,
      footer: [previousButton, renderNextButton(linkScalesForm)],
    },
    {
      title: 'Review',
      content: <ReviewInfo formData={formData} />,
      footer: [previousButton, doneButton],
    },
  ];

  return (
    <Form.Provider
      onFormFinish={(_, { values }) => {
        setFormData({
          ...formData,
          ...values,
        });
        setCurrentStep(currentStep + 1);
      }}
    >
      <Modal
        title='Add a New Item'
        visible={modalState}
        onCancel={() => dispatch(setAddItemModalState(false))}
        afterClose={resetState}
        footer={steps[currentStep].footer}
      >
        <Steps current={currentStep}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div style={{ marginTop: '5px' }}>{steps[currentStep].content}</div>
      </Modal>
    </Form.Provider>
  );
};

export default AddItemModal;
