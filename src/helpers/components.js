export const renderIf = (condition, elmt) => condition ? elmt : null;
export const renderIfElse = (condition, elmt, elseElmt) => condition ? elmt : elseElmt;
export const renderIfElseIf = (condition, elmt, anotherCondition, elseElmt) => condition ? elmt : (anotherCondition ? elseElmt : null);