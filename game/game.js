var TerminalEmulator = {
  init: function (screen) {
    var inst = Object.create(this);
    inst.screen = screen;
    inst.createInput();

    return inst;
  },

  createInput: function () {
    var inputField = document.createElement("div");
    var inputWrap = document.createElement("div");

    inputField.className = "terminal_emulator__field";
    inputField.innerHTML = "";
    inputWrap.appendChild(inputField);
    this.screen.appendChild(inputWrap);
    this.field = inputField;
    this.fieldwrap = inputWrap;
  },

  enterInput: function (input) {
    return new Promise((resolve, reject) => {
      var randomSpeed = (max, min) => {
        return Math.random() * (max - min) + min;
      };

      var speed = randomSpeed(70, 90);
      var i = 0;
      var str = "";
      var type = () => {
        str = str + input[i];
        this.field.innerHTML = str.replace(/ /g, "&nbsp;");
        i++;

        setTimeout(() => {
          if (i < input.length) {
            if (i % 5 === 0) speed = randomSpeed(80, 120);
            type();
          } else {
            console.log("tick");
            setTimeout(() => {
              console.log("tock");
              resolve();
            }, 400);
          }
        }, speed);
      };

      type();
    });
  },

  enterCommand: function () {
    return new Promise((resolve, reject) => {
      var resp = document.createElement("div");
      resp.className = "terminal_emulator__command";
      resp.innerHTML = this.field.innerHTML;
      this.screen.insertBefore(resp, this.fieldwrap);

      this.field.innerHTML = "";
      resolve();
    });
  },

  enterResponse: function (response) {
    return new Promise((resolve, reject) => {
      var resp = document.createElement("div");
      resp.className = "terminal_emulator__response";
      resp.innerHTML = response;
      this.screen.insertBefore(resp, this.fieldwrap);

      resolve();
    });
  },

  wait: function (time, busy) {
    busy = busy === undefined ? true : busy;
    return new Promise((resolve, reject) => {
      if (busy) {
        this.field.classList.add("waiting");
      } else {
        this.field.classList.remove("waiting");
      }
      setTimeout(() => {
        resolve();
      }, time);
    });
  },

  reset: function () {
    return new Promise((resolve, reject) => {
      this.field.classList.remove("waiting");
      resolve();
    });
  },
};

/*
 *
 * This is where the magic happens
 *
 */

var TE = TerminalEmulator.init(document.getElementById("screen"));

TE.wait(1000, false)
  .then(TE.enterInput.bind(TE, "What's up Nigga bitch ass?"))
  .then(TE.enterCommand.bind(TE))
  .then(TE.enterResponse.bind(TE, "you good?"))
  .then(TE.wait.bind(TE, 2000))
  .then(TE.enterResponse.bind(TE, "- I know you wanna say smth"))
  .then(TE.wait.bind(TE, 2000))
  .then(TE.enterResponse.bind(TE, "- but you cannot (:"))
  .then(TE.wait.bind(TE, 1000))
  .then(TE.enterResponse.bind(TE, "- hahaha "))
  .then(TE.wait.bind(TE, 300))
  .then(TE.enterResponse.bind(TE, "- This is my website "))
  .then(TE.wait.bind(TE, 1000))
  .then(TE.enterResponse.bind(TE, "you are in my hands baby"))
  .then(TE.wait.bind(TE, 2000, false))
  .then(TE.enterInput.bind(TE, "yes baby"))
  .then(TE.enterCommand.bind(TE))
  .then(TE.wait.bind(TE, 400))
  .then(TE.enterResponse.bind(TE, "Don't worry"))
  .then(TE.wait.bind(TE, 1800, false))
  .then(TE.enterInput.bind(TE, "you will be okay (;"))
  .then(TE.enterCommand.bind(TE))
  .then(TE.wait.bind(TE, 1000))
  .then(TE.enterResponse.bind(TE, "Qarrochchi"))
  .then(TE.wait.bind(TE, 2000))
  .then(TE.enterResponse.bind(TE, "I was joking, Have a good day baby <3"))
  .then(TE.reset.bind(TE));
