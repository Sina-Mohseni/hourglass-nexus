"use strict";

/* ══════════ IndexedDB Storage Layer ══════════ */
var acDB = {
  _db: null, _cache: {}, STORE: "acStore", DB_NAME: "HourglassNexus", DB_VER: 1,
  init: function(){
    var self = this;
    return new Promise(function(resolve){
      try {
        var req = indexedDB.open(self.DB_NAME, self.DB_VER);
        req.onupgradeneeded = function(e){
          var db = e.target.result;
          if(!db.objectStoreNames.contains(self.STORE)) db.createObjectStore(self.STORE);
        };
        req.onsuccess = function(e){
          self._db = e.target.result;
          var tx = self._db.transaction(self.STORE, "readonly");
          var store = tx.objectStore(self.STORE);
          var cur = store.openCursor();
          cur.onsuccess = function(ev){
            var c = ev.target.result;
            if(c){ self._cache[c.key] = c.value; c.continue() }
          };
          tx.oncomplete = function(){ resolve() };
          tx.onerror = function(){ resolve() };
        };
        req.onerror = function(){ resolve() };
      } catch(e){ resolve() }
    });
  },
  get: function(k){ return this._cache.hasOwnProperty(k) ? this._cache[k] : null },
  set: function(k, v){
    this._cache[k] = v;
    if(!this._db) return;
    try {
      var tx = this._db.transaction(this.STORE,"readwrite");
      tx.objectStore(this.STORE).put(v, k);
    } catch(e){}
  },
  setMany: function(pairs){
    var self = this;
    pairs.forEach(function(p){ self._cache[p[0]] = p[1] });
    if(!self._db) return;
    try {
      var tx = self._db.transaction(self.STORE, "readwrite");
      var store = tx.objectStore(self.STORE);
      pairs.forEach(function(p){ store.put(p[1], p[0]) });
    } catch(e){}
  },
  setBig: function(k, v){
    var self = this;
    self._cache[k] = v;
    return new Promise(function(resolve){
      if(!self._db){ resolve(false); return }
      try {
        var tx = self._db.transaction(self.STORE, "readwrite");
        tx.objectStore(self.STORE).put(v, k);
        tx.oncomplete = function(){ resolve(true) };
        tx.onerror = function(){ resolve(false) };
        tx.onabort = function(){ resolve(false) };
      } catch(e){ resolve(false) }
    });
  },
  remove: function(k){
    delete this._cache[k];
    if(this._db) try { this._db.transaction(this.STORE,"readwrite").objectStore(this.STORE).delete(k) } catch(e){}
  },
  clear: function(){
    this._cache = {};
    if(this._db) try { this._db.transaction(this.STORE,"readwrite").objectStore(this.STORE).clear() } catch(e){}
  }
};
