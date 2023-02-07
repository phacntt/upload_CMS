export const getDifference = (array1: any[], array2: any[]) => {
    return array1.filter(
        object1 => !array2.some(
            object2 => object1 === object2
        ),
    );
}