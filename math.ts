// Returns whether an integer is negative.
//
// To do this, we cast the number to a string and see if that is a sub-type of the set of all
// strings that start with a minus. If it is, then the number is negative.
type IsNegative<A extends number> = `${A}` extends `-${infer _}` ? true : false

// Returns the absolute value of the given number.
//
// This needs Typescript ^4.8.0 to work properly!
type Abs<A extends number> = `${A}` extends `-${infer Rest extends number}` ? Rest : A

type absCases = [
    Expect<Equal<Abs<0>, 0>>,
    Expect<Equal<Abs<1>, 1>>,
    Expect<Equal<Abs<12>, 12>>,

    Expect<Equal<Abs<-1>, 1>>,
    Expect<Equal<Abs<-12>, 12>>
]
