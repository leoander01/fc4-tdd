import { PropertyMapper } from "./property_mapper";
import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";

describe("PropertyMapper", () => {
  it("deve converter PropertyEntity em Property corretamente", () => {
    const entity = new PropertyEntity();
    entity.id = "1";
    entity.name = "Casa da Serra";
    entity.description = "Aconchegante casa na serra";
    entity.maxGuests = 5;
    entity.basePricePerNight = 200;

    const domain = PropertyMapper.toDomain(entity);

    expect(domain).toBeInstanceOf(Property);
    expect(domain.getId()).toBe("1");
    expect(domain.getName()).toBe("Casa da Serra");
    expect(domain.getDescription()).toBe("Aconchegante casa na serra");
    expect(domain.getMaxGuests()).toBe(5);
    expect(domain.getBasePricePerNight()).toBe(200);
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
    const entity = {
      id: "2",
      description: "Sem nome",
      maxGuests: 3,
      basePricePerNight: 100,
    } as any as PropertyEntity;

    expect(() => PropertyMapper.toDomain(entity)).toThrow("O nome da propriedade é obrigatório.");
  });

  it("deve converter Property para PropertyEntity corretamente", () => {
    const domain = new Property(
      "3",
      "Apartamento Urbano",
      "Localizado no centro",
      2,
      150.75
    );

    const entity = PropertyMapper.toPersistence(domain);

    expect(entity).toBeInstanceOf(PropertyEntity);
    expect(entity.id).toBe("3");
    expect(entity.name).toBe("Apartamento Urbano");
    expect(entity.description).toBe("Localizado no centro");
    expect(entity.maxGuests).toBe(2);
    expect(entity.basePricePerNight).toBe(150.75);
  });
});
