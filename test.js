const customers = [10, 4, 6, 3, 6],
  n = 5;

function queueTime(customers, n) {
  if (customers.length == 0) {
    return 0;
  } else if (customers.length < n) {
    return Math.max(...customers);
  }
  let kassy = [];
  for (let i = 0; i < n; i++) {
    kassy.push(customers.shift());
  }
  while (customers.length > 0) {
    kassy.sort(function (a, b) {
      return a - b;
    });

    kassy[0] += customers.shift();
  }
  console.log(kassy, customers);
  return Math.max(...kassy);
}

console.log(queueTime(customers, n));

console.log(Array(5).fill(0));

console.log(-1 + 0);

Array(1).fill(0);
