

// SUPPORT FOR THE @1 @2 @3, etc shortcut syntax for referring to your own vals

function validateValRef(valRef: string) {
  // step 2.1 -- validate that each valRef is either @<int> or @<string>.<int> using regex. If not, error! 
  if (valRef.match(/@(\d+|\w+\.\d+)/g)) {
    return true;
  }
  return false;
}

// add this as a feature in v2
function cleanValRef(valRef: string, valHome: string) {
  if (valRef.match(/@(\d+)/g)) {
    return valRef.replace(/@(\d+)/g, `@${valHome}.$1`);
  }
  return valRef;
}