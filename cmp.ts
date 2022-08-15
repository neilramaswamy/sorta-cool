type LESS_THAN = -1
type EQUAL_TO = 0
type GREATER_THAN = 1

// Returns -1, 0, or 1 depending on whether the integer A is less than, equal to, or greater than
// the integer B (respectively).
//
// Internally, this implementation uses the following rules:
//  * If A == B, return 0.
//  * If A < 0 and B >= 0, return -1.
//  * If A >= 0 and B < 0, return 1.
//  * If A > 0 and B > 0, PositiveIntegerCmp<A, B>.
//  * If A < 0 and B < 0, PositiveIntegerCmp<Abs<B>, Abs<A>>.
//
// That last case is tricky. Careful thinking will reveal that Cmp<A, B> when A and B are both
// negative, is the same as Cmp< |B|, |A| >. Take a moment to convince yourself of this.
//
// If you've thought about this for some time and it seems wrong, let me know -- I didn't actually
// think too hard about this (figured I could outsource to you).
type Cmp<A extends number, B extends number> = IsNegative<A> extends true
    ? IsNegative<B> extends true
        ? // Both negative. Notice the absolute value, AND the change of position!
          //
          // Unfortunately, TS is complaining. But I know what I'm doing (haha...).
          // @ts-expect-error
          PositiveIntegerCmp<Abs<B>, Abs<A>>
        : // A is negative but B is positive
          LESS_THAN
    : IsNegative<B> extends true
    ? // A is non-negative but B is negative
      GREATER_THAN
    : // A and B are both non-negative
      PositiveIntegerCmp<A, B>

// Determine which is greater between two strictly positive integers A and B.
//
// We do this by continually adding elements to AList and BList; WLOG, when the length of AList is
// becomes equal to A but BList is not equal to B, then B must be larger.
type PositiveIntegerCmp<
    A extends number,
    B extends number,
    AList extends any[] = [],
    BList extends any[] = []
> = Equal<A, AList['length']> extends true
    ? Equal<B, BList['length']> extends true
        ? // If A/BList both "reach" A/B at the same time, they have equal length.
          EQUAL_TO
        : // If |AList| reaches A before |BList| reaches B, then A must have less elements than B.
          LESS_THAN
    : Equal<B, BList['length']> extends true
    ? // If |BList| reaches B before |AList| reaches A, then A must have more elements than B.
      GREATER_THAN
    : // If neither list has reached their respective target, add an element to each list and recurse.
      PositiveIntegerCmp<A, B, [...AList, true], [...BList, true]>

// Sugar
type GreaterThan<A extends number, B extends number> = Equal<Cmp<A, B>, 1>

type cmpCases = [
    // Equality
    Expect<Equal<Cmp<0, 0>, 0>>,
    Expect<Equal<Cmp<-2, -2>, 0>>,
    Expect<Equal<Cmp<2, 2>, 0>>,

    // Greater than
    Expect<Equal<Cmp<-1, -5>, 1>>,
    Expect<Equal<Cmp<5, 1>, 1>>,
    Expect<Equal<Cmp<1, -5>, 1>>,

    // Less than
    Expect<Equal<Cmp<-5, -1>, -1>>,
    Expect<Equal<Cmp<1, 5>, -1>>,
    Expect<Equal<Cmp<-5, 1>, -1>>
]
