import { BookingMapper } from "./booking_mapper";
import { BookingEntity } from "../entities/booking_entity";
import { PropertyEntity } from "../entities/property_entity";
import { UserEntity } from "../../../infrastructure/persistence/entities/user_entity";
import { Property } from "../../../domain/entities/property";
import { User } from "../../../domain/entities/user";
import { Booking } from "../../../domain/entities/booking";
import { DateRange } from "../../../domain/value_objects/date_range";

describe("BookingMapper", () => {
  it("deve converter BookingEntity em Booking corretamente", () => {
    const propertyEntity = new PropertyEntity();
    propertyEntity.id = "p1";
    propertyEntity.name = "Casa de Praia";
    propertyEntity.description = "Vista para o mar";
    propertyEntity.maxGuests = 4;
    propertyEntity.basePricePerNight = 300;

    const guestEntity = new UserEntity();
    guestEntity.id = "u1";
    guestEntity.name = "João";

    const bookingEntity = new BookingEntity();
    bookingEntity.id = "b1";
    bookingEntity.property = propertyEntity;
    bookingEntity.guest = guestEntity;
    bookingEntity.startDate = new Date("2025-01-01");
    bookingEntity.endDate = new Date("2025-01-05");
    bookingEntity.guestCount = 2;
    bookingEntity.totalPrice = 1200;
    bookingEntity.status = "CONFIRMED";

    const booking = BookingMapper.toDomain(bookingEntity);

    expect(booking).toBeInstanceOf(Booking);
    expect(booking.getId()).toBe("b1");
    expect(booking.getProperty()).toBeInstanceOf(Property);
    expect(booking.getGuest()).toBeInstanceOf(User);
    expect(booking.getDateRange()).toBeInstanceOf(DateRange);
    expect(booking.getGuestCount()).toBe(2);
    expect(booking.getTotalPrice()).toBe(1200);
    expect(booking.getStatus()).toBe("CONFIRMED");
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
    const guestEntity = new UserEntity();
    guestEntity.id = "u2";
    guestEntity.name = "Maria";

    const invalidBookingEntity = {
      id: "b2",
      guest: guestEntity,
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-03"),
      guestCount: 1,
      totalPrice: 600,
      status: "pending"
    } as any as BookingEntity;

    expect(() => BookingMapper.toDomain(invalidBookingEntity)).toThrow();
  });

  it("deve converter Booking para BookingEntity corretamente", () => {
    const property = new Property("p2", "Cabana", "Cabana aconchegante", 3, 200);
    const guest = new User("u3", "Carlos");
    const dateRange = new DateRange(new Date("2025-02-01"), new Date("2025-02-04"));

    const booking = new Booking("b3", property, guest, dateRange, 2);
    booking["totalPrice"] = 600;
    booking["status"] = "CONFIRMED";

    const entity = BookingMapper.toPersistence(booking);

    expect(entity).toBeInstanceOf(BookingEntity);
    expect(entity.id).toBe("b3");
    expect(entity.property).toBeInstanceOf(PropertyEntity);
    expect(entity.guest).toBeInstanceOf(UserEntity);
    expect(entity.startDate).toEqual(new Date("2025-02-01"));
    expect(entity.endDate).toEqual(new Date("2025-02-04"));
    expect(entity.guestCount).toBe(2);
    expect(entity.totalPrice).toBe(600);
    expect(entity.status).toBe("CONFIRMED");
  });
});
