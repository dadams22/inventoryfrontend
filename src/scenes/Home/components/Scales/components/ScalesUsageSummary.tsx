import React from 'react';
import { useSelector } from 'react-redux';
import { Space, Statistic } from 'antd';
import { scalesSelectors } from '../../../../../services/selectors';
import { Scale } from '../../../../../services/scales';

const ScalesUsageSummary = () => {
  const scales = useSelector(scalesSelectors.selectAll);

  const inUse = scales.filter((scale: Scale) => scale.item !== null).length;
  const usagePct = (inUse / scales.length) * 100;

  const available = scales.length - inUse;

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
            valueStyle={{ color: '#5B8FF9' }}
          />
          <Statistic
            title='Scales Available'
            value={available}
            suffix={`/ ${scales.length}`}
            valueStyle={{ color: '#5AD8A6' }}
          />
        </Space>
      </div>
    </div>
  );
};

export default ScalesUsageSummary;
