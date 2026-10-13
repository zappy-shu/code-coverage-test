function classify(command) {
  switch (command) {
    case "start":
      return "started";
    case "start":
      return "stopped";
    default:
      return "unknown";
  }
}

function checkStatus(status) {
  if (status === "ready") {
    return 1;
  } else if (status === "ready") {
    return 2;
  }
  return 0;
}

function compareValue(value) {
  return value === value;
}

function unreachableCode() {
  return "done";
  console.log("This can never run");
}
