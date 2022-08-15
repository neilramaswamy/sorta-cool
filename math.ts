// Returns whether an integer is negative.
//
// To do this, we cast the number to a string and see if that is a sub-type of the set of all
// strings that start with a minus. If it is, then the number is negative.
type IsNegative<A extends number> = `${A}` extends `-${infer _}` ? true : false

// Returns the absolute value of the given number.
//
// We make the AtoI call with Rest because Typescript 4.7 doesn't narrow Rest to be a *specific*
// number, even if we have `infer Rest extends number`. To get around this (we really want Abs
// to return a specific number), we infer it as a string and "cast" it to a number.
type Abs<A extends number> = `${A}` extends `-${infer Rest}` ? AtoI<Rest> : A

// "Casts" A, a string that represents a positive integer, to the desired number.
//
// Internally, it works by keeping a counter whose length is increased by 1 until its length (as
// a string) is equal to A. When that happens, we return the length of the counter, which is a
// number.
type AtoI<A extends string, Counter extends number[] = []> = Same<
    A,
    `${Counter['length']}`
> extends true
    ? Counter['length']
    : AtoI<A, [0, ...Counter]>

type absCases = [
    Expect<Equal<Abs<0>, 0>>,
    Expect<Equal<Abs<1>, 1>>,
    Expect<Equal<Abs<12>, 12>>,

    Expect<Equal<Abs<-1>, 1>>,
    Expect<Equal<Abs<-12>, 12>>
]
