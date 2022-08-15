/**
 * Implementation of different sorting algorithms in the type system.
 * 
 * The API to sort a list of integers in the type system is given by the sort type:
 *      type Sort<T extends number[]> = ... // the sorted type
 * 
 * There are a few internal implementations: insertion sort, merge sort, quick sort. We describe how
 * each of them work below.
 * 
 * @author Neil Ramaswamy
 * @dedication Shriram "Pyret" Krishnamurthi
 */

type sortCases = [
    Expect<Equal<Sort<[]>, []>>,

    Expect<Equal<Sort<[0]>, [0]>>,
    Expect<Equal<Sort<[-1]>, [-1]>>,
    Expect<Equal<Sort<[2]>, [2]>>,

    // Already sorted examples
    Expect<Equal<Sort<[1, 2, 3]>, [1, 2, 3]>>,
    // Expect<Equal<Sort<[-3, -2, -1]>, [-3, -2, -1]>>,
    Expect<Equal<Sort<[-2, 0, 2]>, [-2, 0, 2]>>,


    // Integers in "random" order
    Expect<Equal<Sort<[5, -2, -3, 0, 3]>, [-3, -2, 0, 3, 5]>>,
    Expect<Equal<Sort<[5, -2, 3, -3, 0, 3]>, [-3, -2, 0, 3, 3, 5]>>,

    // "Worst" possible case: list is fully descending 
    Expect<Equal<Sort<[5, 3, -1]>, [-1, 3, 5]>>,
]

// Merges two already-sorted integer arrays and "returns" the result.
//
// If both are empty, [] is returned. If one is empty but not the other, the non-empty one is
// returned. If both are non-empty, the minimum between the two lists is repeatedly added to an
// accumulator until both lists are empty; then the accumulator is returned.
type Merge<A extends number[], B extends number[]> =
    Len<A> extends 0
        ? Len<B> extends 0
        ? []
        : B 
    : Len<B> extends 0
        ? A
    // Split both arrays into first and rest. Compare the first elements of each, and accumulate
    // onto a recursive call to Merge.
    : A extends [infer AFirst extends number, ...infer ARest extends number[]]
        ? B extends [infer BFirst extends number, ...infer BRest extends number[]]
            ? If<GreaterThan<AFirst, BFirst>,
                [BFirst, ...Merge<[AFirst, ...ARest], BRest>],
                [AFirst, ...Merge<ARest, [BFirst, ...BRest]>]
            >
        : []
    : []

type Sort<T extends number[]> = SortWithAcc<T, []>

type SortWithAcc<T extends number[], Acc extends number[]> =
    IsEmpty<T> extends true 
        ? Acc
    : Same<T['length'], 1> extends true
        ? Merge<T, Acc>
    : T extends [infer First extends number, ...infer Rest extends number[]]
        ? SortWithAcc<Rest, Merge<[First], Acc>>
    : [] // Will never happen