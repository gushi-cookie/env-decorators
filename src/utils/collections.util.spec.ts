import { arrays } from './collections.util';


test('should work properly - removeItem()', () => {
    let arr;
    let index;


    // Test #1
    arr = [1, 2, 3];
    index = arrays.removeItem(arr, 2);
    expect(arr.length).toBe(2);
    expect(index).toBe(1);


    // Test #2
    arr = [1, 2, 3];
    index = arrays.removeItem(arr, 4);
    expect(arr.length).toBe(3);
    expect(index).toBe(-1);


    // Test #3
    let obj = {};
    arr = [obj, {}, {}];
    index = arrays.removeItem(arr, obj);
    expect(arr.length).toBe(2);
    expect(index).toBe(0);


    // Test #4
    arr = [1];
    expect(() => {
        arrays.removeItem(arr, null as any);
        arrays.removeItem(arr, undefined as any);
        arrays.removeItem(arr, 'string' as any);
        arrays.removeItem(arr, {} as any);
    }).not.toThrow();
});