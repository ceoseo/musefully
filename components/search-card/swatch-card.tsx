import { Key } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/dictionaries/dictionaries';

import {
  LAYOUT_GRID,
  LAYOUT_LIST,
} from '@/lib/elasticsearch/search/searchParams';
import type { LayoutType } from '@/lib/elasticsearch/search/searchParams';
import {
  getArtworkUrlWithSlug,
  trimStringToLengthAtWordBoundary,
} from '@/lib/various';
import { Icons } from '@/components/icons';

function getContainerClass(layout: LayoutType) {
  if (layout === LAYOUT_GRID) return '';
  return 'grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-x-6 gap-y-3';
}

function getDetailsClass(layout: LayoutType) {
  if (layout === LAYOUT_GRID) return 'pt-3';
  return 'lg:col-span-2';
}

function getHsl(hslColor) {
  if (!hslColor) return 'white';
  const hsl = `hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)`;
  return hsl;
}

export function SwatchCard({ item, layout, showType }) {
  if (!item) return null;
  const dict = getDictionary();

  const primaryConstituentName =
    item.primaryConstituent?.name || 'Maker Unknown';

  const href = getArtworkUrlWithSlug(item._id, item.title);

  return (
    <Link href={href}>
      <div className={getContainerClass(layout)}>
        <div>
          {showType && layout === LAYOUT_GRID && (
            <h4 className="text-base font-semibold uppercase text-neutral-500 dark:text-neutral-600">
              {dict['index.art.itemTitle']}
            </h4>
          )}
          <div className="relative aspect-square items-center justify-center">
            <figure>
              {item.image?.thumbnailUrl ? (
                <Image
                  src={item.image?.thumbnailUrl}
                  className="h-72 w-full object-cover"
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
            {item.image?.dominantColors && (
              <div className="flex items-center justify-center">
                {item.image?.dominantColors.map(
                  (color: any, i: Key) =>
                    color && (
                      <div
                        className="aspect-square w-1/6"
                        style={{
                          backgroundColor: getHsl(color),
                        }}
                      ></div>
                    )
                )}
              </div>
            )}
          </div>
        </div>
        <div className={getDetailsClass(layout)}>
          {showType && layout === LAYOUT_LIST && (
            <h4 className="mb-2 text-base font-semibold uppercase text-neutral-500 dark:text-neutral-600">
              {dict['index.art.itemTitle']}
            </h4>
          )}
          <h4 className="mb-2 text-xl font-semibold">
            {item.title}
            {item.formattedDate ? `, ${item.formattedDate}` : ''}
          </h4>
          <h5 className="text-lg">{primaryConstituentName}</h5>
          {item.primaryConstituent?.dates && (
            <span className="text-sm text-neutral-700 dark:text-neutral-400">
              {item.primaryConstituent?.dates}
            </span>
          )}
          {layout === LAYOUT_LIST && (
            <p>{trimStringToLengthAtWordBoundary(item.description, 200)}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
