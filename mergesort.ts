type MergeSort<T extends number[]> =
    // @ts-ignore-error: this code is so reasonable I don't deserved to be yelled at
    Len<T> extends 0 | 1 ? T : Merge<MergeSort<Split<T>[0]>, MergeSort<Split<T>[1]>>

// Gives back two arrays
type Split<
    T extends number[],
    Acc1 extends number[] = [],
    Acc2 extends number[] = []
> = IsEmpty<T> extends true
    ? [Acc1, Acc2]
    : Same<Len<T>, 1> extends true
    ? [[...Acc1, ...T], Acc2]
    : T extends [infer First extends number, infer Second extends number, ...infer Rest extends number[]]
    ? Split<Rest, [...Acc1, First], [...Acc2, Second]>
    : T extends [infer First extends number, ...infer Rest extends number[]]
    ? IsEmpty<Rest> extends true ? [[...Acc1, First], Acc2] : [[], []] // Won't happen
    : [Acc1, Acc2]