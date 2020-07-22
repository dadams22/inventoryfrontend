import React from 'react';
import { useSelector } from 'react-redux';
import { Donut } from '@ant-design/charts';
import { Empty } from 'antd';
import { scalesSelectors } from '../../../../../services/selectors';
import { Scale } from '../../../../../services/scales';

const ScalesStatusChart = () => {
  const scales = useSelector(scalesSelectors.selectAll);

  const data = [
    {
      status: 'Available',
      count: scales.filter((scale: Scale) => !scale.item).length,
    },
    {
      status: 'In Use',
      count: scales.filter((scale: Scale) => Boolean(scale.item)).length,
    },
  ];

  return (
    <div style={{ backgroundColor: 'white', height: 'auto' }}>
      {scales && scales.length ? (
        <Donut
          data={data}
          title={{ visible: true, text: 'Scales Overview' }}
          description={{
            visible: true,
            text: 'Current Status of All Your Scales',
          }}
          legend={{
            flipPage: false,
          }}
          forceFit
          radius={1}
          statistic={{
            visible: true,
            totalLabel: 'Total Scales',
          }}
          padding='auto'
          colorField='status'
          angleField='count'
          color={['#5AD8A6', '#5B8FF9']}
          height={275}
        />
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default ScalesStatusChart;
