import { useToast } from '@/components/ui/use-toast';
import { getMessageInError } from '@/utils';
import { ToastAction } from '@/components/ui/toast';

const useNotify = () => {
  const { toast } = useToast();

  const error = (message: string | string[] | undefined) => {
    toast({ title: 'Error!', description: getMessageInError(message), variant: 'destructive', duration: 2000 });
  };

  const success = (message: string | string[] | undefined) => {
    toast({ title: 'Successfully!', description: message, variant: 'default', duration: 2000 });
  };

  const confirm = (handleLeave: () => void, title?: string, message?: string, actionText?: string) => {
    toast({
      title: title || 'Unsaved changes!',
      description: message || 'You have unsaved changes, still want to leave?',
      variant: 'default',
      duration: 5000,
      action: (
        <ToastAction
          altText={actionText || 'Leave'}
          onClick={handleLeave}
        >
          {actionText || 'Leave'}
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
