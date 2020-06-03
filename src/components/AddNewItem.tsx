import React, { useState } from 'react';
import { Steps, Button, message } from 'antd';

const { Step } = Steps;

function AddNewItem() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'First',
      content: 'First-content',
    },
    {
      title: 'Second',
      content: 'Second-content',
    },
    {
      title: 'Last',
      content: 'Last-content',
    },
  ];

  return (
    <>
      <Steps current={currentStep}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div>
        {currentStep < steps.length - 1 && (
          <Button type='primary' onClick={() => setCurrentStep(currentStep + 1)}>
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type='primary' onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {currentStep > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => setCurrentStep(currentStep - 1)}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
}
export default AddNewItem;