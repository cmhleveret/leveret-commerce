'use client';

import { FC, HTMLAttributes, useContext, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import TextareaAutosize from 'react-textarea-autosize';
import { useMutation } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import { Message } from '@/lib/validators/message';
import { MessagesContext } from '@/context/messages';
import { CornerDownLeft, CornerDownRight, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
  const [input, setInput] = useState<string>('');
  const { messages, addMessage, removeMessage, updateMessage, setIsMessageUpdating } =
    useContext(MessagesContext);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: sendMessage, isLoading } = useMutation({
    mutationFn: async (message: Message) => {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ messages: [message] })
      });

      if (!response.ok) throw new Error('Something went wrong');

      return response.body;
    },
    onMutate: (message: Message) => {
      addMessage(message);
    },
    onSuccess: async (stream) => {
      if (!stream) throw new Error('no stream found');

      const id = nanoid();
      const responseMessage: Message = {
        id,
        isUserMessage: false,
        text: ''
      };

      addMessage(responseMessage);

      setIsMessageUpdating(true);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(id, (prevText) => prevText + chunkValue);
        // console.log(chunkValue)
      }

      setIsMessageUpdating(false);
      setInput('');

      setTimeout(() => {
        textAreaRef.current?.focus();
      }, 10);
    },
    onError(_, message) {
      toast.error('Something went wrong, please try again');
      removeMessage(message.id);
      textAreaRef.current?.focus();
    }
  });

  return (
    <div {...props} className={cn(`border-t border-zinc-400`, className)}>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutosize
          ref={textAreaRef}
          disabled={isLoading}
          rows={2}
          maxRows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          placeholder="Write a message..."
          className="peer block w-full resize-none border-0 bg-zinc-100 py-1.5 pr-14 text-sm text-gray-900 focus:ring-0 disabled:opacity-50 sm:leading-6"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              const message = {
                id: nanoid(),
                isUserMessage: true,
                text: input
              };
              sendMessage(message);
            }
          }}
        ></TextareaAutosize>

        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 bg-white px-1 font-sans text-xs text-gray-400">
            {isLoading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <CornerDownLeft className="h-3 w-3" />
            )}
          </kbd>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-zinc-400"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default ChatInput;
