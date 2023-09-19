import { useToast } from '@/components/ui/use-toast';
import { getMessageInError } from '@/utils';
import { ToastAction } from '@/components/ui/toast';

const useNotify = () => {
  const { toast } = useToast();

  const error = (message: string | string[] | undefined) => {
    toast({ title: 'Error!', description: getMessageInError(message), variant: 'destructive' });
  };

  const success = (message: string | string[] | undefined) => {
    toast({ title: 'Successfully!', description: message, variant: 'default' });
  };

  const confirm = (handleLeave: () => void, message?: string) => {
    toast({
      title: 'Unsaved changes!',
      description: message || 'You have unsaved changes, still want to leave?',
      variant: 'default',
      action: (
        <ToastAction
          altText="Leave"
          onClick={handleLeave}
        >
          Leave
        </ToastAction>
      ),
    });
  };

  return {
    error,
    success,
    confirm,
  };
};

export default useNotify;
