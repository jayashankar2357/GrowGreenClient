export interface PersonDetails {
  firstName: string;
  lastName: string;
  middleName: string;
  PhoneNumber: string;
  email:string;
}
export interface DonorDetails extends PersonDetails {
  orders: tree[];
  cart: tree[];
}
export interface tree {
  TreeType: string;
  Age: Number;
  PlantedOn: Date;
  Co2reduction: Number;
  State:string,
  Country:string,
  City:string,
  PlotAddress:string,
  TreeId: string;
  PlotId:string;
  IsAdopted:boolean;
  PlantOptions:string[];
}
export interface PlanterDetails extends PersonDetails {
  plots: plot[];
}
export interface DonorDetails extends PersonDetails {
  isAdmin:boolean;
  orders: tree[];
  cart: tree[];
}
export interface plot
{
  MobileNumber:string,
  OwnerId:string,
  PlotArea:string,
  PlotId:string,
  State:string,
  Country:string,
  City:string,
  PlotAddress:string,
AvailableTreeCount:Number,
  TreeCount:Number,
  AverageUnitCost:Number,
  IsPlotVerified:boolean
}