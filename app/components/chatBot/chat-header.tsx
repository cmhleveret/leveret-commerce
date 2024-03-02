import { FC } from 'react';

const ChatHeader: FC = () => {
  return (
    <div className="flex w-full items-center justify-start gap-3 text-secondary">
      <div className="flex flex-col items-start text-sm">
        <p className="text-xs"></p>
        <div className="flex items-center gap-1.5">
          <p className="h-2 w-2 rounded-full bg-green-500" />
          <p className="font-medium">L E V E R E T </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
