// Miscellaneous utilities. There aren't enough categories of items here to really justify
// creating new files for each.

// Some boolean operations
type Not<A extends boolean> = A extends true ? false : true
type And<A extends boolean, B extends boolean> = A extends true
    ? B extends true
        ? true
        : false
    : false

// Some control-flow logic
type If<A extends boolean, B, C> = A extends true ? B : C

// Set equality
type Same<A extends any, B extends any> = A extends B
    ? B extends A
        ? true
        : false
    : false

// Array stuff
type Len<A extends any[]> = A['length']
type IsEmpty<A extends any[]> = Same<Len<A>, 0>
