export interface Report {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  lat: number;
  lng: number;
  description: string;
  status: 'new' | 'approved' | 'rejected';
  submittedByUserId: number;
}
