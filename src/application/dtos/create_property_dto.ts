import { Booking } from '../../domain/entities/booking';

export interface CreatePropertyDTO {
  name: string;
  description: string;
  maxGuests: number;
  basePricePerNight: number;
}
