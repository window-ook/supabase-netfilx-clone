'use client';

import { useQuery } from '@tanstack/react-query';
import { searchFiles } from 'actions/storageActions';
import { Spinner } from '@material-tailwind/react';
import DropboxImage from './dropbox-image';

export default function DropboxImageList({ searchInput }) {
  const searchImagesQuery = useQuery({
    queryKey: ['images', searchInput],
    queryFn: () => searchFiles(searchInput),
    // onSuccess
  });
  return (
    <section className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2">
      {searchImagesQuery.isLoading && <Spinner />}
      {searchImagesQuery.data &&
        searchImagesQuery.data.map((image) => (
          <DropboxImage key={image.id} image={image} />
        ))}
    </section>
  );
}
