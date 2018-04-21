# ui-predicate

Finally a predicate UI component for the Web.



http://nshipster.com/nspredicate/


Predicate
  -
NSComparisonPredicate(NSExpression lhs, NSExpression rhs, NSPredicateOperatorType)

NSCompoundPredicate(type (AND, OR, NOT), subpredicates:[NSComparisonPredicate])


addPredicate

Rules:
- [v] CompoundPredicate contains Predicate|CompoundPredicate
- [ ] Root CompoundPredicate can't have less (and it child) than 1 Predicate
- [ ] at creation-time
- [ ] at remove-time
- [ ] When removing a Predicate|CompoundPredicate from a CompoundPredicate, if length==0 then remove the CompoundPredicate
