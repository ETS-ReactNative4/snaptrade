    String.prototype.float = function() {
  return parseFloat(this.replace(',', '.'));
   }


const Format = {
  percent: (n) =>
    FormatInternal.percentNonNull(n || 0),
   value: (n) =>
     FormatInternal.normalValue(n),
   float: (n) =>
     FormatInternal.normalValue(n.float() || 0),
}



const FormatInternal = {

  percentNonNull: (n) =>
    (n==0 ? '+0.00%' : ((n>0 ? ('+' + n.toFixed(2)) : (n.toFixed(2))) + '%')),
   normalValue: (n) =>
     (n==null ? null : (n>=0 ? n.toFixed(2) : n.toFixed(2))),
}

export default Format
