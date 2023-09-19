import { useToast } from '@/components/ui/use-toast';
import { getMessageInError } from '@/utils';

const NotifyError = ({ message }: INotifyError) => {
  const { toast } = useToast();

  toast({ title: 'Error!', description: getMessageInError(message), variant: 'destructive' });
};

export default NotifyError;
