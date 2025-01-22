export interface Photo {
  src: string;
  alt: string;
  id: number;
  location?: string; // Optional sub-location within the country
}

export interface Location {
  slug: string;
  name: string;
  photos: Photo[];
}

export interface CarouselContextType {
  currentCityIndex: number;
  setCurrentCityIndex: (index: number) => void;
  currentPhotoIndex: number;
  setCurrentPhotoIndex: (index: number) => void;
  locations: Location[];
}

export interface ImageLoaderProps {
  photos: Photo[];
  onLoadComplete: () => void;
  onError: (error: string) => void;
}
