(function(w){

  let dsAlgo = function(algorithm) {
    return new dsAlgo.init(algorithm);
  };
  dsAlgo.prototype = {};
  dsAlgo.init = function(algorithm) {
    this.algorithm = algorithm;
  };
  // borrowing array methods
  let arr = [];
  let s = arr.slice;
  let i = arr.indexOf;
  let u = arr.push;
  dsAlgo.init.prototype = dsAlgo.prototype;

  // merge Sort
  dsAlgo.prototype.mergeSort = function(data) {
    if (Array.isArray(data)) {
        if (data.length === 1) {
          return data;
        } else {
          let m = Math.floor(data.length / 2);
          let l = this.mergeSort(s.apply(data, [0, m]));
          let r = this.mergeSort(s.apply(data, [m, data.length]));
          return merge(l, r);
        }
    }
  }

  function merge(a, b) {
    let i = 0, j = 0,sortedArr = [];
    while (i < a.length && j < b.length) {
      if ( a[i] < b[j] ) {
          x = a[i++];
      } else {
          x = b[j++];
      }
      u.apply(sortedArr, [x]);
    }
    while (i < a.length) {
      u.apply(sortedArr, [a[i++]]);
    }
    while (j < b.length) {
      u.apply(sortedArr, [b[j++]]);
    }
    return sortedArr;
  }

  w.dsAlgo = w.$ds = dsAlgo;

})(window);