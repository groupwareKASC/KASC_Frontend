import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { PwdModal } from './PwdModal';

const meta: Meta<typeof PwdModal> = {
  title: 'Modal/PwdModal',
  component: PwdModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PwdModal>;

export const Primary: Story = {};
