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

export interface PageProps {
  params: {
    location: string;
  };
}

export interface PortfolioProps {
  initialLocation: Location;
}

export interface PortfolioContextType {
  currentLocation: Location;
  currentPhotoIndex: number;
  setCurrentPhotoIndex: (index: number) => void;
}

export interface ImageLoaderProps {
  photos: Photo[];
  onLoadComplete: () => void;
  onError: (error: string) => void;
}
