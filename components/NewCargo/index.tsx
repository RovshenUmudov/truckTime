'use client';

import { FC, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Truck } from 'lucide-react';
import CargoForm from '@/components/NewCargo/Form';
import useNotify from '@/hooks/notify';
import { asyncDelay } from '@/utils';
import { ICargoValues } from '@/types';
import { useContextUnsavedChanges } from '@/context/unsavedChanges';

const NewCargo: FC = () => {
  const { unsavedChanges, handleUnsavedChanges } = useContextUnsavedChanges();
  const { confirm } = useNotify();
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const handleLock = (isValid: boolean) => setIsLocked(isValid);

  const handleOpenChange = async () => {
    await asyncDelay(100);

    if (!isLocked && !unsavedChanges) {
      setIsOpen(!isOpen);
      setIsLocked(false);

      return;
    }

    if (!unsavedChanges || isLocked) formRef?.current?.requestSubmit();

    confirm(() => {
      setIsLocked(false);
      setIsOpen(false);
      handleUnsavedChanges(false);
    });
  };

  const handleSubmit = async (values: ICargoValues, setSubmitting: (isSubmitting: boolean) => void) => {
    await asyncDelay(2000);
    setSubmitting(false);

    setIsLocked(false);
    setIsOpen(false);
  };

  return (
    <div className="flex justify-end py-3">
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="default" size="lg" onClick={() => setIsOpen(true)}>
            <Truck className="mr-2" />
            New Cargo Transportation
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-[700px]" autoFocus={false}>
          <DialogHeader>
            <DialogTitle>New Cargo</DialogTitle>
            <DialogDescription>
              Set all required data. Click create when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <CargoForm handleLock={handleLock} handleSubmit={handleSubmit} formRef={formRef} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewCargo;
