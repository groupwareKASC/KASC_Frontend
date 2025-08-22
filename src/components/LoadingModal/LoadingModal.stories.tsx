import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { LoadingModal } from './LoadingModal';

const meta: Meta<typeof LoadingModal> = {
  title: 'Modal/LoadingModal',
  component: LoadingModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoadingModal>;

export const Primary: Story = {};
