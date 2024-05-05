let arr = [1, 5, NaN, 5];

function terst(arr) {
  if (
    arr.some((el) => {
      console.log(el);
      return isNaN(el);
    })
  ) {
    console.log("yes");
    return;
  }
  console.log("false");
}

terst(arr);
