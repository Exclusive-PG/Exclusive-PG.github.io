class MediaContent {
  constructor(selector) {
    this.$element = document.getElementById(selector);
  }
  showContent() {
    this.$element.style.display = "block";
  }
  hideContent() {
    this.$element.style.display = "none";
  }
}

export default class MediaCircle extends MediaContent {
  constructor(settings) {
    super(settings.selector); // наследование конструктора
    this.$element.style.width = this.$element.style.height = settings.sizeCircle + "px";
    this.$element.style.backgroundColor = settings.backColor;
    this.$element.style.borderRadius = settings.borderRadius + "%";
  }
}
