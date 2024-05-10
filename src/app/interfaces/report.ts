export enum ReportStatus {
  NEW = 'new',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

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
  status: ReportStatus;
  submittedByUserId: number;
}
