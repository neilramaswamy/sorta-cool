type MergeSort<T extends number[]> =
    Len<T> extends 0 | 1
        ? T
        : Split<T> extends [infer EvenSplit extends number[], infer OddSplit extends number[]] 
            ? Merge<MergeSort<EvenSplit>, MergeSort<OddSplit>>
            : T // Will never happen

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