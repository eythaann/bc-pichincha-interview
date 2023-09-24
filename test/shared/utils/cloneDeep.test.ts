import { cloneDeep } from '../../../src/modules/shared/app/utils/cloneDeep';

describe('cloneDeep function', () => {
  it('should return a deep clone of the object', () => {
    const originalObject = {
      a: {
        b: {
          c: 1,
        },
      },
    };

    const clonedObject = cloneDeep(originalObject);

    // Verificar que el objeto clonado es una copia profunda del objeto original
    expect(clonedObject).toEqual(originalObject);
    expect(clonedObject).not.toBe(originalObject);
    expect(clonedObject.a).not.toBe(originalObject.a);
    expect(clonedObject.a.b).not.toBe(originalObject.a.b);

    // Modificar el objeto clonado y verificar que el objeto original no se ve afectado
    clonedObject.a.b.c = 2;
    expect(originalObject.a.b.c).toBe(1);
  });
});