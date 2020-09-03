class Warning {
  constructor(element,typeWarn,description) {
    this.element = document.getElementById(element);
    this.typeWarn  = typeWarn;
    this.description = description;
  }
Active(){
  this.element.style.display = "none";
}
}

// console.log(warn);
let warn = new Warning("btn-settings","typeError","description");
console.log(warn);

//warn.Active();
