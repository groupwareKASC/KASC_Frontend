import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { DownloadModal } from './DownloadModal';

const meta: Meta<typeof DownloadModal> = {
  title: 'Modal/DownloadModal',
  component: DownloadModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DownloadModal>;

export const Primary: Story = {};
