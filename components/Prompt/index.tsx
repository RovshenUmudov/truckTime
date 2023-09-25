import React, { FC } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';

interface IPrompt {
    title?: string;
    description: string;
    icon: React.ReactNode;
    variant: 'destructive' | 'default';
}

const Prompt: FC<IPrompt> = ({
  title,
  icon,
  description,
  variant,
}) => (
  <Alert className="mb-5" variant={variant}>
    {icon}
    {title ? <AlertTitle>{title}</AlertTitle> : null}
    <AlertDescription>
      {description}
    </AlertDescription>
  </Alert>
);

export default Prompt;
