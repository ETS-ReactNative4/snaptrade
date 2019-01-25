const Validate = {
    email: (e) =>
      e.indexOf("@")>0 && e.lastIndexOf(".")>e.indexOf("@")+1 && e.lastIndexOf(".")+2<e.length
}

export default Validate
