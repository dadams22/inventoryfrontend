import React, { useState } from 'react';
import {
  Steps,
  Button,
  Form,
  Input,
  Select,
  Descriptions,
  Tag,
  Modal,
} from 'antd';
import { useSelector } from 'react-redux';
import { ApplicationState, InventoryItem } from '../../../../services/types';
import ItemInfo from './components/ItemInfo';
import LinkScales from './components/LinkScales';
import { FormInstance } from 'antd/es/form';
import ReviewInfo from './components/ReviewInfo';

const { Step } = Steps;

export type FormData = {
  name: string;
  description?: string;
  scales: number[];
};

interface Props {
  visible: boolean;
  closeModal: () => void;
}

const AddItemModal = ({ visible, closeModal }: Props) => {
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
    <Button htmlType='submit' type='primary'>
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
        visible={visible}
        onCancel={closeModal}
        afterClose={resetState}
        footer={steps[currentStep].footer}
      >
        <Steps current={currentStep}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        {steps[currentStep].content}
      </Modal>
    </Form.Provider>
  );
};

export default AddItemModal;
