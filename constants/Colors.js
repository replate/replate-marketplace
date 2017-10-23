class Colors {

  static get main() {
    return '#24b47e';
  }

  static get white() {
    return '#ffffff';
  }

  static get black() {
    return '#000000';
  }

  static alphaColor(color, amount) {
    amount = Math.max(Math.min(amount, 1), 0)
    let amountHex = Math.round(amount * 255).toString(16);
    return color + amountHex;
  }
}

export default Colors;
