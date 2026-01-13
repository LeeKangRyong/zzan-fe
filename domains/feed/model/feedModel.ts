export interface FeedImage {
  uri: string;
  id: string;
}

export interface FeedPost {
  images: FeedImage[];
  alcoholIds: string[];
  placeId?: string;
  review: string;
}
