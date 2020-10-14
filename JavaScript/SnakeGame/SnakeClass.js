export default class Snake {
  constructor(color) {
    this.length = 5;
    this.height = 4;
    // this will store the positons of the sanke Body as boxes
    this.cordinates = [{ xCordinate:10, yCordinate:10 }];
    // the padding between 2 boxes
    this.padding = 1;
    // they represent the direction
    this.horizontal = true;
    this.positive = true;
    this.color=color;
  }

  draw(ctx) {
    ctx.beginPath();
    this.cordinates.forEach((box) => {
      ctx.rect(box.xCordinate, box.yCordinate, this.length, this.height);
      ctx.fillStyle = "#ff0000";
      ctx.stroke();
      ctx.fillStyle = this.color;
      ctx.fill();
    });
    ctx.closePath();
  }

  move(keyCode) {
    // this switch case will chnage the boolean values and then pass the real move function
    switch (keyCode) {
      case 37:
        if (this.horizontal && this.positive) {
          return 0;
        } else {
          this.horizontal = true;
          this.positive = false;
          break;
        }
      case 38:
        if (!this.horizontal && this.positive) {
          return 0;
        } else {
          this.horizontal = false;
          this.positive = false;
          break;
        }

      case 39:
        if (this.horizontal && !this.positive) {
          return 0;
        } else {
          this.horizontal = true;
          this.positive = true;
          break;
        }
      case 40:
        if (!this.horizontal && !this.positive) {
          return 0;
        } else {
          this.horizontal = false;
          this.positive = true;
          break;
        }

      default:
        return 0;
    }

    this.modifyBoxes(this.horizontal, this.positive, false);
  }

  grow() {
    this.modifyBoxes(this.horizontal, this.positive, true);
  }




  modifyBoxes(horizontal, positive, grow) {
    /*
     * the hash in the name makes it  a private method so that one cannot misuuse it ;-D
     * this function takes 3 @params all in boolean
     * the first 2 parameters are for deciding the direction in 2d plane
     * * the third parameter is passed when the snake is requied to grow
     */

    let lastBox, firstBox;

    if (!grow) {
      // pick up the last element from stack
      lastBox = this.cordinates.pop();
    }
    if (this.cordinates[0] == null) {
      firstBox = lastBox;
    } else {
      firstBox = this.cordinates[0];
    }
    // alter it according to the given parameters

    if (horizontal) {
      if (positive) {
        var xCordinate = firstBox.xCordinate + this.length + this.padding;
      } else {
        var xCordinate = firstBox.xCordinate - this.length - this.padding;
      }
      var yCordinate = firstBox.yCordinate;
    } else {
      if (positive) {
        var yCordinate = firstBox.yCordinate + this.height + this.padding;
      } else {
        var yCordinate = firstBox.yCordinate - this.height - this.padding;
      }
      var xCordinate = firstBox.xCordinate;
    }

    // place it at the first to give effect of movement
    this.cordinates.unshift({ xCordinate, yCordinate });
  }
}
