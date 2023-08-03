import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/dictionaries/dictionaries';

import type { BaseDocument } from '@/types/baseDocument';
import { Icons } from '@/components/icons';

function getContainerClass(layout) {
  if (layout === 'grid') return 'py-4';
  return 'py-4 grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-x-6 gap-y-3';
}

function getDetailsClass(layout) {
  if (layout === 'grid') return 'pt-3';
  return 'lg:col-span-2';
}

interface ContentCardProps {
  item: BaseDocument;
  layout: 'grid' | 'list';
  showType: boolean;
  isMultiDataset: boolean;
}

export function ContentCard({
  item,
  layout,
  showType,
  isMultiDataset,
}: ContentCardProps) {
  if (!item || !item.url) return null;
  const dict = getDictionary();

  return (
    <Link href={item.url}>
      <div className={getContainerClass(layout)}>
        <div>
          {showType && layout === 'grid' && (
            <h4 className="mb-2 text-base font-semibold uppercase text-neutral-500 dark:text-neutral-600">
              {dict['index.content.itemTitle']}
            </h4>
          )}
          <div className="flex items-center justify-center bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700">
            <figure>
              {item.image?.thumbnailUrl ? (
                <Image
                  src={item.image?.thumbnailUrl}
                  className="h-48 object-contain"
                  alt=""
                  width={400}
                  height={400}
                />
              ) : (
                <div className="flex h-48 w-full items-center justify-center">
                  <Icons.imageOff className="h-24 w-24 text-neutral-300 group-hover:text-neutral-400" />
                  <span className="sr-only">Image Unavailable</span>
                </div>
              )}
              <figcaption></figcaption>
            </figure>
          </div>
        </div>
        <div className={getDetailsClass(layout)}>
          {isMultiDataset && (
            <div className="text-sm text-neutral-700 dark:text-neutral-400">
              {dict[`source.${item.source}`]}
            </div>
          )}
          {showType && layout === 'list' && (
            <h4 className="mb-2 text-base font-semibold uppercase text-neutral-500 dark:text-neutral-600">
              {dict['index.content.itemTitle']}
            </h4>
          )}
          <h4 className="mb-1 text-xl font-semibold text-neutral-900 dark:text-white">
            {item.title}
          </h4>
          {item.formattedDate && (
            <p className="text-xs font-normal text-neutral-700 dark:text-neutral-400">
              {item.formattedDate}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
