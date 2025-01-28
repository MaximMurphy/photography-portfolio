export interface Location {
  slug: string;
  name: string;
  photoCount: number;
}

export interface PortfolioProps {
  initialLocation: Location;
}

export interface PortfolioContextType {
  currentLocation: Location;
  currentPhotoIndex: number;
  setCurrentPhotoIndex: (index: number) => void;
}
