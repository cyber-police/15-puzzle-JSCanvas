class winDialogue {
  constructor() {
    this.restartButton = document.createElement("button");
    this.restartText = document.createTextNode("RESTART");
    this.exitButton = document.createElement("button");
    this.exitText = document.createTextNode("EXIT");

    this.restartButton.appendChild(this.restartText);
    this.exitButton.appendChild(this.exitText);
  }

  drawButton(el, x, y) {
    const active = document.activeElement === el;
    const width = 200;
    const height = 50;

    ctx.fillStyle = active ? "pink" : "lightgray";
    ctx.fillRect(x, y, width, height);

    ctx.font = "15px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = active ? "blue" : "black";
    ctx.fillText(el.textContent, x + width / 2, y + height / 2);
  }

  mousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.drawButton(this.restartButton, 830, 300);
    if (ctx.isPointInPath(x, y)) {
      this.restartButton.focus();
    }

    this.drawButton(this.exitButton, 830, 360);
    if (ctx.isPointInPath(x, y)) {
      this.exitButton.focus();
    }

    if (x >= 830 && x <= 1030 && y >= 300 && y <= 350) {
      document.location.reload();
    } else if (x >= 830 && x <= 1030 && y >= 360 && y <= 420) {
      window.open("https://www.google.com", "_self");
    }
  }

  dialogCursorPos = function (e) {
    this.mousePosition(e);
  };

  drawDialogue() {
    var self = this;

    this._dialogCursorPos = (event) => {
      self.dialogCursorPos(event);
    };
    canvas.addEventListener("click", this._dialogCursorPos);

    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(144, 106, 65)";
    ctx.fillRect(580, 270, 700, 200);

    ctx.fillStyle = "rgb(123, 114, 114)";
    ctx.fillRect(590, 280, 680, 180);

    this.drawButton(this.restartButton, 830, 300);
    this.drawButton(this.exitButton, 830, 360);
  }
}
