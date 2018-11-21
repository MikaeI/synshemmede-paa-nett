function Pugg(element, cards) {
  this.cards = cards;
  this.queue = new PuggQueue(this, 'pugg-queue');
  this.face = new PuggFace(this, element);
  var currentId
  if(this.hasStorage())
    currentId = localStorage.getItem("pugg-current-card");
  if(currentId) {
    this.currentCard = this.getCardById(currentId);
    this.face.setCardDrawnState();
  } else
    this.draw();
}

Pugg.prototype.hasStorage = function() {
  if(this.hasStorage_ != undefined)
    return this.hasStorage_;
  try {
    var storage = window["localStorage"],
        x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    this.hasStorage_ = true;
    return true;
  }
  catch(e) {
    this.hasStorage_ = false;
    return false;
  }
};

Pugg.prototype.getCardById = function(id) {
  var card = {
    "id" : id,
    "level" : 0
  };
  Pugg.assign(card, this.cards[id]);
  if(Array.isArray(card.front))
    card.front = card.front.join("\n");
  if(Array.isArray(card.back))
    card.back = card.back.join("\n");
  if(Array.isArray(card.playground))
    card.playground = card.playground.join("\n");
  return card;
};

Pugg.assign = function(to, from) {
  for(prop in from)
    to[prop] = from[prop];
};

Pugg.prototype.draw = function() {
  var card;
  if(this.queue.hasNext()) {
    var item = this.queue.popNext();
    card = this.getCardById(item.id);
    Pugg.assign(card, item);
  } else {
    // consider making this at least O(n) rather than O(n^2)
    for(var id in this.cards) {
      var qstack = this.queue.getStack();
      var alreadyDrawn = false;
      for(var i = 0; i < qstack.length; i++) {
        if(qstack[i].id == id) {
          alreadyDrawn = true;
          break;
        }
      }
      if(!alreadyDrawn) {
        card = this.getCardById(id);
        break;
      }
    }
  }

  if(!card) {
    this.face.setNoMoreCardsState();
    var pugg = this;
    setTimeout(function() { pugg.draw(); }, this.queue.getNextTime() - Date.now());
    return;
  }

  if(!card.playground)
    card.playground = "";

  this.currentCard = card;
  if(this.hasStorage())
    localStorage.setItem("pugg-current-card", card.id);
  this.face.setCardDrawnState();
}

Pugg.prototype.show = function() {
  this.face.setCardShownState();
};

Pugg.prototype.good = function() {
  this.queue.schedule(this.currentCard.id, this.currentCard.level+1);
  localStorage.removeItem("pugg-current-card");
  this.draw();
};

Pugg.prototype.again = function() {
  this.queue.schedule(this.currentCard.id, 0);
  localStorage.removeItem("pugg-current-card");
  this.draw();
};

Pugg.calcInterval = function(level) {
  switch(level) {
  case 0:
    return 60 * 5; // 5 minutes
  case 1:
    return 60 * 20; // 20 minutes
  case 2:
    return 60 * 60 * 24; // 1 day
  default:
    return 60 * 60 * 24 * Math.pow(2.5, level - 2);
  }
};

function PuggQueue(pugg, storageId) {
  this.pugg = pugg;
  this.storageId = storageId;
  var stored;
  if(pugg.hasStorage())
    stored = localStorage.getItem(storageId);
  if(stored)
    this.stack = JSON.parse(stored);
  else
    this.stack = [];
}

PuggQueue.prototype.toJSON = function() { return this.stack; };

PuggQueue.prototype.updateStorage = function() {
  if(this.pugg.hasStorage())
    localStorage.setItem(this.storageId, JSON.stringify(this.stack));
};

PuggQueue.prototype.schedule = function(id, level) {
  var item = {
    "id" : id,
    "level" : level,
    "time" : Date.now() + 1000 * Pugg.calcInterval(level)
  };
  var i;
  for(i = 0; i < this.stack.length; i++) {
    if(item.time < this.stack[i].time)
      break;
  }
  this.stack.splice(i, 0, item);
  this.updateStorage();
}

PuggQueue.prototype.hasNext = function() {
  if(this.stack.length == 0)
    return false;
  if(this.stack[0].time > Date.now())
    return false;
  return true;
};

