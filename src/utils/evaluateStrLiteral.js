const evaluateStrLiteral = (str, data) =>
  str.replace(
    /\$\(\s*([^\s\)]+)\s*\)/g, //replace strings like "blabla$(param)blabla"
    (_, capturedIdentifier) =>
      data[capturedIdentifier]
        ? data[capturedIdentifier]
        : console.log(
            `Warning: evaluateStrLiteral - missing property '${capturedIdentifier}' supplied in the data object. `
          )
  );

export default evaluateStrLiteral;
