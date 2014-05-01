javascript:(function() {

  function injectScript(url, done, fn) {
    if (injectScript.cache[url]) return;
    injectScript.cache[url] = true;

    var a = document.createElement('script');
    a.src = url;
    a.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(a);

    fn = fn || function() {
      var rs = a.readyState;
      if (!rs || rs === 'loaded' || rs === 'complete') {
          a.onload = a.onreadystatechange = null;
          done();
      }
    };

    done = done || function() {};

    a.onload = a.onreadystatechange = fn;
  }

  injectScript.cache = {};

  function load(name, done) {
    var urls = {
      '_': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js',
      'lr': 'http://localhost:35729/livereload.js'
    };

    var url = urls[name] || name;
    injectScript(url, done);
  }

  load('lr');

}());
