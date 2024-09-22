import { IconButton, Spinner } from '@material-tailwind/react';
import { useMutation } from '@tanstack/react-query';
import { deleteFile } from 'actions/storageActions';
import { queryClient } from 'config/ReactQueryClientProvider';
import { getImageUrl } from 'utils/supabase/storage';

export default function DropboxImage({ image }) {
  const deleteFileMutation = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['images'],
      });
    },
  });

  return (
    <div className="w-full flex flex-col gap-2 p-4 border border-gray-100 rounded-2xl shadow-md relative">
      <div>
        <img
          src={getImageUrl(image.name)}
          className="w-full aspect-square rounded-2xl"
        />
      </div>

      <div>{image.name}</div>

      <div className="absolute top-4 right-4 rounded-full">
        <IconButton
          onClick={() => {
            deleteFileMutation.mutate(image.name);
          }}
          color="red"
        >
          {deleteFileMutation.isPending ? (
            <Spinner />
          ) : (
            <i className="fas fa-trash" />
          )}
        </IconButton>
      </div>
    </div>
  );
}
