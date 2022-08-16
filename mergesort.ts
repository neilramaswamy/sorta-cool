// type MergeSort<T extends number[], S extends [number[], number[]] = BetterSplit<T>> =
//     // Len<T> extends 0 | 1 ? T : Merge<MergeSort<Split<T>[0]>, MergeSort<Split<T>[1]>>
//     Len<T> extends 0 | 1 ? T : Merge<MergeSort<S[0]>, MergeSort<S[1]>>

// Returns an array of numbers that appear at index 0, 2, 4, etc.
// type GetEvenIndexElements<T extends number[]> =
//     // Empty array
//     Same<Len<T>, 0> extends true
//         ? []
//         // One element array
//         : Same<Len<T>, 1> extends true
//         ? T
//         // More than one element
//         : T extends [infer First extends number, infer _ extends number, ...infer Rest extends number[]]
//         ? [First, ...GetEvenIndexElements<Rest>]
//         : [] // Cannot happen

// type GetOddIndexElements<T extends number[]> =
//     IsEmpty<T> extends true
//         ? []
//         : Same<Len<T>, 1> extends true
//         ? []
//         : T extends [infer _ extends number, infer Second extends number, ...infer Rest extends number[]]
//         ? [Second, ...GetOddIndexElements<Rest>]
//         : [] // Cannot happen

type Foo = BetterSplit<[1, 2, 3, 4, 5, 6]>

type BetterSplit<T extends number[]> =
    IsEmpty<T> extends true ? [[], []]
        : Same<Len<T>, 1> extends true
        ? [T, [1]]
        : T extends [infer First extends number, infer Second extends number, ...infer Rest extends number[]]
        ? SplitJoinThing<First, Second, BetterSplit<Rest>>
        : [[], []] // Will never happen

type SplitJoinThing<A extends number, B extends number, C extends [number[], number[]]> =
    C extends [infer K extends number[], infer T extends number[]]
        ? [[A, ...K], [B, ...T]]
        : [[], []] // Won't happen