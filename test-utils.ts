// Super fancy testing utilities
type Expect<A extends true> = A
type NotExpect<A extends false> = A

// From Type Challenges.
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
    ? 1
    : 2
    ? true
    : false
