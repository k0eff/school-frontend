/**
 *
 * @param {*} str - the string to be accessed, the string should contain parameters enclosed with $( ) like  "blabla$(param)blabla"
 * @param {*} data - an object with properties for each param
 * @param accessFn - a custom function handling 2 params (data, capturedParamName) - which will return the param value
 */

const evaluateStrLiteral = (str, data, accessFn = false) =>
  str.replace(
    /\$\(\s*([^\s\)]+)\s*\)/g, //replace strings
    (_, capturedIdentifier) => {
      if (!accessFn) {
        return data[capturedIdentifier]
          ? data[capturedIdentifier]
          : console.log(
              `Warning: evaluateStrLiteral - missing property '${capturedIdentifier}' supplied in the data object. `
            );
      } else {
        return accessFn(data, capturedIdentifier);
      }
    }
  );

export default evaluateStrLiteral;
