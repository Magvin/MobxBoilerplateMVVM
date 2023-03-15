export type TCompaniesInfo = {
  headquarters: {
    address: string;
    city: string;
    state: string;
  };
  name: string;
};

export interface Launches {
  date_local: string;
  date_utc: string;
  flight_number: number;
  name: string;
  date_unix: number;
  launch_date_utc: string;
}
