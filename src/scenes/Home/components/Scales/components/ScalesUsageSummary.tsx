import React from 'react';
import { useSelector } from 'react-redux';
import { Space, Statistic } from 'antd';
import { scalesSelectors } from '../../../../../services/selectors';
import { Scale } from '../../../../../services/scales';

const ScalesUsageSummary = () => {
  const scales = useSelector(scalesSelectors.selectAll);

  const inUse = scales.filter((scale: Scale) => scale.item !== null).length;
  const usagePct = (inUse / scales.length) * 100;

  return (
    <div
      style={{
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        borderRadius: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Space direction='vertical' size='middle'>
          <Statistic
            title='Scale Usage'
            value={usagePct}
            suffix='%'
            precision={1}
          />
          <Statistic
            title='Scales in Use'
            value={inUse}
            suffix={`/${scales.length}`}
          />
        </Space>
      </div>
    </div>
  );
};

export default ScalesUsageSummary;
