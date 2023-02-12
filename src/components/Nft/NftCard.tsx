import React from "react";

interface NftCardProps {
  thumbnail: string | undefined;
  name: string | undefined;
  price: number | undefined;
}

export const NftCard: React.FC<NftCardProps> = ({ thumbnail, name, price }) => (
  <div className="group relative">
    <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
      <img
        src={thumbnail}
        alt={name}
        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
      />
    </div>
    <div className="mt-4 flex justify-between">
      <div>
        <h3 className="text-sm text-gray-700">{name}</h3>
        <p className="mt-1 text-sm text-gray-500"></p>
      </div>
      <p className="text-sm font-medium text-gray-900"> {`${price}`}</p>
    </div>
  </div>
);
