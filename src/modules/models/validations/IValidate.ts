import Domain from "../Domain";

export abstract class IValidate {
    abstract validate(entity:Domain): void;
}