import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { RadioField } from './RadioField';
import React from 'react';

const meta: Meta<typeof RadioField> = {
  title: 'Components/RadioField',
  component: RadioField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioField>;

export const Primary: Story = {
  args: {
    label: '전체',
    checked: true,
    name: 'example',
    value: 'all',
  },
};

export const Disabled: Story = {
  args: {
    label: '불일치',
    checked: false,
    name: 'example',
    value: 'mismatch',
    disabled: true,
  },
};

export const Options: Story = {
  render: () => {
    const [selected, setSelected] = React.useState('all');
    const options = [
      { label: '전체', value: 'all' },
      { label: '불일치', value: 'mismatch' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
        {options.map((opt) => (
          <RadioField
            key={opt.value}
            label={opt.label}
            name="options" 
            value={opt.value}
            checked={selected === opt.value}
            onChange={() => setSelected(opt.value)}
          />
        ))}
      </div>
    );
  },
};
