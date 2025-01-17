export interface Photo {
  src: string;
  alt: string;
  id: number;
}

export interface City {
  name: string;
  photos: Photo[];
}

export interface CarouselContextType {
  currentCityIndex: number;
  setCurrentCityIndex: (index: number) => void;
  currentPhotoIndex: number;
  setCurrentPhotoIndex: (index: number) => void;
  cities: City[];
}
