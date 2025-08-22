import { ConversionButton } from './ConversionButton';
import { MemoryRouter } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta<typeof ConversionButton> = {
  title: 'Component/ConversionButton',
  component: ConversionButton,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ConversionButton>;

export const Primary: Story = {
  args: {
  },
};
