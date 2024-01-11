import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class ValidatorUntilCurrentYear implements ValidatorConstraintInterface {
    validate(value: number) {
        const currentYear = new Date().getFullYear();

        if (currentYear >= value) return true;

        return false;
    }

    defaultMessage() {
        return 'Значение должен быть до текушего года';
    }
}