PuggQueue.prototype.popNext = function() {
  if(!this.hasNext())
    throw "Ingen kort er avsatt til nå";

  // get lowest level scheduled item
  var curIdx = 0;
  var now = Date.now();
  for(var i = curIdx+1; i < this.stack.length; i++) {
    if(this.stack[i].time > now)
      break;
    if(this.stack[i].level < this.stack[curIdx].level)
      curIdx = i;
  }
  var item = this.stack[curIdx];

  this.stack.splice(curIdx, 1);
  this.updateStorage();
  return item;
};

PuggQueue.prototype.getNextTime = function() {
  if(this.stack.length == 0)
    return null;
  return this.stack[0].time;
};

PuggQueue.prototype.getStack = function() {
  return this.stack;
};


function PuggFace(pugg, element) {
  this.pugg = pugg;
  this.element = element;
}

PuggFace.prototype.newDialog = function(label, describedby) {
  while(this.element.firstChild)
    this.element.removeChild(this.element.firstChild);
  var dialog = document.createElement("div"); 
  dialog.classList.add("pugg-dialog");
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-label", label);
  dialog.setAttribute("aria-describedby", describedby);
  this.element.appendChild(dialog);

  this.content = document.createElement("div");
  this.content.classList.add("pugg-content");
  dialog.appendChild(this.content);

  this.controls = document.createElement("div");
  this.controls.classList.add("pugg-controls");
  dialog.appendChild(this.controls);

  return dialog;
};

PuggFace.prototype.setCardDrawnState = function() {
  this.newDialog("Spørsmål", "pugg-front");

  var front = document.createElement("div");
  front.classList.add("pugg-front");
  front.setAttribute("id", "pugg-front");
  front.innerHTML = this.pugg.currentCard.front;
  this.content.appendChild(front);

  var showButton = document.createElement("button");
  var pugg = this.pugg;
  showButton.onclick = function() { pugg.show() };
  showButton.classList.add("pugg-button");
  showButton.classList.add("pugg-button-show");
  showButton.setAttribute("accesskey", "1");
  showButton.innerText = "Vis";
  this.controls.appendChild(showButton);
  showButton.focus();
};

PuggFace.prototype.setCardShownState = function() {

  var pugg = this.pugg;
  var dialog = this.newDialog("Svar", "pugg-back");

  var front = document.createElement("div");
  front.classList.add("pugg-front");
  front.setAttribute("id", "pugg-front");
  front.innerHTML = this.pugg.currentCard.front;
  this.content.appendChild(front);

  this.content.appendChild(document.createElement("hr"));

  var back = document.createElement("div");
  back.classList.add("pugg-back");
  back.setAttribute("id", "pugg-back");
  back.innerHTML = pugg.currentCard.back;
  this.content.appendChild(back);

  if(pugg.currentCard.playground) {
    var playground = document.createElement("div");
    playground.classList.add("pugg-playground");
    playground.innerHTML = pugg.currentCard.playground;
    dialog.appendChild(playground);
  }

  while(this.controls.firstChild)
    this.controls.removeChild(this.controls.firstChild);

  var goodButton = document.createElement("button");
  goodButton.classList.add("pugg-button");
  goodButton.classList.add("pugg-button-good");
  goodButton.setAttribute("accesskey", "1");
  goodButton.onclick = function() { pugg.good(); };
  goodButton.innerText = "Bra";
  this.controls.appendChild(goodButton);

  var againButton = document.createElement("button");
  againButton.classList.add("pugg-button");
  againButton.classList.add("pugg-button-again");
  againButton.setAttribute("accesskey", "2");
  againButton.onclick = function() { pugg.again(); };
  againButton.innerText = "Igjen";
  this.controls.appendChild(againButton);

  goodButton.focus();
};

PuggFace.prototype.setNoMoreCardsState = function() {
  var pugg = this.pugg;
  var dialog = this.newDialog("Ingen flere kort", "pugg-message");
  var message = document.createElement("div");
  message.setAttribute("id", "pugg-message");
  var nextDate = new Date(pugg.queue.getNextTime());
  if(nextDate)
    message.innerText = "Neste kort blir tilgjengelig " + nextDate.toLocaleTimeString("nb") + " " + nextDate.toLocaleDateString("nb") + ".";
  else
    throw "Tilsynelatende ingen kort i det hele tatt";
  this.content.appendChild(message);
}


