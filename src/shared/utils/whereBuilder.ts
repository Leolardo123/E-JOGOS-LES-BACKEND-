import AppError from '@shared/errors/AppError';

interface IParameter {
  name: string;
  queryName: string;
  value: any;
  method?: 'AND' | 'OR';
  isBetweenDate?: boolean;
  isIn?: boolean;
  isLike?: boolean;
  isDate?: boolean;
}

interface IParameters {
  parameters: IParameter[];
}

interface IResponse {
  where: string;
  values: any;
}

export default function whereBuilder({
  parameters,
}: IParameters): IResponse | null {
  let whereString = '';
  const valuesObject: Record<string, any> = {};

  if (parameters.length === 0) {
    return null;
  }

  parameters.map(parameter => {
    let { value } = parameter;

    if (parameter.isIn && parameter.isLike) {
      throw new AppError(
        'Não é possível filtrar um parâmetro por isIn e isLike',
      );
    }

    if (parameter.value) {
      if (typeof parameter.value === 'string' && parameter.isIn) {
        value = Array(value);
      }

      if (whereString.length !== 0) {
        whereString += ` ${parameter.method} `;
      }

      if (parameter.isBetweenDate) {
        if (parameter.value.length !== 0) {
          whereString += `${parameter.name} BETWEEN to_timestamp(:value1) AND to_timestamp(:value2)`;
          valuesObject.value1 = `${parameter.value[0]}`;
          valuesObject.value2 = `${parameter.value[1]}`;
        }

        return null;
      }

      if (parameter.isIn) {
        whereString += `${parameter.name} IN (:...${parameter.queryName})`;
      } else if (parameter.isLike) {
        whereString += `LOWER(${parameter.name}) LIKE LOWER(:${parameter.queryName})`;
      } else if (parameter.isDate) {
        whereString += `${parameter.name} BETWEEN to_timestamp(:value1) AND to_timestamp(:value2)`;
        valuesObject.value1 = `${parameter.value[0]}`;
        valuesObject.value2 = `${parameter.value[1]}`;
      } else {
        whereString += `${parameter.name} = :${parameter.queryName}`;
      }

      valuesObject[parameter.queryName] = parameter.isLike
        ? `%${value}%`
        : value;
    }

    return null;
  });

  return whereString.length === 0
    ? null
    : { where: whereString, values: valuesObject };
}
