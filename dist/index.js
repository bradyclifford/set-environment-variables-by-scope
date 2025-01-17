var __commonJS = (cb, mod) =>
  function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

// node_modules/@actions/core/lib/utils.js
var require_utils = __commonJS({
  'node_modules/@actions/core/lib/utils.js'(exports2) {
    'use strict';
    Object.defineProperty(exports2, '__esModule', { value: true });
    exports2.toCommandProperties = exports2.toCommandValue = void 0;
    function toCommandValue(input) {
      if (input === null || input === void 0) {
        return '';
      } else if (typeof input === 'string' || input instanceof String) {
        return input;
      }
      return JSON.stringify(input);
    }
    exports2.toCommandValue = toCommandValue;
    function toCommandProperties(annotationProperties) {
      if (!Object.keys(annotationProperties).length) {
        return {};
      }
      return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
      };
    }
    exports2.toCommandProperties = toCommandProperties;
  }
});

// node_modules/@actions/core/lib/command.js
var require_command = __commonJS({
  'node_modules/@actions/core/lib/command.js'(exports2) {
    'use strict';
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              }
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, 'default', { enumerable: true, value: v });
          }
        : function (o, v) {
            o['default'] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== 'default' && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    Object.defineProperty(exports2, '__esModule', { value: true });
    exports2.issue = exports2.issueCommand = void 0;
    var os = __importStar(require('os'));
    var utils_1 = require_utils();
    function issueCommand(command, properties, message) {
      const cmd = new Command(command, properties, message);
      process.stdout.write(cmd.toString() + os.EOL);
    }
    exports2.issueCommand = issueCommand;
    function issue(name, message = '') {
      issueCommand(name, {}, message);
    }
    exports2.issue = issue;
    var CMD_STRING = '::';
    var Command = class {
      constructor(command, properties, message) {
        if (!command) {
          command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
      }
      toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
          cmdStr += ' ';
          let first = true;
          for (const key in this.properties) {
            if (this.properties.hasOwnProperty(key)) {
              const val = this.properties[key];
              if (val) {
                if (first) {
                  first = false;
                } else {
                  cmdStr += ',';
                }
                cmdStr += `${key}=${escapeProperty(val)}`;
              }
            }
          }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
      }
    };
    function escapeData(s) {
      return utils_1.toCommandValue(s).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
    }
    function escapeProperty(s) {
      return utils_1.toCommandValue(s).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A').replace(/:/g, '%3A').replace(/,/g, '%2C');
    }
  }
});

// node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJS({
  'node_modules/@actions/core/lib/file-command.js'(exports2) {
    'use strict';
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              }
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, 'default', { enumerable: true, value: v });
          }
        : function (o, v) {
            o['default'] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== 'default' && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    Object.defineProperty(exports2, '__esModule', { value: true });
    exports2.issueCommand = void 0;
    var fs = __importStar(require('fs'));
    var os = __importStar(require('os'));
    var utils_1 = require_utils();
    function issueCommand(command, message) {
      const filePath = process.env[`GITHUB_${command}`];
      if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
      }
      if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
      }
      fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
      });
    }
    exports2.issueCommand = issueCommand;
  }
});

// node_modules/@actions/http-client/proxy.js
var require_proxy = __commonJS({
  'node_modules/@actions/http-client/proxy.js'(exports2) {
    'use strict';
    Object.defineProperty(exports2, '__esModule', { value: true });
    function getProxyUrl(reqUrl) {
      let usingSsl = reqUrl.protocol === 'https:';
      let proxyUrl;
      if (checkBypass(reqUrl)) {
        return proxyUrl;
      }
      let proxyVar;
      if (usingSsl) {
        proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
      } else {
        proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY'];
      }
      if (proxyVar) {
        proxyUrl = new URL(proxyVar);
      }
      return proxyUrl;
    }
    exports2.getProxyUrl = getProxyUrl;
    function checkBypass(reqUrl) {
      if (!reqUrl.hostname) {
        return false;
      }
      let noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
      if (!noProxy) {
        return false;
      }
      let reqPort;
      if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
      } else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
      } else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
      }
      let upperReqHosts = [reqUrl.hostname.toUpperCase()];
      if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
      }
      for (let upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperReqHosts.some(x => x === upperNoProxyItem)) {
          return true;
        }
      }
      return false;
    }
    exports2.checkBypass = checkBypass;
  }
});

// node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJS({
  'node_modules/tunnel/lib/tunnel.js'(exports2) {
    'use strict';
    var net = require('net');
    var tls = require('tls');
    var http = require('http');
    var https = require('https');
    var events = require('events');
    var assert = require('assert');
    var util = require('util');
    exports2.httpOverHttp = httpOverHttp;
    exports2.httpsOverHttp = httpsOverHttp;
    exports2.httpOverHttps = httpOverHttps;
    exports2.httpsOverHttps = httpsOverHttps;
    function httpOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      return agent;
    }
    function httpsOverHttp(options) {
      var agent = new TunnelingAgent(options);
      agent.request = http.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function httpOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      return agent;
    }
    function httpsOverHttps(options) {
      var agent = new TunnelingAgent(options);
      agent.request = https.request;
      agent.createSocket = createSecureSocket;
      agent.defaultPort = 443;
      return agent;
    }
    function TunnelingAgent(options) {
      var self = this;
      self.options = options || {};
      self.proxyOptions = self.options.proxy || {};
      self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
      self.requests = [];
      self.sockets = [];
      self.on('free', function onFree(socket, host, port, localAddress) {
        var options2 = toOptions(host, port, localAddress);
        for (var i = 0, len = self.requests.length; i < len; ++i) {
          var pending = self.requests[i];
          if (pending.host === options2.host && pending.port === options2.port) {
            self.requests.splice(i, 1);
            pending.request.onSocket(socket);
            return;
          }
        }
        socket.destroy();
        self.removeSocket(socket);
      });
    }
    util.inherits(TunnelingAgent, events.EventEmitter);
    TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
      var self = this;
      var options = mergeOptions({ request: req }, self.options, toOptions(host, port, localAddress));
      if (self.sockets.length >= this.maxSockets) {
        self.requests.push(options);
        return;
      }
      self.createSocket(options, function (socket) {
        socket.on('free', onFree);
        socket.on('close', onCloseOrRemove);
        socket.on('agentRemove', onCloseOrRemove);
        req.onSocket(socket);
        function onFree() {
          self.emit('free', socket, options);
        }
        function onCloseOrRemove(err) {
          self.removeSocket(socket);
          socket.removeListener('free', onFree);
          socket.removeListener('close', onCloseOrRemove);
          socket.removeListener('agentRemove', onCloseOrRemove);
        }
      });
    };
    TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
      var self = this;
      var placeholder = {};
      self.sockets.push(placeholder);
      var connectOptions = mergeOptions({}, self.proxyOptions, {
        method: 'CONNECT',
        path: options.host + ':' + options.port,
        agent: false,
        headers: {
          host: options.host + ':' + options.port
        }
      });
      if (options.localAddress) {
        connectOptions.localAddress = options.localAddress;
      }
      if (connectOptions.proxyAuth) {
        connectOptions.headers = connectOptions.headers || {};
        connectOptions.headers['Proxy-Authorization'] = 'Basic ' + new Buffer(connectOptions.proxyAuth).toString('base64');
      }
      debug('making CONNECT request');
      var connectReq = self.request(connectOptions);
      connectReq.useChunkedEncodingByDefault = false;
      connectReq.once('response', onResponse);
      connectReq.once('upgrade', onUpgrade);
      connectReq.once('connect', onConnect);
      connectReq.once('error', onError);
      connectReq.end();
      function onResponse(res) {
        res.upgrade = true;
      }
      function onUpgrade(res, socket, head) {
        process.nextTick(function () {
          onConnect(res, socket, head);
        });
      }
      function onConnect(res, socket, head) {
        connectReq.removeAllListeners();
        socket.removeAllListeners();
        if (res.statusCode !== 200) {
          debug('tunneling socket could not be established, statusCode=%d', res.statusCode);
          socket.destroy();
          var error = new Error('tunneling socket could not be established, statusCode=' + res.statusCode);
          error.code = 'ECONNRESET';
          options.request.emit('error', error);
          self.removeSocket(placeholder);
          return;
        }
        if (head.length > 0) {
          debug('got illegal response body from proxy');
          socket.destroy();
          var error = new Error('got illegal response body from proxy');
          error.code = 'ECONNRESET';
          options.request.emit('error', error);
          self.removeSocket(placeholder);
          return;
        }
        debug('tunneling connection has established');
        self.sockets[self.sockets.indexOf(placeholder)] = socket;
        return cb(socket);
      }
      function onError(cause) {
        connectReq.removeAllListeners();
        debug('tunneling socket could not be established, cause=%s\n', cause.message, cause.stack);
        var error = new Error('tunneling socket could not be established, cause=' + cause.message);
        error.code = 'ECONNRESET';
        options.request.emit('error', error);
        self.removeSocket(placeholder);
      }
    };
    TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
      var pos = this.sockets.indexOf(socket);
      if (pos === -1) {
        return;
      }
      this.sockets.splice(pos, 1);
      var pending = this.requests.shift();
      if (pending) {
        this.createSocket(pending, function (socket2) {
          pending.request.onSocket(socket2);
        });
      }
    };
    function createSecureSocket(options, cb) {
      var self = this;
      TunnelingAgent.prototype.createSocket.call(self, options, function (socket) {
        var hostHeader = options.request.getHeader('host');
        var tlsOptions = mergeOptions({}, self.options, {
          socket,
          servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
        });
        var secureSocket = tls.connect(0, tlsOptions);
        self.sockets[self.sockets.indexOf(socket)] = secureSocket;
        cb(secureSocket);
      });
    }
    function toOptions(host, port, localAddress) {
      if (typeof host === 'string') {
        return {
          host,
          port,
          localAddress
        };
      }
      return host;
    }
    function mergeOptions(target) {
      for (var i = 1, len = arguments.length; i < len; ++i) {
        var overrides = arguments[i];
        if (typeof overrides === 'object') {
          var keys = Object.keys(overrides);
          for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
            var k = keys[j];
            if (overrides[k] !== void 0) {
              target[k] = overrides[k];
            }
          }
        }
      }
      return target;
    }
    var debug;
    if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
      debug = function () {
        var args = Array.prototype.slice.call(arguments);
        if (typeof args[0] === 'string') {
          args[0] = 'TUNNEL: ' + args[0];
        } else {
          args.unshift('TUNNEL:');
        }
        console.error.apply(console, args);
      };
    } else {
      debug = function () {};
    }
    exports2.debug = debug;
  }
});

// node_modules/tunnel/index.js
var require_tunnel2 = __commonJS({
  'node_modules/tunnel/index.js'(exports2, module2) {
    module2.exports = require_tunnel();
  }
});

// node_modules/@actions/http-client/index.js
var require_http_client = __commonJS({
  'node_modules/@actions/http-client/index.js'(exports2) {
    'use strict';
    Object.defineProperty(exports2, '__esModule', { value: true });
    var http = require('http');
    var https = require('https');
    var pm = require_proxy();
    var tunnel;
    var HttpCodes;
    (function (HttpCodes2) {
      HttpCodes2[(HttpCodes2['OK'] = 200)] = 'OK';
      HttpCodes2[(HttpCodes2['MultipleChoices'] = 300)] = 'MultipleChoices';
      HttpCodes2[(HttpCodes2['MovedPermanently'] = 301)] = 'MovedPermanently';
      HttpCodes2[(HttpCodes2['ResourceMoved'] = 302)] = 'ResourceMoved';
      HttpCodes2[(HttpCodes2['SeeOther'] = 303)] = 'SeeOther';
      HttpCodes2[(HttpCodes2['NotModified'] = 304)] = 'NotModified';
      HttpCodes2[(HttpCodes2['UseProxy'] = 305)] = 'UseProxy';
      HttpCodes2[(HttpCodes2['SwitchProxy'] = 306)] = 'SwitchProxy';
      HttpCodes2[(HttpCodes2['TemporaryRedirect'] = 307)] = 'TemporaryRedirect';
      HttpCodes2[(HttpCodes2['PermanentRedirect'] = 308)] = 'PermanentRedirect';
      HttpCodes2[(HttpCodes2['BadRequest'] = 400)] = 'BadRequest';
      HttpCodes2[(HttpCodes2['Unauthorized'] = 401)] = 'Unauthorized';
      HttpCodes2[(HttpCodes2['PaymentRequired'] = 402)] = 'PaymentRequired';
      HttpCodes2[(HttpCodes2['Forbidden'] = 403)] = 'Forbidden';
      HttpCodes2[(HttpCodes2['NotFound'] = 404)] = 'NotFound';
      HttpCodes2[(HttpCodes2['MethodNotAllowed'] = 405)] = 'MethodNotAllowed';
      HttpCodes2[(HttpCodes2['NotAcceptable'] = 406)] = 'NotAcceptable';
      HttpCodes2[(HttpCodes2['ProxyAuthenticationRequired'] = 407)] = 'ProxyAuthenticationRequired';
      HttpCodes2[(HttpCodes2['RequestTimeout'] = 408)] = 'RequestTimeout';
      HttpCodes2[(HttpCodes2['Conflict'] = 409)] = 'Conflict';
      HttpCodes2[(HttpCodes2['Gone'] = 410)] = 'Gone';
      HttpCodes2[(HttpCodes2['TooManyRequests'] = 429)] = 'TooManyRequests';
      HttpCodes2[(HttpCodes2['InternalServerError'] = 500)] = 'InternalServerError';
      HttpCodes2[(HttpCodes2['NotImplemented'] = 501)] = 'NotImplemented';
      HttpCodes2[(HttpCodes2['BadGateway'] = 502)] = 'BadGateway';
      HttpCodes2[(HttpCodes2['ServiceUnavailable'] = 503)] = 'ServiceUnavailable';
      HttpCodes2[(HttpCodes2['GatewayTimeout'] = 504)] = 'GatewayTimeout';
    })((HttpCodes = exports2.HttpCodes || (exports2.HttpCodes = {})));
    var Headers;
    (function (Headers2) {
      Headers2['Accept'] = 'accept';
      Headers2['ContentType'] = 'content-type';
    })((Headers = exports2.Headers || (exports2.Headers = {})));
    var MediaTypes;
    (function (MediaTypes2) {
      MediaTypes2['ApplicationJson'] = 'application/json';
    })((MediaTypes = exports2.MediaTypes || (exports2.MediaTypes = {})));
    function getProxyUrl(serverUrl) {
      let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
      return proxyUrl ? proxyUrl.href : '';
    }
    exports2.getProxyUrl = getProxyUrl;
    var HttpRedirectCodes = [
      HttpCodes.MovedPermanently,
      HttpCodes.ResourceMoved,
      HttpCodes.SeeOther,
      HttpCodes.TemporaryRedirect,
      HttpCodes.PermanentRedirect
    ];
    var HttpResponseRetryCodes = [HttpCodes.BadGateway, HttpCodes.ServiceUnavailable, HttpCodes.GatewayTimeout];
    var RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
    var ExponentialBackoffCeiling = 10;
    var ExponentialBackoffTimeSlice = 5;
    var HttpClientError = class extends Error {
      constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
      }
    };
    exports2.HttpClientError = HttpClientError;
    var HttpClientResponse = class {
      constructor(message) {
        this.message = message;
      }
      readBody() {
        return new Promise(async (resolve, reject) => {
          let output = Buffer.alloc(0);
          this.message.on('data', chunk => {
            output = Buffer.concat([output, chunk]);
          });
          this.message.on('end', () => {
            resolve(output.toString());
          });
        });
      }
    };
    exports2.HttpClientResponse = HttpClientResponse;
    function isHttps(requestUrl) {
      let parsedUrl = new URL(requestUrl);
      return parsedUrl.protocol === 'https:';
    }
    exports2.isHttps = isHttps;
    var HttpClient = class {
      constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
          if (requestOptions.ignoreSslError != null) {
            this._ignoreSslError = requestOptions.ignoreSslError;
          }
          this._socketTimeout = requestOptions.socketTimeout;
          if (requestOptions.allowRedirects != null) {
            this._allowRedirects = requestOptions.allowRedirects;
          }
          if (requestOptions.allowRedirectDowngrade != null) {
            this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
          }
          if (requestOptions.maxRedirects != null) {
            this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
          }
          if (requestOptions.keepAlive != null) {
            this._keepAlive = requestOptions.keepAlive;
          }
          if (requestOptions.allowRetries != null) {
            this._allowRetries = requestOptions.allowRetries;
          }
          if (requestOptions.maxRetries != null) {
            this._maxRetries = requestOptions.maxRetries;
          }
        }
      }
      options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
      }
      get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {});
      }
      del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {});
      }
      post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {});
      }
      patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {});
      }
      put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {});
      }
      head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {});
      }
      sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
      }
      async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
      }
      async request(verb, requestUrl, data, headers) {
        if (this._disposed) {
          throw new Error('Client has already been disposed.');
        }
        let parsedUrl = new URL(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1 ? this._maxRetries + 1 : 1;
        let numTries = 0;
        let response;
        while (numTries < maxTries) {
          response = await this.requestRaw(info, data);
          if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
            let authenticationHandler;
            for (let i = 0; i < this.handlers.length; i++) {
              if (this.handlers[i].canHandleAuthentication(response)) {
                authenticationHandler = this.handlers[i];
                break;
              }
            }
            if (authenticationHandler) {
              return authenticationHandler.handleAuthentication(this, info, data);
            } else {
              return response;
            }
          }
          let redirectsRemaining = this._maxRedirects;
          while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 && this._allowRedirects && redirectsRemaining > 0) {
            const redirectUrl = response.message.headers['location'];
            if (!redirectUrl) {
              break;
            }
            let parsedRedirectUrl = new URL(redirectUrl);
            if (parsedUrl.protocol == 'https:' && parsedUrl.protocol != parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
              throw new Error(
                'Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.'
              );
            }
            await response.readBody();
            if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
              for (let header in headers) {
                if (header.toLowerCase() === 'authorization') {
                  delete headers[header];
                }
              }
            }
            info = this._prepareRequest(verb, parsedRedirectUrl, headers);
            response = await this.requestRaw(info, data);
            redirectsRemaining--;
          }
          if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
            return response;
          }
          numTries += 1;
          if (numTries < maxTries) {
            await response.readBody();
            await this._performExponentialBackoff(numTries);
          }
        }
        return response;
      }
      dispose() {
        if (this._agent) {
          this._agent.destroy();
        }
        this._disposed = true;
      }
      requestRaw(info, data) {
        return new Promise((resolve, reject) => {
          let callbackForResult = function (err, res) {
            if (err) {
              reject(err);
            }
            resolve(res);
          };
          this.requestRawWithCallback(info, data, callbackForResult);
        });
      }
      requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof data === 'string') {
          info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
          if (!callbackCalled) {
            callbackCalled = true;
            onResult(err, res);
          }
        };
        let req = info.httpModule.request(info.options, msg => {
          let res = new HttpClientResponse(msg);
          handleResult(null, res);
        });
        req.on('socket', sock => {
          socket = sock;
        });
        req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
          if (socket) {
            socket.end();
          }
          handleResult(new Error('Request timeout: ' + info.options.path), null);
        });
        req.on('error', function (err) {
          handleResult(err, null);
        });
        if (data && typeof data === 'string') {
          req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
          data.on('close', function () {
            req.end();
          });
          data.pipe(req);
        } else {
          req.end();
        }
      }
      getAgent(serverUrl) {
        let parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
      }
      _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
        info.options.path = (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
          info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        if (this.handlers) {
          this.handlers.forEach(handler => {
            handler.prepareRequest(info.options);
          });
        }
        return info;
      }
      _mergeHeaders(headers) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        if (this.requestOptions && this.requestOptions.headers) {
          return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
      }
      _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
          clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
      }
      _getAgent(parsedUrl) {
        let agent;
        let proxyUrl = pm.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
          agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
          agent = this._agent;
        }
        if (!!agent) {
          return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) {
          maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
          if (!tunnel) {
            tunnel = require_tunnel2();
          }
          const agentOptions = {
            maxSockets,
            keepAlive: this._keepAlive,
            proxy: {
              ...((proxyUrl.username || proxyUrl.password) && {
                proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
              }),
              host: proxyUrl.hostname,
              port: proxyUrl.port
            }
          };
          let tunnelAgent;
          const overHttps = proxyUrl.protocol === 'https:';
          if (usingSsl) {
            tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
          } else {
            tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
          }
          agent = tunnelAgent(agentOptions);
          this._proxyAgent = agent;
        }
        if (this._keepAlive && !agent) {
          const options = { keepAlive: this._keepAlive, maxSockets };
          agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
          this._agent = agent;
        }
        if (!agent) {
          agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
          agent.options = Object.assign(agent.options || {}, {
            rejectUnauthorized: false
          });
        }
        return agent;
      }
      _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise(resolve => setTimeout(() => resolve(), ms));
      }
      static dateTimeDeserializer(key, value) {
        if (typeof value === 'string') {
          let a = new Date(value);
          if (!isNaN(a.valueOf())) {
            return a;
          }
        }
        return value;
      }
      async _processResponse(res, options) {
        return new Promise(async (resolve, reject) => {
          const statusCode = res.message.statusCode;
          const response = {
            statusCode,
            result: null,
            headers: {}
          };
          if (statusCode == HttpCodes.NotFound) {
            resolve(response);
          }
          let obj;
          let contents;
          try {
            contents = await res.readBody();
            if (contents && contents.length > 0) {
              if (options && options.deserializeDates) {
                obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
              } else {
                obj = JSON.parse(contents);
              }
              response.result = obj;
            }
            response.headers = res.message.headers;
          } catch (err) {}
          if (statusCode > 299) {
            let msg;
            if (obj && obj.message) {
              msg = obj.message;
            } else if (contents && contents.length > 0) {
              msg = contents;
            } else {
              msg = 'Failed request: (' + statusCode + ')';
            }
            let err = new HttpClientError(msg, statusCode);
            err.result = response.result;
            reject(err);
          } else {
            resolve(response);
          }
        });
      }
    };
    exports2.HttpClient = HttpClient;
  }
});

// node_modules/@actions/http-client/auth.js
var require_auth = __commonJS({
  'node_modules/@actions/http-client/auth.js'(exports2) {
    'use strict';
    Object.defineProperty(exports2, '__esModule', { value: true });
    var BasicCredentialHandler = class {
      constructor(username, password) {
        this.username = username;
        this.password = password;
      }
      prepareRequest(options) {
        options.headers['Authorization'] = 'Basic ' + Buffer.from(this.username + ':' + this.password).toString('base64');
      }
      canHandleAuthentication(response) {
        return false;
      }
      handleAuthentication(httpClient, requestInfo, objs) {
        return null;
      }
    };
    exports2.BasicCredentialHandler = BasicCredentialHandler;
    var BearerCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      prepareRequest(options) {
        options.headers['Authorization'] = 'Bearer ' + this.token;
      }
      canHandleAuthentication(response) {
        return false;
      }
      handleAuthentication(httpClient, requestInfo, objs) {
        return null;
      }
    };
    exports2.BearerCredentialHandler = BearerCredentialHandler;
    var PersonalAccessTokenCredentialHandler = class {
      constructor(token) {
        this.token = token;
      }
      prepareRequest(options) {
        options.headers['Authorization'] = 'Basic ' + Buffer.from('PAT:' + this.token).toString('base64');
      }
      canHandleAuthentication(response) {
        return false;
      }
      handleAuthentication(httpClient, requestInfo, objs) {
        return null;
      }
    };
    exports2.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
  }
});

// node_modules/@actions/core/lib/oidc-utils.js
var require_oidc_utils = __commonJS({
  'node_modules/@actions/core/lib/oidc-utils.js'(exports2) {
    'use strict';
    var __awaiter =
      (exports2 && exports2.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator['throw'](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
    Object.defineProperty(exports2, '__esModule', { value: true });
    exports2.OidcClient = void 0;
    var http_client_1 = require_http_client();
    var auth_1 = require_auth();
    var core_1 = require_core();
    var OidcClient = class {
      static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
          allowRetries: allowRetry,
          maxRetries: maxRetry
        };
        return new http_client_1.HttpClient(
          'actions/oidc-client',
          [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())],
          requestOptions
        );
      }
      static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
          throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
      }
      static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
          throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
      }
      static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
          const httpclient = OidcClient.createHttpClient();
          const res = yield httpclient.getJson(id_token_url).catch(error => {
            throw new Error(`Failed to get ID Token. 
 
        Error Code : ${error.statusCode}
 
        Error Message: ${error.result.message}`);
          });
          const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
          if (!id_token) {
            throw new Error('Response json body do not have ID Token field');
          }
          return id_token;
        });
      }
      static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            let id_token_url = OidcClient.getIDTokenUrl();
            if (audience) {
              const encodedAudience = encodeURIComponent(audience);
              id_token_url = `${id_token_url}&audience=${encodedAudience}`;
            }
            core_1.debug(`ID token url is ${id_token_url}`);
            const id_token = yield OidcClient.getCall(id_token_url);
            core_1.setSecret(id_token);
            return id_token;
          } catch (error) {
            throw new Error(`Error message: ${error.message}`);
          }
        });
      }
    };
    exports2.OidcClient = OidcClient;
  }
});

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS({
  'node_modules/@actions/core/lib/core.js'(exports2) {
    'use strict';
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              }
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, 'default', { enumerable: true, value: v });
          }
        : function (o, v) {
            o['default'] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod) if (k !== 'default' && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    var __awaiter =
      (exports2 && exports2.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator['throw'](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
    Object.defineProperty(exports2, '__esModule', { value: true });
    exports2.getIDToken =
      exports2.getState =
      exports2.saveState =
      exports2.group =
      exports2.endGroup =
      exports2.startGroup =
      exports2.info =
      exports2.notice =
      exports2.warning =
      exports2.error =
      exports2.debug =
      exports2.isDebug =
      exports2.setFailed =
      exports2.setCommandEcho =
      exports2.setOutput =
      exports2.getBooleanInput =
      exports2.getMultilineInput =
      exports2.getInput =
      exports2.addPath =
      exports2.setSecret =
      exports2.exportVariable =
      exports2.ExitCode =
        void 0;
    var command_1 = require_command();
    var file_command_1 = require_file_command();
    var utils_1 = require_utils();
    var os = __importStar(require('os'));
    var path = __importStar(require('path'));
    var oidc_utils_1 = require_oidc_utils();
    var ExitCode;
    (function (ExitCode2) {
      ExitCode2[(ExitCode2['Success'] = 0)] = 'Success';
      ExitCode2[(ExitCode2['Failure'] = 1)] = 'Failure';
    })((ExitCode = exports2.ExitCode || (exports2.ExitCode = {})));
    function exportVariable(name, val) {
      const convertedVal = utils_1.toCommandValue(val);
      process.env[name] = convertedVal;
      const filePath = process.env['GITHUB_ENV'] || '';
      if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
      } else {
        command_1.issueCommand('set-env', { name }, convertedVal);
      }
    }
    exports2.exportVariable = exportVariable;
    function setSecret(secret) {
      command_1.issueCommand('add-mask', {}, secret);
    }
    exports2.setSecret = setSecret;
    function addPath(inputPath) {
      const filePath = process.env['GITHUB_PATH'] || '';
      if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
      } else {
        command_1.issueCommand('add-path', {}, inputPath);
      }
      process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
    }
    exports2.addPath = addPath;
    function getInput(name, options) {
      const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
      if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
      }
      if (options && options.trimWhitespace === false) {
        return val;
      }
      return val.trim();
    }
    exports2.getInput = getInput;
    function getMultilineInput(name, options) {
      const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
      return inputs;
    }
    exports2.getMultilineInput = getMultilineInput;
    function getBooleanInput(name, options) {
      const trueValue = ['true', 'True', 'TRUE'];
      const falseValue = ['false', 'False', 'FALSE'];
      const val = getInput(name, options);
      if (trueValue.includes(val)) return true;
      if (falseValue.includes(val)) return false;
      throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
    }
    exports2.getBooleanInput = getBooleanInput;
    function setOutput(name, value) {
      process.stdout.write(os.EOL);
      command_1.issueCommand('set-output', { name }, value);
    }
    exports2.setOutput = setOutput;
    function setCommandEcho(enabled) {
      command_1.issue('echo', enabled ? 'on' : 'off');
    }
    exports2.setCommandEcho = setCommandEcho;
    function setFailed(message) {
      process.exitCode = ExitCode.Failure;
      error(message);
    }
    exports2.setFailed = setFailed;
    function isDebug() {
      return process.env['RUNNER_DEBUG'] === '1';
    }
    exports2.isDebug = isDebug;
    function debug(message) {
      command_1.issueCommand('debug', {}, message);
    }
    exports2.debug = debug;
    function error(message, properties = {}) {
      command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports2.error = error;
    function warning(message, properties = {}) {
      command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports2.warning = warning;
    function notice(message, properties = {}) {
      command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
    }
    exports2.notice = notice;
    function info(message) {
      process.stdout.write(message + os.EOL);
    }
    exports2.info = info;
    function startGroup(name) {
      command_1.issue('group', name);
    }
    exports2.startGroup = startGroup;
    function endGroup() {
      command_1.issue('endgroup');
    }
    exports2.endGroup = endGroup;
    function group(name, fn) {
      return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
          result = yield fn();
        } finally {
          endGroup();
        }
        return result;
      });
    }
    exports2.group = group;
    function saveState(name, value) {
      command_1.issueCommand('save-state', { name }, value);
    }
    exports2.saveState = saveState;
    function getState(name) {
      return process.env[`STATE_${name}`] || '';
    }
    exports2.getState = getState;
    function getIDToken(aud) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
      });
    }
    exports2.getIDToken = getIDToken;
  }
});

// node_modules/yaml/dist/PlainValue-ec8e588e.js
var require_PlainValue_ec8e588e = __commonJS({
  'node_modules/yaml/dist/PlainValue-ec8e588e.js'(exports2) {
    'use strict';
    var Char = {
      ANCHOR: '&',
      COMMENT: '#',
      TAG: '!',
      DIRECTIVES_END: '-',
      DOCUMENT_END: '.'
    };
    var Type = {
      ALIAS: 'ALIAS',
      BLANK_LINE: 'BLANK_LINE',
      BLOCK_FOLDED: 'BLOCK_FOLDED',
      BLOCK_LITERAL: 'BLOCK_LITERAL',
      COMMENT: 'COMMENT',
      DIRECTIVE: 'DIRECTIVE',
      DOCUMENT: 'DOCUMENT',
      FLOW_MAP: 'FLOW_MAP',
      FLOW_SEQ: 'FLOW_SEQ',
      MAP: 'MAP',
      MAP_KEY: 'MAP_KEY',
      MAP_VALUE: 'MAP_VALUE',
      PLAIN: 'PLAIN',
      QUOTE_DOUBLE: 'QUOTE_DOUBLE',
      QUOTE_SINGLE: 'QUOTE_SINGLE',
      SEQ: 'SEQ',
      SEQ_ITEM: 'SEQ_ITEM'
    };
    var defaultTagPrefix = 'tag:yaml.org,2002:';
    var defaultTags = {
      MAP: 'tag:yaml.org,2002:map',
      SEQ: 'tag:yaml.org,2002:seq',
      STR: 'tag:yaml.org,2002:str'
    };
    function findLineStarts(src) {
      const ls = [0];
      let offset = src.indexOf('\n');
      while (offset !== -1) {
        offset += 1;
        ls.push(offset);
        offset = src.indexOf('\n', offset);
      }
      return ls;
    }
    function getSrcInfo(cst) {
      let lineStarts, src;
      if (typeof cst === 'string') {
        lineStarts = findLineStarts(cst);
        src = cst;
      } else {
        if (Array.isArray(cst)) cst = cst[0];
        if (cst && cst.context) {
          if (!cst.lineStarts) cst.lineStarts = findLineStarts(cst.context.src);
          lineStarts = cst.lineStarts;
          src = cst.context.src;
        }
      }
      return {
        lineStarts,
        src
      };
    }
    function getLinePos(offset, cst) {
      if (typeof offset !== 'number' || offset < 0) return null;
      const { lineStarts, src } = getSrcInfo(cst);
      if (!lineStarts || !src || offset > src.length) return null;
      for (let i = 0; i < lineStarts.length; ++i) {
        const start = lineStarts[i];
        if (offset < start) {
          return {
            line: i,
            col: offset - lineStarts[i - 1] + 1
          };
        }
        if (offset === start)
          return {
            line: i + 1,
            col: 1
          };
      }
      const line = lineStarts.length;
      return {
        line,
        col: offset - lineStarts[line - 1] + 1
      };
    }
    function getLine(line, cst) {
      const { lineStarts, src } = getSrcInfo(cst);
      if (!lineStarts || !(line >= 1) || line > lineStarts.length) return null;
      const start = lineStarts[line - 1];
      let end = lineStarts[line];
      while (end && end > start && src[end - 1] === '\n') --end;
      return src.slice(start, end);
    }
    function getPrettyContext({ start, end }, cst, maxWidth = 80) {
      let src = getLine(start.line, cst);
      if (!src) return null;
      let { col } = start;
      if (src.length > maxWidth) {
        if (col <= maxWidth - 10) {
          src = src.substr(0, maxWidth - 1) + '\u2026';
        } else {
          const halfWidth = Math.round(maxWidth / 2);
          if (src.length > col + halfWidth) src = src.substr(0, col + halfWidth - 1) + '\u2026';
          col -= src.length - maxWidth;
          src = '\u2026' + src.substr(1 - maxWidth);
        }
      }
      let errLen = 1;
      let errEnd = '';
      if (end) {
        if (end.line === start.line && col + (end.col - start.col) <= maxWidth + 1) {
          errLen = end.col - start.col;
        } else {
          errLen = Math.min(src.length + 1, maxWidth) - col;
          errEnd = '\u2026';
        }
      }
      const offset = col > 1 ? ' '.repeat(col - 1) : '';
      const err = '^'.repeat(errLen);
      return `${src}
${offset}${err}${errEnd}`;
    }
    var Range = class {
      static copy(orig) {
        return new Range(orig.start, orig.end);
      }
      constructor(start, end) {
        this.start = start;
        this.end = end || start;
      }
      isEmpty() {
        return typeof this.start !== 'number' || !this.end || this.end <= this.start;
      }
      setOrigRange(cr, offset) {
        const { start, end } = this;
        if (cr.length === 0 || end <= cr[0]) {
          this.origStart = start;
          this.origEnd = end;
          return offset;
        }
        let i = offset;
        while (i < cr.length) {
          if (cr[i] > start) break;
          else ++i;
        }
        this.origStart = start + i;
        const nextOffset = i;
        while (i < cr.length) {
          if (cr[i] >= end) break;
          else ++i;
        }
        this.origEnd = end + i;
        return nextOffset;
      }
    };
    var Node = class {
      static addStringTerminator(src, offset, str) {
        if (str[str.length - 1] === '\n') return str;
        const next = Node.endOfWhiteSpace(src, offset);
        return next >= src.length || src[next] === '\n' ? str + '\n' : str;
      }
      static atDocumentBoundary(src, offset, sep) {
        const ch0 = src[offset];
        if (!ch0) return true;
        const prev = src[offset - 1];
        if (prev && prev !== '\n') return false;
        if (sep) {
          if (ch0 !== sep) return false;
        } else {
          if (ch0 !== Char.DIRECTIVES_END && ch0 !== Char.DOCUMENT_END) return false;
        }
        const ch1 = src[offset + 1];
        const ch2 = src[offset + 2];
        if (ch1 !== ch0 || ch2 !== ch0) return false;
        const ch3 = src[offset + 3];
        return !ch3 || ch3 === '\n' || ch3 === '	' || ch3 === ' ';
      }
      static endOfIdentifier(src, offset) {
        let ch = src[offset];
        const isVerbatim = ch === '<';
        const notOk = isVerbatim ? ['\n', '	', ' ', '>'] : ['\n', '	', ' ', '[', ']', '{', '}', ','];
        while (ch && notOk.indexOf(ch) === -1) ch = src[(offset += 1)];
        if (isVerbatim && ch === '>') offset += 1;
        return offset;
      }
      static endOfIndent(src, offset) {
        let ch = src[offset];
        while (ch === ' ') ch = src[(offset += 1)];
        return offset;
      }
      static endOfLine(src, offset) {
        let ch = src[offset];
        while (ch && ch !== '\n') ch = src[(offset += 1)];
        return offset;
      }
      static endOfWhiteSpace(src, offset) {
        let ch = src[offset];
        while (ch === '	' || ch === ' ') ch = src[(offset += 1)];
        return offset;
      }
      static startOfLine(src, offset) {
        let ch = src[offset - 1];
        if (ch === '\n') return offset;
        while (ch && ch !== '\n') ch = src[(offset -= 1)];
        return offset + 1;
      }
      static endOfBlockIndent(src, indent, lineStart) {
        const inEnd = Node.endOfIndent(src, lineStart);
        if (inEnd > lineStart + indent) {
          return inEnd;
        } else {
          const wsEnd = Node.endOfWhiteSpace(src, inEnd);
          const ch = src[wsEnd];
          if (!ch || ch === '\n') return wsEnd;
        }
        return null;
      }
      static atBlank(src, offset, endAsBlank) {
        const ch = src[offset];
        return ch === '\n' || ch === '	' || ch === ' ' || (endAsBlank && !ch);
      }
      static nextNodeIsIndented(ch, indentDiff, indicatorAsIndent) {
        if (!ch || indentDiff < 0) return false;
        if (indentDiff > 0) return true;
        return indicatorAsIndent && ch === '-';
      }
      static normalizeOffset(src, offset) {
        const ch = src[offset];
        return !ch ? offset : ch !== '\n' && src[offset - 1] === '\n' ? offset - 1 : Node.endOfWhiteSpace(src, offset);
      }
      static foldNewline(src, offset, indent) {
        let inCount = 0;
        let error = false;
        let fold = '';
        let ch = src[offset + 1];
        while (ch === ' ' || ch === '	' || ch === '\n') {
          switch (ch) {
            case '\n':
              inCount = 0;
              offset += 1;
              fold += '\n';
              break;
            case '	':
              if (inCount <= indent) error = true;
              offset = Node.endOfWhiteSpace(src, offset + 2) - 1;
              break;
            case ' ':
              inCount += 1;
              offset += 1;
              break;
          }
          ch = src[offset + 1];
        }
        if (!fold) fold = ' ';
        if (ch && inCount <= indent) error = true;
        return {
          fold,
          offset,
          error
        };
      }
      constructor(type, props, context) {
        Object.defineProperty(this, 'context', {
          value: context || null,
          writable: true
        });
        this.error = null;
        this.range = null;
        this.valueRange = null;
        this.props = props || [];
        this.type = type;
        this.value = null;
      }
      getPropValue(idx, key, skipKey) {
        if (!this.context) return null;
        const { src } = this.context;
        const prop = this.props[idx];
        return prop && src[prop.start] === key ? src.slice(prop.start + (skipKey ? 1 : 0), prop.end) : null;
      }
      get anchor() {
        for (let i = 0; i < this.props.length; ++i) {
          const anchor = this.getPropValue(i, Char.ANCHOR, true);
          if (anchor != null) return anchor;
        }
        return null;
      }
      get comment() {
        const comments = [];
        for (let i = 0; i < this.props.length; ++i) {
          const comment = this.getPropValue(i, Char.COMMENT, true);
          if (comment != null) comments.push(comment);
        }
        return comments.length > 0 ? comments.join('\n') : null;
      }
      commentHasRequiredWhitespace(start) {
        const { src } = this.context;
        if (this.header && start === this.header.end) return false;
        if (!this.valueRange) return false;
        const { end } = this.valueRange;
        return start !== end || Node.atBlank(src, end - 1);
      }
      get hasComment() {
        if (this.context) {
          const { src } = this.context;
          for (let i = 0; i < this.props.length; ++i) {
            if (src[this.props[i].start] === Char.COMMENT) return true;
          }
        }
        return false;
      }
      get hasProps() {
        if (this.context) {
          const { src } = this.context;
          for (let i = 0; i < this.props.length; ++i) {
            if (src[this.props[i].start] !== Char.COMMENT) return true;
          }
        }
        return false;
      }
      get includesTrailingLines() {
        return false;
      }
      get jsonLike() {
        const jsonLikeTypes = [Type.FLOW_MAP, Type.FLOW_SEQ, Type.QUOTE_DOUBLE, Type.QUOTE_SINGLE];
        return jsonLikeTypes.indexOf(this.type) !== -1;
      }
      get rangeAsLinePos() {
        if (!this.range || !this.context) return void 0;
        const start = getLinePos(this.range.start, this.context.root);
        if (!start) return void 0;
        const end = getLinePos(this.range.end, this.context.root);
        return {
          start,
          end
        };
      }
      get rawValue() {
        if (!this.valueRange || !this.context) return null;
        const { start, end } = this.valueRange;
        return this.context.src.slice(start, end);
      }
      get tag() {
        for (let i = 0; i < this.props.length; ++i) {
          const tag = this.getPropValue(i, Char.TAG, false);
          if (tag != null) {
            if (tag[1] === '<') {
              return {
                verbatim: tag.slice(2, -1)
              };
            } else {
              const [_, handle, suffix] = tag.match(/^(.*!)([^!]*)$/);
              return {
                handle,
                suffix
              };
            }
          }
        }
        return null;
      }
      get valueRangeContainsNewline() {
        if (!this.valueRange || !this.context) return false;
        const { start, end } = this.valueRange;
        const { src } = this.context;
        for (let i = start; i < end; ++i) {
          if (src[i] === '\n') return true;
        }
        return false;
      }
      parseComment(start) {
        const { src } = this.context;
        if (src[start] === Char.COMMENT) {
          const end = Node.endOfLine(src, start + 1);
          const commentRange = new Range(start, end);
          this.props.push(commentRange);
          return end;
        }
        return start;
      }
      setOrigRanges(cr, offset) {
        if (this.range) offset = this.range.setOrigRange(cr, offset);
        if (this.valueRange) this.valueRange.setOrigRange(cr, offset);
        this.props.forEach(prop => prop.setOrigRange(cr, offset));
        return offset;
      }
      toString() {
        const {
          context: { src },
          range,
          value
        } = this;
        if (value != null) return value;
        const str = src.slice(range.start, range.end);
        return Node.addStringTerminator(src, range.end, str);
      }
    };
    var YAMLError = class extends Error {
      constructor(name, source, message) {
        if (!message || !(source instanceof Node)) throw new Error(`Invalid arguments for new ${name}`);
        super();
        this.name = name;
        this.message = message;
        this.source = source;
      }
      makePretty() {
        if (!this.source) return;
        this.nodeType = this.source.type;
        const cst = this.source.context && this.source.context.root;
        if (typeof this.offset === 'number') {
          this.range = new Range(this.offset, this.offset + 1);
          const start = cst && getLinePos(this.offset, cst);
          if (start) {
            const end = {
              line: start.line,
              col: start.col + 1
            };
            this.linePos = {
              start,
              end
            };
          }
          delete this.offset;
        } else {
          this.range = this.source.range;
          this.linePos = this.source.rangeAsLinePos;
        }
        if (this.linePos) {
          const { line, col } = this.linePos.start;
          this.message += ` at line ${line}, column ${col}`;
          const ctx = cst && getPrettyContext(this.linePos, cst);
          if (ctx)
            this.message += `:

${ctx}
`;
        }
        delete this.source;
      }
    };
    var YAMLReferenceError = class extends YAMLError {
      constructor(source, message) {
        super('YAMLReferenceError', source, message);
      }
    };
    var YAMLSemanticError = class extends YAMLError {
      constructor(source, message) {
        super('YAMLSemanticError', source, message);
      }
    };
    var YAMLSyntaxError = class extends YAMLError {
      constructor(source, message) {
        super('YAMLSyntaxError', source, message);
      }
    };
    var YAMLWarning = class extends YAMLError {
      constructor(source, message) {
        super('YAMLWarning', source, message);
      }
    };
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var PlainValue = class extends Node {
      static endOfLine(src, start, inFlow) {
        let ch = src[start];
        let offset = start;
        while (ch && ch !== '\n') {
          if (inFlow && (ch === '[' || ch === ']' || ch === '{' || ch === '}' || ch === ',')) break;
          const next = src[offset + 1];
          if (ch === ':' && (!next || next === '\n' || next === '	' || next === ' ' || (inFlow && next === ','))) break;
          if ((ch === ' ' || ch === '	') && next === '#') break;
          offset += 1;
          ch = next;
        }
        return offset;
      }
      get strValue() {
        if (!this.valueRange || !this.context) return null;
        let { start, end } = this.valueRange;
        const { src } = this.context;
        let ch = src[end - 1];
        while (start < end && (ch === '\n' || ch === '	' || ch === ' ')) ch = src[--end - 1];
        let str = '';
        for (let i = start; i < end; ++i) {
          const ch2 = src[i];
          if (ch2 === '\n') {
            const { fold, offset } = Node.foldNewline(src, i, -1);
            str += fold;
            i = offset;
          } else if (ch2 === ' ' || ch2 === '	') {
            const wsStart = i;
            let next = src[i + 1];
            while (i < end && (next === ' ' || next === '	')) {
              i += 1;
              next = src[i + 1];
            }
            if (next !== '\n') str += i > wsStart ? src.slice(wsStart, i + 1) : ch2;
          } else {
            str += ch2;
          }
        }
        const ch0 = src[start];
        switch (ch0) {
          case '	': {
            const msg = 'Plain value cannot start with a tab character';
            const errors = [new YAMLSemanticError(this, msg)];
            return {
              errors,
              str
            };
          }
          case '@':
          case '`': {
            const msg = `Plain value cannot start with reserved character ${ch0}`;
            const errors = [new YAMLSemanticError(this, msg)];
            return {
              errors,
              str
            };
          }
          default:
            return str;
        }
      }
      parseBlockValue(start) {
        const { indent, inFlow, src } = this.context;
        let offset = start;
        let valueEnd = start;
        for (let ch = src[offset]; ch === '\n'; ch = src[offset]) {
          if (Node.atDocumentBoundary(src, offset + 1)) break;
          const end = Node.endOfBlockIndent(src, indent, offset + 1);
          if (end === null || src[end] === '#') break;
          if (src[end] === '\n') {
            offset = end;
          } else {
            valueEnd = PlainValue.endOfLine(src, end, inFlow);
            offset = valueEnd;
          }
        }
        if (this.valueRange.isEmpty()) this.valueRange.start = start;
        this.valueRange.end = valueEnd;
        return valueEnd;
      }
      parse(context, start) {
        this.context = context;
        const { inFlow, src } = context;
        let offset = start;
        const ch = src[offset];
        if (ch && ch !== '#' && ch !== '\n') {
          offset = PlainValue.endOfLine(src, start, inFlow);
        }
        this.valueRange = new Range(start, offset);
        offset = Node.endOfWhiteSpace(src, offset);
        offset = this.parseComment(offset);
        if (!this.hasComment || this.valueRange.isEmpty()) {
          offset = this.parseBlockValue(offset);
        }
        return offset;
      }
    };
    exports2.Char = Char;
    exports2.Node = Node;
    exports2.PlainValue = PlainValue;
    exports2.Range = Range;
    exports2.Type = Type;
    exports2.YAMLError = YAMLError;
    exports2.YAMLReferenceError = YAMLReferenceError;
    exports2.YAMLSemanticError = YAMLSemanticError;
    exports2.YAMLSyntaxError = YAMLSyntaxError;
    exports2.YAMLWarning = YAMLWarning;
    exports2._defineProperty = _defineProperty;
    exports2.defaultTagPrefix = defaultTagPrefix;
    exports2.defaultTags = defaultTags;
  }
});

// node_modules/yaml/dist/parse-cst.js
var require_parse_cst = __commonJS({
  'node_modules/yaml/dist/parse-cst.js'(exports2) {
    'use strict';
    var PlainValue = require_PlainValue_ec8e588e();
    var BlankLine = class extends PlainValue.Node {
      constructor() {
        super(PlainValue.Type.BLANK_LINE);
      }
      get includesTrailingLines() {
        return true;
      }
      parse(context, start) {
        this.context = context;
        this.range = new PlainValue.Range(start, start + 1);
        return start + 1;
      }
    };
    var CollectionItem = class extends PlainValue.Node {
      constructor(type, props) {
        super(type, props);
        this.node = null;
      }
      get includesTrailingLines() {
        return !!this.node && this.node.includesTrailingLines;
      }
      parse(context, start) {
        this.context = context;
        const { parseNode, src } = context;
        let { atLineStart, lineStart } = context;
        if (!atLineStart && this.type === PlainValue.Type.SEQ_ITEM)
          this.error = new PlainValue.YAMLSemanticError(this, 'Sequence items must not have preceding content on the same line');
        const indent = atLineStart ? start - lineStart : context.indent;
        let offset = PlainValue.Node.endOfWhiteSpace(src, start + 1);
        let ch = src[offset];
        const inlineComment = ch === '#';
        const comments = [];
        let blankLine = null;
        while (ch === '\n' || ch === '#') {
          if (ch === '#') {
            const end2 = PlainValue.Node.endOfLine(src, offset + 1);
            comments.push(new PlainValue.Range(offset, end2));
            offset = end2;
          } else {
            atLineStart = true;
            lineStart = offset + 1;
            const wsEnd = PlainValue.Node.endOfWhiteSpace(src, lineStart);
            if (src[wsEnd] === '\n' && comments.length === 0) {
              blankLine = new BlankLine();
              lineStart = blankLine.parse(
                {
                  src
                },
                lineStart
              );
            }
            offset = PlainValue.Node.endOfIndent(src, lineStart);
          }
          ch = src[offset];
        }
        if (PlainValue.Node.nextNodeIsIndented(ch, offset - (lineStart + indent), this.type !== PlainValue.Type.SEQ_ITEM)) {
          this.node = parseNode(
            {
              atLineStart,
              inCollection: false,
              indent,
              lineStart,
              parent: this
            },
            offset
          );
        } else if (ch && lineStart > start + 1) {
          offset = lineStart - 1;
        }
        if (this.node) {
          if (blankLine) {
            const items = context.parent.items || context.parent.contents;
            if (items) items.push(blankLine);
          }
          if (comments.length) Array.prototype.push.apply(this.props, comments);
          offset = this.node.range.end;
        } else {
          if (inlineComment) {
            const c = comments[0];
            this.props.push(c);
            offset = c.end;
          } else {
            offset = PlainValue.Node.endOfLine(src, start + 1);
          }
        }
        const end = this.node ? this.node.valueRange.end : offset;
        this.valueRange = new PlainValue.Range(start, end);
        return offset;
      }
      setOrigRanges(cr, offset) {
        offset = super.setOrigRanges(cr, offset);
        return this.node ? this.node.setOrigRanges(cr, offset) : offset;
      }
      toString() {
        const {
          context: { src },
          node,
          range,
          value
        } = this;
        if (value != null) return value;
        const str = node ? src.slice(range.start, node.range.start) + String(node) : src.slice(range.start, range.end);
        return PlainValue.Node.addStringTerminator(src, range.end, str);
      }
    };
    var Comment = class extends PlainValue.Node {
      constructor() {
        super(PlainValue.Type.COMMENT);
      }
      parse(context, start) {
        this.context = context;
        const offset = this.parseComment(start);
        this.range = new PlainValue.Range(start, offset);
        return offset;
      }
    };
    function grabCollectionEndComments(node) {
      let cnode = node;
      while (cnode instanceof CollectionItem) cnode = cnode.node;
      if (!(cnode instanceof Collection)) return null;
      const len = cnode.items.length;
      let ci = -1;
      for (let i = len - 1; i >= 0; --i) {
        const n = cnode.items[i];
        if (n.type === PlainValue.Type.COMMENT) {
          const { indent, lineStart } = n.context;
          if (indent > 0 && n.range.start >= lineStart + indent) break;
          ci = i;
        } else if (n.type === PlainValue.Type.BLANK_LINE) ci = i;
        else break;
      }
      if (ci === -1) return null;
      const ca = cnode.items.splice(ci, len - ci);
      const prevEnd = ca[0].range.start;
      while (true) {
        cnode.range.end = prevEnd;
        if (cnode.valueRange && cnode.valueRange.end > prevEnd) cnode.valueRange.end = prevEnd;
        if (cnode === node) break;
        cnode = cnode.context.parent;
      }
      return ca;
    }
    var Collection = class extends PlainValue.Node {
      static nextContentHasIndent(src, offset, indent) {
        const lineStart = PlainValue.Node.endOfLine(src, offset) + 1;
        offset = PlainValue.Node.endOfWhiteSpace(src, lineStart);
        const ch = src[offset];
        if (!ch) return false;
        if (offset >= lineStart + indent) return true;
        if (ch !== '#' && ch !== '\n') return false;
        return Collection.nextContentHasIndent(src, offset, indent);
      }
      constructor(firstItem) {
        super(firstItem.type === PlainValue.Type.SEQ_ITEM ? PlainValue.Type.SEQ : PlainValue.Type.MAP);
        for (let i = firstItem.props.length - 1; i >= 0; --i) {
          if (firstItem.props[i].start < firstItem.context.lineStart) {
            this.props = firstItem.props.slice(0, i + 1);
            firstItem.props = firstItem.props.slice(i + 1);
            const itemRange = firstItem.props[0] || firstItem.valueRange;
            firstItem.range.start = itemRange.start;
            break;
          }
        }
        this.items = [firstItem];
        const ec = grabCollectionEndComments(firstItem);
        if (ec) Array.prototype.push.apply(this.items, ec);
      }
      get includesTrailingLines() {
        return this.items.length > 0;
      }
      parse(context, start) {
        this.context = context;
        const { parseNode, src } = context;
        let lineStart = PlainValue.Node.startOfLine(src, start);
        const firstItem = this.items[0];
        firstItem.context.parent = this;
        this.valueRange = PlainValue.Range.copy(firstItem.valueRange);
        const indent = firstItem.range.start - firstItem.context.lineStart;
        let offset = start;
        offset = PlainValue.Node.normalizeOffset(src, offset);
        let ch = src[offset];
        let atLineStart = PlainValue.Node.endOfWhiteSpace(src, lineStart) === offset;
        let prevIncludesTrailingLines = false;
        while (ch) {
          while (ch === '\n' || ch === '#') {
            if (atLineStart && ch === '\n' && !prevIncludesTrailingLines) {
              const blankLine = new BlankLine();
              offset = blankLine.parse(
                {
                  src
                },
                offset
              );
              this.valueRange.end = offset;
              if (offset >= src.length) {
                ch = null;
                break;
              }
              this.items.push(blankLine);
              offset -= 1;
            } else if (ch === '#') {
              if (offset < lineStart + indent && !Collection.nextContentHasIndent(src, offset, indent)) {
                return offset;
              }
              const comment = new Comment();
              offset = comment.parse(
                {
                  indent,
                  lineStart,
                  src
                },
                offset
              );
              this.items.push(comment);
              this.valueRange.end = offset;
              if (offset >= src.length) {
                ch = null;
                break;
              }
            }
            lineStart = offset + 1;
            offset = PlainValue.Node.endOfIndent(src, lineStart);
            if (PlainValue.Node.atBlank(src, offset)) {
              const wsEnd = PlainValue.Node.endOfWhiteSpace(src, offset);
              const next = src[wsEnd];
              if (!next || next === '\n' || next === '#') {
                offset = wsEnd;
              }
            }
            ch = src[offset];
            atLineStart = true;
          }
          if (!ch) {
            break;
          }
          if (offset !== lineStart + indent && (atLineStart || ch !== ':')) {
            if (offset < lineStart + indent) {
              if (lineStart > start) offset = lineStart;
              break;
            } else if (!this.error) {
              const msg = 'All collection items must start at the same column';
              this.error = new PlainValue.YAMLSyntaxError(this, msg);
            }
          }
          if (firstItem.type === PlainValue.Type.SEQ_ITEM) {
            if (ch !== '-') {
              if (lineStart > start) offset = lineStart;
              break;
            }
          } else if (ch === '-' && !this.error) {
            const next = src[offset + 1];
            if (!next || next === '\n' || next === '	' || next === ' ') {
              const msg = 'A collection cannot be both a mapping and a sequence';
              this.error = new PlainValue.YAMLSyntaxError(this, msg);
            }
          }
          const node = parseNode(
            {
              atLineStart,
              inCollection: true,
              indent,
              lineStart,
              parent: this
            },
            offset
          );
          if (!node) return offset;
          this.items.push(node);
          this.valueRange.end = node.valueRange.end;
          offset = PlainValue.Node.normalizeOffset(src, node.range.end);
          ch = src[offset];
          atLineStart = false;
          prevIncludesTrailingLines = node.includesTrailingLines;
          if (ch) {
            let ls = offset - 1;
            let prev = src[ls];
            while (prev === ' ' || prev === '	') prev = src[--ls];
            if (prev === '\n') {
              lineStart = ls + 1;
              atLineStart = true;
            }
          }
          const ec = grabCollectionEndComments(node);
          if (ec) Array.prototype.push.apply(this.items, ec);
        }
        return offset;
      }
      setOrigRanges(cr, offset) {
        offset = super.setOrigRanges(cr, offset);
        this.items.forEach(node => {
          offset = node.setOrigRanges(cr, offset);
        });
        return offset;
      }
      toString() {
        const {
          context: { src },
          items,
          range,
          value
        } = this;
        if (value != null) return value;
        let str = src.slice(range.start, items[0].range.start) + String(items[0]);
        for (let i = 1; i < items.length; ++i) {
          const item = items[i];
          const { atLineStart, indent } = item.context;
          if (atLineStart) for (let i2 = 0; i2 < indent; ++i2) str += ' ';
          str += String(item);
        }
        return PlainValue.Node.addStringTerminator(src, range.end, str);
      }
    };
    var Directive = class extends PlainValue.Node {
      constructor() {
        super(PlainValue.Type.DIRECTIVE);
        this.name = null;
      }
      get parameters() {
        const raw = this.rawValue;
        return raw ? raw.trim().split(/[ \t]+/) : [];
      }
      parseName(start) {
        const { src } = this.context;
        let offset = start;
        let ch = src[offset];
        while (ch && ch !== '\n' && ch !== '	' && ch !== ' ') ch = src[(offset += 1)];
        this.name = src.slice(start, offset);
        return offset;
      }
      parseParameters(start) {
        const { src } = this.context;
        let offset = start;
        let ch = src[offset];
        while (ch && ch !== '\n' && ch !== '#') ch = src[(offset += 1)];
        this.valueRange = new PlainValue.Range(start, offset);
        return offset;
      }
      parse(context, start) {
        this.context = context;
        let offset = this.parseName(start + 1);
        offset = this.parseParameters(offset);
        offset = this.parseComment(offset);
        this.range = new PlainValue.Range(start, offset);
        return offset;
      }
    };
    var Document = class extends PlainValue.Node {
      static startCommentOrEndBlankLine(src, start) {
        const offset = PlainValue.Node.endOfWhiteSpace(src, start);
        const ch = src[offset];
        return ch === '#' || ch === '\n' ? offset : start;
      }
      constructor() {
        super(PlainValue.Type.DOCUMENT);
        this.directives = null;
        this.contents = null;
        this.directivesEndMarker = null;
        this.documentEndMarker = null;
      }
      parseDirectives(start) {
        const { src } = this.context;
        this.directives = [];
        let atLineStart = true;
        let hasDirectives = false;
        let offset = start;
        while (!PlainValue.Node.atDocumentBoundary(src, offset, PlainValue.Char.DIRECTIVES_END)) {
          offset = Document.startCommentOrEndBlankLine(src, offset);
          switch (src[offset]) {
            case '\n':
              if (atLineStart) {
                const blankLine = new BlankLine();
                offset = blankLine.parse(
                  {
                    src
                  },
                  offset
                );
                if (offset < src.length) {
                  this.directives.push(blankLine);
                }
              } else {
                offset += 1;
                atLineStart = true;
              }
              break;
            case '#':
              {
                const comment = new Comment();
                offset = comment.parse(
                  {
                    src
                  },
                  offset
                );
                this.directives.push(comment);
                atLineStart = false;
              }
              break;
            case '%':
              {
                const directive = new Directive();
                offset = directive.parse(
                  {
                    parent: this,
                    src
                  },
                  offset
                );
                this.directives.push(directive);
                hasDirectives = true;
                atLineStart = false;
              }
              break;
            default:
              if (hasDirectives) {
                this.error = new PlainValue.YAMLSemanticError(this, 'Missing directives-end indicator line');
              } else if (this.directives.length > 0) {
                this.contents = this.directives;
                this.directives = [];
              }
              return offset;
          }
        }
        if (src[offset]) {
          this.directivesEndMarker = new PlainValue.Range(offset, offset + 3);
          return offset + 3;
        }
        if (hasDirectives) {
          this.error = new PlainValue.YAMLSemanticError(this, 'Missing directives-end indicator line');
        } else if (this.directives.length > 0) {
          this.contents = this.directives;
          this.directives = [];
        }
        return offset;
      }
      parseContents(start) {
        const { parseNode, src } = this.context;
        if (!this.contents) this.contents = [];
        let lineStart = start;
        while (src[lineStart - 1] === '-') lineStart -= 1;
        let offset = PlainValue.Node.endOfWhiteSpace(src, start);
        let atLineStart = lineStart === start;
        this.valueRange = new PlainValue.Range(offset);
        while (!PlainValue.Node.atDocumentBoundary(src, offset, PlainValue.Char.DOCUMENT_END)) {
          switch (src[offset]) {
            case '\n':
              if (atLineStart) {
                const blankLine = new BlankLine();
                offset = blankLine.parse(
                  {
                    src
                  },
                  offset
                );
                if (offset < src.length) {
                  this.contents.push(blankLine);
                }
              } else {
                offset += 1;
                atLineStart = true;
              }
              lineStart = offset;
              break;
            case '#':
              {
                const comment = new Comment();
                offset = comment.parse(
                  {
                    src
                  },
                  offset
                );
                this.contents.push(comment);
                atLineStart = false;
              }
              break;
            default: {
              const iEnd = PlainValue.Node.endOfIndent(src, offset);
              const context = {
                atLineStart,
                indent: -1,
                inFlow: false,
                inCollection: false,
                lineStart,
                parent: this
              };
              const node = parseNode(context, iEnd);
              if (!node) return (this.valueRange.end = iEnd);
              this.contents.push(node);
              offset = node.range.end;
              atLineStart = false;
              const ec = grabCollectionEndComments(node);
              if (ec) Array.prototype.push.apply(this.contents, ec);
            }
          }
          offset = Document.startCommentOrEndBlankLine(src, offset);
        }
        this.valueRange.end = offset;
        if (src[offset]) {
          this.documentEndMarker = new PlainValue.Range(offset, offset + 3);
          offset += 3;
          if (src[offset]) {
            offset = PlainValue.Node.endOfWhiteSpace(src, offset);
            if (src[offset] === '#') {
              const comment = new Comment();
              offset = comment.parse(
                {
                  src
                },
                offset
              );
              this.contents.push(comment);
            }
            switch (src[offset]) {
              case '\n':
                offset += 1;
                break;
              case void 0:
                break;
              default:
                this.error = new PlainValue.YAMLSyntaxError(this, 'Document end marker line cannot have a non-comment suffix');
            }
          }
        }
        return offset;
      }
      parse(context, start) {
        context.root = this;
        this.context = context;
        const { src } = context;
        let offset = src.charCodeAt(start) === 65279 ? start + 1 : start;
        offset = this.parseDirectives(offset);
        offset = this.parseContents(offset);
        return offset;
      }
      setOrigRanges(cr, offset) {
        offset = super.setOrigRanges(cr, offset);
        this.directives.forEach(node => {
          offset = node.setOrigRanges(cr, offset);
        });
        if (this.directivesEndMarker) offset = this.directivesEndMarker.setOrigRange(cr, offset);
        this.contents.forEach(node => {
          offset = node.setOrigRanges(cr, offset);
        });
        if (this.documentEndMarker) offset = this.documentEndMarker.setOrigRange(cr, offset);
        return offset;
      }
      toString() {
        const { contents, directives, value } = this;
        if (value != null) return value;
        let str = directives.join('');
        if (contents.length > 0) {
          if (directives.length > 0 || contents[0].type === PlainValue.Type.COMMENT) str += '---\n';
          str += contents.join('');
        }
        if (str[str.length - 1] !== '\n') str += '\n';
        return str;
      }
    };
    var Alias = class extends PlainValue.Node {
      parse(context, start) {
        this.context = context;
        const { src } = context;
        let offset = PlainValue.Node.endOfIdentifier(src, start + 1);
        this.valueRange = new PlainValue.Range(start + 1, offset);
        offset = PlainValue.Node.endOfWhiteSpace(src, offset);
        offset = this.parseComment(offset);
        return offset;
      }
    };
    var Chomp = {
      CLIP: 'CLIP',
      KEEP: 'KEEP',
      STRIP: 'STRIP'
    };
    var BlockValue = class extends PlainValue.Node {
      constructor(type, props) {
        super(type, props);
        this.blockIndent = null;
        this.chomping = Chomp.CLIP;
        this.header = null;
      }
      get includesTrailingLines() {
        return this.chomping === Chomp.KEEP;
      }
      get strValue() {
        if (!this.valueRange || !this.context) return null;
        let { start, end } = this.valueRange;
        const { indent, src } = this.context;
        if (this.valueRange.isEmpty()) return '';
        let lastNewLine = null;
        let ch = src[end - 1];
        while (ch === '\n' || ch === '	' || ch === ' ') {
          end -= 1;
          if (end <= start) {
            if (this.chomping === Chomp.KEEP) break;
            else return '';
          }
          if (ch === '\n') lastNewLine = end;
          ch = src[end - 1];
        }
        let keepStart = end + 1;
        if (lastNewLine) {
          if (this.chomping === Chomp.KEEP) {
            keepStart = lastNewLine;
            end = this.valueRange.end;
          } else {
            end = lastNewLine;
          }
        }
        const bi = indent + this.blockIndent;
        const folded = this.type === PlainValue.Type.BLOCK_FOLDED;
        let atStart = true;
        let str = '';
        let sep = '';
        let prevMoreIndented = false;
        for (let i = start; i < end; ++i) {
          for (let j = 0; j < bi; ++j) {
            if (src[i] !== ' ') break;
            i += 1;
          }
          const ch2 = src[i];
          if (ch2 === '\n') {
            if (sep === '\n') str += '\n';
            else sep = '\n';
          } else {
            const lineEnd = PlainValue.Node.endOfLine(src, i);
            const line = src.slice(i, lineEnd);
            i = lineEnd;
            if (folded && (ch2 === ' ' || ch2 === '	') && i < keepStart) {
              if (sep === ' ') sep = '\n';
              else if (!prevMoreIndented && !atStart && sep === '\n') sep = '\n\n';
              str += sep + line;
              sep = (lineEnd < end && src[lineEnd]) || '';
              prevMoreIndented = true;
            } else {
              str += sep + line;
              sep = folded && i < keepStart ? ' ' : '\n';
              prevMoreIndented = false;
            }
            if (atStart && line !== '') atStart = false;
          }
        }
        return this.chomping === Chomp.STRIP ? str : str + '\n';
      }
      parseBlockHeader(start) {
        const { src } = this.context;
        let offset = start + 1;
        let bi = '';
        while (true) {
          const ch = src[offset];
          switch (ch) {
            case '-':
              this.chomping = Chomp.STRIP;
              break;
            case '+':
              this.chomping = Chomp.KEEP;
              break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
              bi += ch;
              break;
            default:
              this.blockIndent = Number(bi) || null;
              this.header = new PlainValue.Range(start, offset);
              return offset;
          }
          offset += 1;
        }
      }
      parseBlockValue(start) {
        const { indent, src } = this.context;
        const explicit = !!this.blockIndent;
        let offset = start;
        let valueEnd = start;
        let minBlockIndent = 1;
        for (let ch = src[offset]; ch === '\n'; ch = src[offset]) {
          offset += 1;
          if (PlainValue.Node.atDocumentBoundary(src, offset)) break;
          const end = PlainValue.Node.endOfBlockIndent(src, indent, offset);
          if (end === null) break;
          const ch2 = src[end];
          const lineIndent = end - (offset + indent);
          if (!this.blockIndent) {
            if (src[end] !== '\n') {
              if (lineIndent < minBlockIndent) {
                const msg = 'Block scalars with more-indented leading empty lines must use an explicit indentation indicator';
                this.error = new PlainValue.YAMLSemanticError(this, msg);
              }
              this.blockIndent = lineIndent;
            } else if (lineIndent > minBlockIndent) {
              minBlockIndent = lineIndent;
            }
          } else if (ch2 && ch2 !== '\n' && lineIndent < this.blockIndent) {
            if (src[end] === '#') break;
            if (!this.error) {
              const src2 = explicit ? 'explicit indentation indicator' : 'first line';
              const msg = `Block scalars must not be less indented than their ${src2}`;
              this.error = new PlainValue.YAMLSemanticError(this, msg);
            }
          }
          if (src[end] === '\n') {
            offset = end;
          } else {
            offset = valueEnd = PlainValue.Node.endOfLine(src, end);
          }
        }
        if (this.chomping !== Chomp.KEEP) {
          offset = src[valueEnd] ? valueEnd + 1 : valueEnd;
        }
        this.valueRange = new PlainValue.Range(start + 1, offset);
        return offset;
      }
      parse(context, start) {
        this.context = context;
        const { src } = context;
        let offset = this.parseBlockHeader(start);
        offset = PlainValue.Node.endOfWhiteSpace(src, offset);
        offset = this.parseComment(offset);
        offset = this.parseBlockValue(offset);
        return offset;
      }
      setOrigRanges(cr, offset) {
        offset = super.setOrigRanges(cr, offset);
        return this.header ? this.header.setOrigRange(cr, offset) : offset;
      }
    };
    var FlowCollection = class extends PlainValue.Node {
      constructor(type, props) {
        super(type, props);
        this.items = null;
      }
      prevNodeIsJsonLike(idx = this.items.length) {
        const node = this.items[idx - 1];
        return !!node && (node.jsonLike || (node.type === PlainValue.Type.COMMENT && this.prevNodeIsJsonLike(idx - 1)));
      }
      parse(context, start) {
        this.context = context;
        const { parseNode, src } = context;
        let { indent, lineStart } = context;
        let char = src[start];
        this.items = [
          {
            char,
            offset: start
          }
        ];
        let offset = PlainValue.Node.endOfWhiteSpace(src, start + 1);
        char = src[offset];
        while (char && char !== ']' && char !== '}') {
          switch (char) {
            case '\n':
              {
                lineStart = offset + 1;
                const wsEnd = PlainValue.Node.endOfWhiteSpace(src, lineStart);
                if (src[wsEnd] === '\n') {
                  const blankLine = new BlankLine();
                  lineStart = blankLine.parse(
                    {
                      src
                    },
                    lineStart
                  );
                  this.items.push(blankLine);
                }
                offset = PlainValue.Node.endOfIndent(src, lineStart);
                if (offset <= lineStart + indent) {
                  char = src[offset];
                  if (offset < lineStart + indent || (char !== ']' && char !== '}')) {
                    const msg = 'Insufficient indentation in flow collection';
                    this.error = new PlainValue.YAMLSemanticError(this, msg);
                  }
                }
              }
              break;
            case ',':
              {
                this.items.push({
                  char,
                  offset
                });
                offset += 1;
              }
              break;
            case '#':
              {
                const comment = new Comment();
                offset = comment.parse(
                  {
                    src
                  },
                  offset
                );
                this.items.push(comment);
              }
              break;
            case '?':
            case ':': {
              const next = src[offset + 1];
              if (next === '\n' || next === '	' || next === ' ' || next === ',' || (char === ':' && this.prevNodeIsJsonLike())) {
                this.items.push({
                  char,
                  offset
                });
                offset += 1;
                break;
              }
            }
            default: {
              const node = parseNode(
                {
                  atLineStart: false,
                  inCollection: false,
                  inFlow: true,
                  indent: -1,
                  lineStart,
                  parent: this
                },
                offset
              );
              if (!node) {
                this.valueRange = new PlainValue.Range(start, offset);
                return offset;
              }
              this.items.push(node);
              offset = PlainValue.Node.normalizeOffset(src, node.range.end);
            }
          }
          offset = PlainValue.Node.endOfWhiteSpace(src, offset);
          char = src[offset];
        }
        this.valueRange = new PlainValue.Range(start, offset + 1);
        if (char) {
          this.items.push({
            char,
            offset
          });
          offset = PlainValue.Node.endOfWhiteSpace(src, offset + 1);
          offset = this.parseComment(offset);
        }
        return offset;
      }
      setOrigRanges(cr, offset) {
        offset = super.setOrigRanges(cr, offset);
        this.items.forEach(node => {
          if (node instanceof PlainValue.Node) {
            offset = node.setOrigRanges(cr, offset);
          } else if (cr.length === 0) {
            node.origOffset = node.offset;
          } else {
            let i = offset;
            while (i < cr.length) {
              if (cr[i] > node.offset) break;
              else ++i;
            }
            node.origOffset = node.offset + i;
            offset = i;
          }
        });
        return offset;
      }
      toString() {
        const {
          context: { src },
          items,
          range,
          value
        } = this;
        if (value != null) return value;
        const nodes = items.filter(item => item instanceof PlainValue.Node);
        let str = '';
        let prevEnd = range.start;
        nodes.forEach(node => {
          const prefix = src.slice(prevEnd, node.range.start);
          prevEnd = node.range.end;
          str += prefix + String(node);
          if (str[str.length - 1] === '\n' && src[prevEnd - 1] !== '\n' && src[prevEnd] === '\n') {
            prevEnd += 1;
          }
        });
        str += src.slice(prevEnd, range.end);
        return PlainValue.Node.addStringTerminator(src, range.end, str);
      }
    };
    var QuoteDouble = class extends PlainValue.Node {
      static endOfQuote(src, offset) {
        let ch = src[offset];
        while (ch && ch !== '"') {
          offset += ch === '\\' ? 2 : 1;
          ch = src[offset];
        }
        return offset + 1;
      }
      get strValue() {
        if (!this.valueRange || !this.context) return null;
        const errors = [];
        const { start, end } = this.valueRange;
        const { indent, src } = this.context;
        if (src[end - 1] !== '"') errors.push(new PlainValue.YAMLSyntaxError(this, 'Missing closing "quote'));
        let str = '';
        for (let i = start + 1; i < end - 1; ++i) {
          const ch = src[i];
          if (ch === '\n') {
            if (PlainValue.Node.atDocumentBoundary(src, i + 1))
              errors.push(new PlainValue.YAMLSemanticError(this, 'Document boundary indicators are not allowed within string values'));
            const { fold, offset, error } = PlainValue.Node.foldNewline(src, i, indent);
            str += fold;
            i = offset;
            if (error) errors.push(new PlainValue.YAMLSemanticError(this, 'Multi-line double-quoted string needs to be sufficiently indented'));
          } else if (ch === '\\') {
            i += 1;
            switch (src[i]) {
              case '0':
                str += '\0';
                break;
              case 'a':
                str += '\x07';
                break;
              case 'b':
                str += '\b';
                break;
              case 'e':
                str += '';
                break;
              case 'f':
                str += '\f';
                break;
              case 'n':
                str += '\n';
                break;
              case 'r':
                str += '\r';
                break;
              case 't':
                str += '	';
                break;
              case 'v':
                str += '\v';
                break;
              case 'N':
                str += '\x85';
                break;
              case '_':
                str += '\xA0';
                break;
              case 'L':
                str += '\u2028';
                break;
              case 'P':
                str += '\u2029';
                break;
              case ' ':
                str += ' ';
                break;
              case '"':
                str += '"';
                break;
              case '/':
                str += '/';
                break;
              case '\\':
                str += '\\';
                break;
              case '	':
                str += '	';
                break;
              case 'x':
                str += this.parseCharCode(i + 1, 2, errors);
                i += 2;
                break;
              case 'u':
                str += this.parseCharCode(i + 1, 4, errors);
                i += 4;
                break;
              case 'U':
                str += this.parseCharCode(i + 1, 8, errors);
                i += 8;
                break;
              case '\n':
                while (src[i + 1] === ' ' || src[i + 1] === '	') i += 1;
                break;
              default:
                errors.push(new PlainValue.YAMLSyntaxError(this, `Invalid escape sequence ${src.substr(i - 1, 2)}`));
                str += '\\' + src[i];
            }
          } else if (ch === ' ' || ch === '	') {
            const wsStart = i;
            let next = src[i + 1];
            while (next === ' ' || next === '	') {
              i += 1;
              next = src[i + 1];
            }
            if (next !== '\n') str += i > wsStart ? src.slice(wsStart, i + 1) : ch;
          } else {
            str += ch;
          }
        }
        return errors.length > 0
          ? {
              errors,
              str
            }
          : str;
      }
      parseCharCode(offset, length, errors) {
        const { src } = this.context;
        const cc = src.substr(offset, length);
        const ok = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
        const code = ok ? parseInt(cc, 16) : NaN;
        if (isNaN(code)) {
          errors.push(new PlainValue.YAMLSyntaxError(this, `Invalid escape sequence ${src.substr(offset - 2, length + 2)}`));
          return src.substr(offset - 2, length + 2);
        }
        return String.fromCodePoint(code);
      }
      parse(context, start) {
        this.context = context;
        const { src } = context;
        let offset = QuoteDouble.endOfQuote(src, start + 1);
        this.valueRange = new PlainValue.Range(start, offset);
        offset = PlainValue.Node.endOfWhiteSpace(src, offset);
        offset = this.parseComment(offset);
        return offset;
      }
    };
    var QuoteSingle = class extends PlainValue.Node {
      static endOfQuote(src, offset) {
        let ch = src[offset];
        while (ch) {
          if (ch === "'") {
            if (src[offset + 1] !== "'") break;
            ch = src[(offset += 2)];
          } else {
            ch = src[(offset += 1)];
          }
        }
        return offset + 1;
      }
      get strValue() {
        if (!this.valueRange || !this.context) return null;
        const errors = [];
        const { start, end } = this.valueRange;
        const { indent, src } = this.context;
        if (src[end - 1] !== "'") errors.push(new PlainValue.YAMLSyntaxError(this, "Missing closing 'quote"));
        let str = '';
        for (let i = start + 1; i < end - 1; ++i) {
          const ch = src[i];
          if (ch === '\n') {
            if (PlainValue.Node.atDocumentBoundary(src, i + 1))
              errors.push(new PlainValue.YAMLSemanticError(this, 'Document boundary indicators are not allowed within string values'));
            const { fold, offset, error } = PlainValue.Node.foldNewline(src, i, indent);
            str += fold;
            i = offset;
            if (error) errors.push(new PlainValue.YAMLSemanticError(this, 'Multi-line single-quoted string needs to be sufficiently indented'));
          } else if (ch === "'") {
            str += ch;
            i += 1;
            if (src[i] !== "'") errors.push(new PlainValue.YAMLSyntaxError(this, 'Unescaped single quote? This should not happen.'));
          } else if (ch === ' ' || ch === '	') {
            const wsStart = i;
            let next = src[i + 1];
            while (next === ' ' || next === '	') {
              i += 1;
              next = src[i + 1];
            }
            if (next !== '\n') str += i > wsStart ? src.slice(wsStart, i + 1) : ch;
          } else {
            str += ch;
          }
        }
        return errors.length > 0
          ? {
              errors,
              str
            }
          : str;
      }
      parse(context, start) {
        this.context = context;
        const { src } = context;
        let offset = QuoteSingle.endOfQuote(src, start + 1);
        this.valueRange = new PlainValue.Range(start, offset);
        offset = PlainValue.Node.endOfWhiteSpace(src, offset);
        offset = this.parseComment(offset);
        return offset;
      }
    };
    function createNewNode(type, props) {
      switch (type) {
        case PlainValue.Type.ALIAS:
          return new Alias(type, props);
        case PlainValue.Type.BLOCK_FOLDED:
        case PlainValue.Type.BLOCK_LITERAL:
          return new BlockValue(type, props);
        case PlainValue.Type.FLOW_MAP:
        case PlainValue.Type.FLOW_SEQ:
          return new FlowCollection(type, props);
        case PlainValue.Type.MAP_KEY:
        case PlainValue.Type.MAP_VALUE:
        case PlainValue.Type.SEQ_ITEM:
          return new CollectionItem(type, props);
        case PlainValue.Type.COMMENT:
        case PlainValue.Type.PLAIN:
          return new PlainValue.PlainValue(type, props);
        case PlainValue.Type.QUOTE_DOUBLE:
          return new QuoteDouble(type, props);
        case PlainValue.Type.QUOTE_SINGLE:
          return new QuoteSingle(type, props);
        default:
          return null;
      }
    }
    var ParseContext = class {
      static parseType(src, offset, inFlow) {
        switch (src[offset]) {
          case '*':
            return PlainValue.Type.ALIAS;
          case '>':
            return PlainValue.Type.BLOCK_FOLDED;
          case '|':
            return PlainValue.Type.BLOCK_LITERAL;
          case '{':
            return PlainValue.Type.FLOW_MAP;
          case '[':
            return PlainValue.Type.FLOW_SEQ;
          case '?':
            return !inFlow && PlainValue.Node.atBlank(src, offset + 1, true) ? PlainValue.Type.MAP_KEY : PlainValue.Type.PLAIN;
          case ':':
            return !inFlow && PlainValue.Node.atBlank(src, offset + 1, true) ? PlainValue.Type.MAP_VALUE : PlainValue.Type.PLAIN;
          case '-':
            return !inFlow && PlainValue.Node.atBlank(src, offset + 1, true) ? PlainValue.Type.SEQ_ITEM : PlainValue.Type.PLAIN;
          case '"':
            return PlainValue.Type.QUOTE_DOUBLE;
          case "'":
            return PlainValue.Type.QUOTE_SINGLE;
          default:
            return PlainValue.Type.PLAIN;
        }
      }
      constructor(orig = {}, { atLineStart, inCollection, inFlow, indent, lineStart, parent } = {}) {
        PlainValue._defineProperty(this, 'parseNode', (overlay, start) => {
          if (PlainValue.Node.atDocumentBoundary(this.src, start)) return null;
          const context = new ParseContext(this, overlay);
          const { props, type, valueStart } = context.parseProps(start);
          const node = createNewNode(type, props);
          let offset = node.parse(context, valueStart);
          node.range = new PlainValue.Range(start, offset);
          if (offset <= start) {
            node.error = new Error(`Node#parse consumed no characters`);
            node.error.parseEnd = offset;
            node.error.source = node;
            node.range.end = start + 1;
          }
          if (context.nodeStartsCollection(node)) {
            if (!node.error && !context.atLineStart && context.parent.type === PlainValue.Type.DOCUMENT) {
              node.error = new PlainValue.YAMLSyntaxError(
                node,
                'Block collection must not have preceding content here (e.g. directives-end indicator)'
              );
            }
            const collection = new Collection(node);
            offset = collection.parse(new ParseContext(context), offset);
            collection.range = new PlainValue.Range(start, offset);
            return collection;
          }
          return node;
        });
        this.atLineStart = atLineStart != null ? atLineStart : orig.atLineStart || false;
        this.inCollection = inCollection != null ? inCollection : orig.inCollection || false;
        this.inFlow = inFlow != null ? inFlow : orig.inFlow || false;
        this.indent = indent != null ? indent : orig.indent;
        this.lineStart = lineStart != null ? lineStart : orig.lineStart;
        this.parent = parent != null ? parent : orig.parent || {};
        this.root = orig.root;
        this.src = orig.src;
      }
      nodeStartsCollection(node) {
        const { inCollection, inFlow, src } = this;
        if (inCollection || inFlow) return false;
        if (node instanceof CollectionItem) return true;
        let offset = node.range.end;
        if (src[offset] === '\n' || src[offset - 1] === '\n') return false;
        offset = PlainValue.Node.endOfWhiteSpace(src, offset);
        return src[offset] === ':';
      }
      parseProps(offset) {
        const { inFlow, parent, src } = this;
        const props = [];
        let lineHasProps = false;
        offset = this.atLineStart ? PlainValue.Node.endOfIndent(src, offset) : PlainValue.Node.endOfWhiteSpace(src, offset);
        let ch = src[offset];
        while (ch === PlainValue.Char.ANCHOR || ch === PlainValue.Char.COMMENT || ch === PlainValue.Char.TAG || ch === '\n') {
          if (ch === '\n') {
            let inEnd = offset;
            let lineStart;
            do {
              lineStart = inEnd + 1;
              inEnd = PlainValue.Node.endOfIndent(src, lineStart);
            } while (src[inEnd] === '\n');
            const indentDiff = inEnd - (lineStart + this.indent);
            const noIndicatorAsIndent = parent.type === PlainValue.Type.SEQ_ITEM && parent.context.atLineStart;
            if (src[inEnd] !== '#' && !PlainValue.Node.nextNodeIsIndented(src[inEnd], indentDiff, !noIndicatorAsIndent)) break;
            this.atLineStart = true;
            this.lineStart = lineStart;
            lineHasProps = false;
            offset = inEnd;
          } else if (ch === PlainValue.Char.COMMENT) {
            const end = PlainValue.Node.endOfLine(src, offset + 1);
            props.push(new PlainValue.Range(offset, end));
            offset = end;
          } else {
            let end = PlainValue.Node.endOfIdentifier(src, offset + 1);
            if (
              ch === PlainValue.Char.TAG &&
              src[end] === ',' &&
              /^[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+,\d\d\d\d(-\d\d){0,2}\/\S/.test(src.slice(offset + 1, end + 13))
            ) {
              end = PlainValue.Node.endOfIdentifier(src, end + 5);
            }
            props.push(new PlainValue.Range(offset, end));
            lineHasProps = true;
            offset = PlainValue.Node.endOfWhiteSpace(src, end);
          }
          ch = src[offset];
        }
        if (lineHasProps && ch === ':' && PlainValue.Node.atBlank(src, offset + 1, true)) offset -= 1;
        const type = ParseContext.parseType(src, offset, inFlow);
        return {
          props,
          type,
          valueStart: offset
        };
      }
    };
    function parse(src) {
      const cr = [];
      if (src.indexOf('\r') !== -1) {
        src = src.replace(/\r\n?/g, (match, offset2) => {
          if (match.length > 1) cr.push(offset2);
          return '\n';
        });
      }
      const documents = [];
      let offset = 0;
      do {
        const doc = new Document();
        const context = new ParseContext({
          src
        });
        offset = doc.parse(context, offset);
        documents.push(doc);
      } while (offset < src.length);
      documents.setOrigRanges = () => {
        if (cr.length === 0) return false;
        for (let i = 1; i < cr.length; ++i) cr[i] -= i;
        let crOffset = 0;
        for (let i = 0; i < documents.length; ++i) {
          crOffset = documents[i].setOrigRanges(cr, crOffset);
        }
        cr.splice(0, cr.length);
        return true;
      };
      documents.toString = () => documents.join('...\n');
      return documents;
    }
    exports2.parse = parse;
  }
});

// node_modules/yaml/dist/resolveSeq-d03cb037.js
var require_resolveSeq_d03cb037 = __commonJS({
  'node_modules/yaml/dist/resolveSeq-d03cb037.js'(exports2) {
    'use strict';
    var PlainValue = require_PlainValue_ec8e588e();
    function addCommentBefore(str, indent, comment) {
      if (!comment) return str;
      const cc = comment.replace(/[\s\S]^/gm, `$&${indent}#`);
      return `#${cc}
${indent}${str}`;
    }
    function addComment(str, indent, comment) {
      return !comment
        ? str
        : comment.indexOf('\n') === -1
        ? `${str} #${comment}`
        : `${str}
` + comment.replace(/^/gm, `${indent || ''}#`);
    }
    var Node = class {};
    function toJSON(value, arg, ctx) {
      if (Array.isArray(value)) return value.map((v, i) => toJSON(v, String(i), ctx));
      if (value && typeof value.toJSON === 'function') {
        const anchor = ctx && ctx.anchors && ctx.anchors.get(value);
        if (anchor)
          ctx.onCreate = res2 => {
            anchor.res = res2;
            delete ctx.onCreate;
          };
        const res = value.toJSON(arg, ctx);
        if (anchor && ctx.onCreate) ctx.onCreate(res);
        return res;
      }
      if ((!ctx || !ctx.keep) && typeof value === 'bigint') return Number(value);
      return value;
    }
    var Scalar = class extends Node {
      constructor(value) {
        super();
        this.value = value;
      }
      toJSON(arg, ctx) {
        return ctx && ctx.keep ? this.value : toJSON(this.value, arg, ctx);
      }
      toString() {
        return String(this.value);
      }
    };
    function collectionFromPath(schema, path, value) {
      let v = value;
      for (let i = path.length - 1; i >= 0; --i) {
        const k = path[i];
        if (Number.isInteger(k) && k >= 0) {
          const a = [];
          a[k] = v;
          v = a;
        } else {
          const o = {};
          Object.defineProperty(o, k, {
            value: v,
            writable: true,
            enumerable: true,
            configurable: true
          });
          v = o;
        }
      }
      return schema.createNode(v, false);
    }
    var isEmptyPath = path => path == null || (typeof path === 'object' && path[Symbol.iterator]().next().done);
    var Collection = class extends Node {
      constructor(schema) {
        super();
        PlainValue._defineProperty(this, 'items', []);
        this.schema = schema;
      }
      addIn(path, value) {
        if (isEmptyPath(path)) this.add(value);
        else {
          const [key, ...rest] = path;
          const node = this.get(key, true);
          if (node instanceof Collection) node.addIn(rest, value);
          else if (node === void 0 && this.schema) this.set(key, collectionFromPath(this.schema, rest, value));
          else throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
      deleteIn([key, ...rest]) {
        if (rest.length === 0) return this.delete(key);
        const node = this.get(key, true);
        if (node instanceof Collection) return node.deleteIn(rest);
        else throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
      }
      getIn([key, ...rest], keepScalar) {
        const node = this.get(key, true);
        if (rest.length === 0) return !keepScalar && node instanceof Scalar ? node.value : node;
        else return node instanceof Collection ? node.getIn(rest, keepScalar) : void 0;
      }
      hasAllNullValues() {
        return this.items.every(node => {
          if (!node || node.type !== 'PAIR') return false;
          const n = node.value;
          return n == null || (n instanceof Scalar && n.value == null && !n.commentBefore && !n.comment && !n.tag);
        });
      }
      hasIn([key, ...rest]) {
        if (rest.length === 0) return this.has(key);
        const node = this.get(key, true);
        return node instanceof Collection ? node.hasIn(rest) : false;
      }
      setIn([key, ...rest], value) {
        if (rest.length === 0) {
          this.set(key, value);
        } else {
          const node = this.get(key, true);
          if (node instanceof Collection) node.setIn(rest, value);
          else if (node === void 0 && this.schema) this.set(key, collectionFromPath(this.schema, rest, value));
          else throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
      toJSON() {
        return null;
      }
      toString(ctx, { blockItem, flowChars, isMap, itemIndent }, onComment, onChompKeep) {
        const { indent, indentStep, stringify } = ctx;
        const inFlow = this.type === PlainValue.Type.FLOW_MAP || this.type === PlainValue.Type.FLOW_SEQ || ctx.inFlow;
        if (inFlow) itemIndent += indentStep;
        const allNullValues = isMap && this.hasAllNullValues();
        ctx = Object.assign({}, ctx, {
          allNullValues,
          indent: itemIndent,
          inFlow,
          type: null
        });
        let chompKeep = false;
        let hasItemWithNewLine = false;
        const nodes = this.items.reduce((nodes2, item, i) => {
          let comment;
          if (item) {
            if (!chompKeep && item.spaceBefore)
              nodes2.push({
                type: 'comment',
                str: ''
              });
            if (item.commentBefore)
              item.commentBefore.match(/^.*$/gm).forEach(line => {
                nodes2.push({
                  type: 'comment',
                  str: `#${line}`
                });
              });
            if (item.comment) comment = item.comment;
            if (
              inFlow &&
              ((!chompKeep && item.spaceBefore) ||
                item.commentBefore ||
                item.comment ||
                (item.key && (item.key.commentBefore || item.key.comment)) ||
                (item.value && (item.value.commentBefore || item.value.comment)))
            )
              hasItemWithNewLine = true;
          }
          chompKeep = false;
          let str2 = stringify(
            item,
            ctx,
            () => (comment = null),
            () => (chompKeep = true)
          );
          if (inFlow && !hasItemWithNewLine && str2.includes('\n')) hasItemWithNewLine = true;
          if (inFlow && i < this.items.length - 1) str2 += ',';
          str2 = addComment(str2, itemIndent, comment);
          if (chompKeep && (comment || inFlow)) chompKeep = false;
          nodes2.push({
            type: 'item',
            str: str2
          });
          return nodes2;
        }, []);
        let str;
        if (nodes.length === 0) {
          str = flowChars.start + flowChars.end;
        } else if (inFlow) {
          const { start, end } = flowChars;
          const strings = nodes.map(n => n.str);
          if (hasItemWithNewLine || strings.reduce((sum, str2) => sum + str2.length + 2, 2) > Collection.maxFlowStringSingleLineLength) {
            str = start;
            for (const s of strings) {
              str += s
                ? `
${indentStep}${indent}${s}`
                : '\n';
            }
            str += `
${indent}${end}`;
          } else {
            str = `${start} ${strings.join(' ')} ${end}`;
          }
        } else {
          const strings = nodes.map(blockItem);
          str = strings.shift();
          for (const s of strings)
            str += s
              ? `
${indent}${s}`
              : '\n';
        }
        if (this.comment) {
          str += '\n' + this.comment.replace(/^/gm, `${indent}#`);
          if (onComment) onComment();
        } else if (chompKeep && onChompKeep) onChompKeep();
        return str;
      }
    };
    PlainValue._defineProperty(Collection, 'maxFlowStringSingleLineLength', 60);
    function asItemIndex(key) {
      let idx = key instanceof Scalar ? key.value : key;
      if (idx && typeof idx === 'string') idx = Number(idx);
      return Number.isInteger(idx) && idx >= 0 ? idx : null;
    }
    var YAMLSeq = class extends Collection {
      add(value) {
        this.items.push(value);
      }
      delete(key) {
        const idx = asItemIndex(key);
        if (typeof idx !== 'number') return false;
        const del = this.items.splice(idx, 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const idx = asItemIndex(key);
        if (typeof idx !== 'number') return void 0;
        const it = this.items[idx];
        return !keepScalar && it instanceof Scalar ? it.value : it;
      }
      has(key) {
        const idx = asItemIndex(key);
        return typeof idx === 'number' && idx < this.items.length;
      }
      set(key, value) {
        const idx = asItemIndex(key);
        if (typeof idx !== 'number') throw new Error(`Expected a valid index, not ${key}.`);
        this.items[idx] = value;
      }
      toJSON(_, ctx) {
        const seq = [];
        if (ctx && ctx.onCreate) ctx.onCreate(seq);
        let i = 0;
        for (const item of this.items) seq.push(toJSON(item, String(i++), ctx));
        return seq;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx) return JSON.stringify(this);
        return super.toString(
          ctx,
          {
            blockItem: n => (n.type === 'comment' ? n.str : `- ${n.str}`),
            flowChars: {
              start: '[',
              end: ']'
            },
            isMap: false,
            itemIndent: (ctx.indent || '') + '  '
          },
          onComment,
          onChompKeep
        );
      }
    };
    var stringifyKey = (key, jsKey, ctx) => {
      if (jsKey === null) return '';
      if (typeof jsKey !== 'object') return String(jsKey);
      if (key instanceof Node && ctx && ctx.doc)
        return key.toString({
          anchors: Object.create(null),
          doc: ctx.doc,
          indent: '',
          indentStep: ctx.indentStep,
          inFlow: true,
          inStringifyKey: true,
          stringify: ctx.stringify
        });
      return JSON.stringify(jsKey);
    };
    var Pair = class extends Node {
      constructor(key, value = null) {
        super();
        this.key = key;
        this.value = value;
        this.type = Pair.Type.PAIR;
      }
      get commentBefore() {
        return this.key instanceof Node ? this.key.commentBefore : void 0;
      }
      set commentBefore(cb) {
        if (this.key == null) this.key = new Scalar(null);
        if (this.key instanceof Node) this.key.commentBefore = cb;
        else {
          const msg = 'Pair.commentBefore is an alias for Pair.key.commentBefore. To set it, the key must be a Node.';
          throw new Error(msg);
        }
      }
      addToJSMap(ctx, map) {
        const key = toJSON(this.key, '', ctx);
        if (map instanceof Map) {
          const value = toJSON(this.value, key, ctx);
          map.set(key, value);
        } else if (map instanceof Set) {
          map.add(key);
        } else {
          const stringKey = stringifyKey(this.key, key, ctx);
          const value = toJSON(this.value, stringKey, ctx);
          if (stringKey in map)
            Object.defineProperty(map, stringKey, {
              value,
              writable: true,
              enumerable: true,
              configurable: true
            });
          else map[stringKey] = value;
        }
        return map;
      }
      toJSON(_, ctx) {
        const pair = ctx && ctx.mapAsMap ? new Map() : {};
        return this.addToJSMap(ctx, pair);
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx || !ctx.doc) return JSON.stringify(this);
        const { indent: indentSize, indentSeq, simpleKeys } = ctx.doc.options;
        let { key, value } = this;
        let keyComment = key instanceof Node && key.comment;
        if (simpleKeys) {
          if (keyComment) {
            throw new Error('With simple keys, key nodes cannot have comments');
          }
          if (key instanceof Collection) {
            const msg = 'With simple keys, collection cannot be used as a key value';
            throw new Error(msg);
          }
        }
        let explicitKey =
          !simpleKeys &&
          (!key ||
            keyComment ||
            (key instanceof Node
              ? key instanceof Collection || key.type === PlainValue.Type.BLOCK_FOLDED || key.type === PlainValue.Type.BLOCK_LITERAL
              : typeof key === 'object'));
        const { doc, indent, indentStep, stringify } = ctx;
        ctx = Object.assign({}, ctx, {
          implicitKey: !explicitKey,
          indent: indent + indentStep
        });
        let chompKeep = false;
        let str = stringify(
          key,
          ctx,
          () => (keyComment = null),
          () => (chompKeep = true)
        );
        str = addComment(str, ctx.indent, keyComment);
        if (!explicitKey && str.length > 1024) {
          if (simpleKeys) throw new Error('With simple keys, single line scalar must not span more than 1024 characters');
          explicitKey = true;
        }
        if (ctx.allNullValues && !simpleKeys) {
          if (this.comment) {
            str = addComment(str, ctx.indent, this.comment);
            if (onComment) onComment();
          } else if (chompKeep && !keyComment && onChompKeep) onChompKeep();
          return ctx.inFlow && !explicitKey ? str : `? ${str}`;
        }
        str = explicitKey
          ? `? ${str}
${indent}:`
          : `${str}:`;
        if (this.comment) {
          str = addComment(str, ctx.indent, this.comment);
          if (onComment) onComment();
        }
        let vcb = '';
        let valueComment = null;
        if (value instanceof Node) {
          if (value.spaceBefore) vcb = '\n';
          if (value.commentBefore) {
            const cs = value.commentBefore.replace(/^/gm, `${ctx.indent}#`);
            vcb += `
${cs}`;
          }
          valueComment = value.comment;
        } else if (value && typeof value === 'object') {
          value = doc.schema.createNode(value, true);
        }
        ctx.implicitKey = false;
        if (!explicitKey && !this.comment && value instanceof Scalar) ctx.indentAtStart = str.length + 1;
        chompKeep = false;
        if (
          !indentSeq &&
          indentSize >= 2 &&
          !ctx.inFlow &&
          !explicitKey &&
          value instanceof YAMLSeq &&
          value.type !== PlainValue.Type.FLOW_SEQ &&
          !value.tag &&
          !doc.anchors.getName(value)
        ) {
          ctx.indent = ctx.indent.substr(2);
        }
        const valueStr = stringify(
          value,
          ctx,
          () => (valueComment = null),
          () => (chompKeep = true)
        );
        let ws = ' ';
        if (vcb || this.comment) {
          ws = `${vcb}
${ctx.indent}`;
        } else if (!explicitKey && value instanceof Collection) {
          const flow = valueStr[0] === '[' || valueStr[0] === '{';
          if (!flow || valueStr.includes('\n'))
            ws = `
${ctx.indent}`;
        } else if (valueStr[0] === '\n') ws = '';
        if (chompKeep && !valueComment && onChompKeep) onChompKeep();
        return addComment(str + ws + valueStr, ctx.indent, valueComment);
      }
    };
    PlainValue._defineProperty(Pair, 'Type', {
      PAIR: 'PAIR',
      MERGE_PAIR: 'MERGE_PAIR'
    });
    var getAliasCount = (node, anchors) => {
      if (node instanceof Alias) {
        const anchor = anchors.get(node.source);
        return anchor.count * anchor.aliasCount;
      } else if (node instanceof Collection) {
        let count = 0;
        for (const item of node.items) {
          const c = getAliasCount(item, anchors);
          if (c > count) count = c;
        }
        return count;
      } else if (node instanceof Pair) {
        const kc = getAliasCount(node.key, anchors);
        const vc = getAliasCount(node.value, anchors);
        return Math.max(kc, vc);
      }
      return 1;
    };
    var Alias = class extends Node {
      static stringify({ range, source }, { anchors, doc, implicitKey, inStringifyKey }) {
        let anchor = Object.keys(anchors).find(a => anchors[a] === source);
        if (!anchor && inStringifyKey) anchor = doc.anchors.getName(source) || doc.anchors.newName();
        if (anchor) return `*${anchor}${implicitKey ? ' ' : ''}`;
        const msg = doc.anchors.getName(source) ? 'Alias node must be after source node' : 'Source node not found for alias node';
        throw new Error(`${msg} [${range}]`);
      }
      constructor(source) {
        super();
        this.source = source;
        this.type = PlainValue.Type.ALIAS;
      }
      set tag(t) {
        throw new Error('Alias nodes cannot have tags');
      }
      toJSON(arg, ctx) {
        if (!ctx) return toJSON(this.source, arg, ctx);
        const { anchors, maxAliasCount } = ctx;
        const anchor = anchors.get(this.source);
        if (!anchor || anchor.res === void 0) {
          const msg = 'This should not happen: Alias anchor was not resolved?';
          if (this.cstNode) throw new PlainValue.YAMLReferenceError(this.cstNode, msg);
          else throw new ReferenceError(msg);
        }
        if (maxAliasCount >= 0) {
          anchor.count += 1;
          if (anchor.aliasCount === 0) anchor.aliasCount = getAliasCount(this.source, anchors);
          if (anchor.count * anchor.aliasCount > maxAliasCount) {
            const msg = 'Excessive alias count indicates a resource exhaustion attack';
            if (this.cstNode) throw new PlainValue.YAMLReferenceError(this.cstNode, msg);
            else throw new ReferenceError(msg);
          }
        }
        return anchor.res;
      }
      toString(ctx) {
        return Alias.stringify(this, ctx);
      }
    };
    PlainValue._defineProperty(Alias, 'default', true);
    function findPair(items, key) {
      const k = key instanceof Scalar ? key.value : key;
      for (const it of items) {
        if (it instanceof Pair) {
          if (it.key === key || it.key === k) return it;
          if (it.key && it.key.value === k) return it;
        }
      }
      return void 0;
    }
    var YAMLMap = class extends Collection {
      add(pair, overwrite) {
        if (!pair) pair = new Pair(pair);
        else if (!(pair instanceof Pair)) pair = new Pair(pair.key || pair, pair.value);
        const prev = findPair(this.items, pair.key);
        const sortEntries = this.schema && this.schema.sortMapEntries;
        if (prev) {
          if (overwrite) prev.value = pair.value;
          else throw new Error(`Key ${pair.key} already set`);
        } else if (sortEntries) {
          const i = this.items.findIndex(item => sortEntries(pair, item) < 0);
          if (i === -1) this.items.push(pair);
          else this.items.splice(i, 0, pair);
        } else {
          this.items.push(pair);
        }
      }
      delete(key) {
        const it = findPair(this.items, key);
        if (!it) return false;
        const del = this.items.splice(this.items.indexOf(it), 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const it = findPair(this.items, key);
        const node = it && it.value;
        return !keepScalar && node instanceof Scalar ? node.value : node;
      }
      has(key) {
        return !!findPair(this.items, key);
      }
      set(key, value) {
        this.add(new Pair(key, value), true);
      }
      toJSON(_, ctx, Type) {
        const map = Type ? new Type() : ctx && ctx.mapAsMap ? new Map() : {};
        if (ctx && ctx.onCreate) ctx.onCreate(map);
        for (const item of this.items) item.addToJSMap(ctx, map);
        return map;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx) return JSON.stringify(this);
        for (const item of this.items) {
          if (!(item instanceof Pair)) throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
        }
        return super.toString(
          ctx,
          {
            blockItem: n => n.str,
            flowChars: {
              start: '{',
              end: '}'
            },
            isMap: true,
            itemIndent: ctx.indent || ''
          },
          onComment,
          onChompKeep
        );
      }
    };
    var MERGE_KEY = '<<';
    var Merge = class extends Pair {
      constructor(pair) {
        if (pair instanceof Pair) {
          let seq = pair.value;
          if (!(seq instanceof YAMLSeq)) {
            seq = new YAMLSeq();
            seq.items.push(pair.value);
            seq.range = pair.value.range;
          }
          super(pair.key, seq);
          this.range = pair.range;
        } else {
          super(new Scalar(MERGE_KEY), new YAMLSeq());
        }
        this.type = Pair.Type.MERGE_PAIR;
      }
      addToJSMap(ctx, map) {
        for (const { source } of this.value.items) {
          if (!(source instanceof YAMLMap)) throw new Error('Merge sources must be maps');
          const srcMap = source.toJSON(null, ctx, Map);
          for (const [key, value] of srcMap) {
            if (map instanceof Map) {
              if (!map.has(key)) map.set(key, value);
            } else if (map instanceof Set) {
              map.add(key);
            } else if (!Object.prototype.hasOwnProperty.call(map, key)) {
              Object.defineProperty(map, key, {
                value,
                writable: true,
                enumerable: true,
                configurable: true
              });
            }
          }
        }
        return map;
      }
      toString(ctx, onComment) {
        const seq = this.value;
        if (seq.items.length > 1) return super.toString(ctx, onComment);
        this.value = seq.items[0];
        const str = super.toString(ctx, onComment);
        this.value = seq;
        return str;
      }
    };
    var binaryOptions = {
      defaultType: PlainValue.Type.BLOCK_LITERAL,
      lineWidth: 76
    };
    var boolOptions = {
      trueStr: 'true',
      falseStr: 'false'
    };
    var intOptions = {
      asBigInt: false
    };
    var nullOptions = {
      nullStr: 'null'
    };
    var strOptions = {
      defaultType: PlainValue.Type.PLAIN,
      doubleQuoted: {
        jsonEncoding: false,
        minMultiLineLength: 40
      },
      fold: {
        lineWidth: 80,
        minContentWidth: 20
      }
    };
    function resolveScalar(str, tags, scalarFallback) {
      for (const { format, test, resolve } of tags) {
        if (test) {
          const match = str.match(test);
          if (match) {
            let res = resolve.apply(null, match);
            if (!(res instanceof Scalar)) res = new Scalar(res);
            if (format) res.format = format;
            return res;
          }
        }
      }
      if (scalarFallback) str = scalarFallback(str);
      return new Scalar(str);
    }
    var FOLD_FLOW = 'flow';
    var FOLD_BLOCK = 'block';
    var FOLD_QUOTED = 'quoted';
    var consumeMoreIndentedLines = (text, i) => {
      let ch = text[i + 1];
      while (ch === ' ' || ch === '	') {
        do {
          ch = text[(i += 1)];
        } while (ch && ch !== '\n');
        ch = text[i + 1];
      }
      return i;
    };
    function foldFlowLines(text, indent, mode, { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow }) {
      if (!lineWidth || lineWidth < 0) return text;
      const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
      if (text.length <= endStep) return text;
      const folds = [];
      const escapedFolds = {};
      let end = lineWidth - indent.length;
      if (typeof indentAtStart === 'number') {
        if (indentAtStart > lineWidth - Math.max(2, minContentWidth)) folds.push(0);
        else end = lineWidth - indentAtStart;
      }
      let split = void 0;
      let prev = void 0;
      let overflow = false;
      let i = -1;
      let escStart = -1;
      let escEnd = -1;
      if (mode === FOLD_BLOCK) {
        i = consumeMoreIndentedLines(text, i);
        if (i !== -1) end = i + endStep;
      }
      for (let ch; (ch = text[(i += 1)]); ) {
        if (mode === FOLD_QUOTED && ch === '\\') {
          escStart = i;
          switch (text[i + 1]) {
            case 'x':
              i += 3;
              break;
            case 'u':
              i += 5;
              break;
            case 'U':
              i += 9;
              break;
            default:
              i += 1;
          }
          escEnd = i;
        }
        if (ch === '\n') {
          if (mode === FOLD_BLOCK) i = consumeMoreIndentedLines(text, i);
          end = i + endStep;
          split = void 0;
        } else {
          if (ch === ' ' && prev && prev !== ' ' && prev !== '\n' && prev !== '	') {
            const next = text[i + 1];
            if (next && next !== ' ' && next !== '\n' && next !== '	') split = i;
          }
          if (i >= end) {
            if (split) {
              folds.push(split);
              end = split + endStep;
              split = void 0;
            } else if (mode === FOLD_QUOTED) {
              while (prev === ' ' || prev === '	') {
                prev = ch;
                ch = text[(i += 1)];
                overflow = true;
              }
              const j = i > escEnd + 1 ? i - 2 : escStart - 1;
              if (escapedFolds[j]) return text;
              folds.push(j);
              escapedFolds[j] = true;
              end = j + endStep;
              split = void 0;
            } else {
              overflow = true;
            }
          }
        }
        prev = ch;
      }
      if (overflow && onOverflow) onOverflow();
      if (folds.length === 0) return text;
      if (onFold) onFold();
      let res = text.slice(0, folds[0]);
      for (let i2 = 0; i2 < folds.length; ++i2) {
        const fold = folds[i2];
        const end2 = folds[i2 + 1] || text.length;
        if (fold === 0)
          res = `
${indent}${text.slice(0, end2)}`;
        else {
          if (mode === FOLD_QUOTED && escapedFolds[fold]) res += `${text[fold]}\\`;
          res += `
${indent}${text.slice(fold + 1, end2)}`;
        }
      }
      return res;
    }
    var getFoldOptions = ({ indentAtStart }) =>
      indentAtStart
        ? Object.assign(
            {
              indentAtStart
            },
            strOptions.fold
          )
        : strOptions.fold;
    var containsDocumentMarker = str => /^(%|---|\.\.\.)/m.test(str);
    function lineLengthOverLimit(str, lineWidth, indentLength) {
      if (!lineWidth || lineWidth < 0) return false;
      const limit = lineWidth - indentLength;
      const strLen = str.length;
      if (strLen <= limit) return false;
      for (let i = 0, start = 0; i < strLen; ++i) {
        if (str[i] === '\n') {
          if (i - start > limit) return true;
          start = i + 1;
          if (strLen - start <= limit) return false;
        }
      }
      return true;
    }
    function doubleQuotedString(value, ctx) {
      const { implicitKey } = ctx;
      const { jsonEncoding, minMultiLineLength } = strOptions.doubleQuoted;
      const json = JSON.stringify(value);
      if (jsonEncoding) return json;
      const indent = ctx.indent || (containsDocumentMarker(value) ? '  ' : '');
      let str = '';
      let start = 0;
      for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
        if (ch === ' ' && json[i + 1] === '\\' && json[i + 2] === 'n') {
          str += json.slice(start, i) + '\\ ';
          i += 1;
          start = i;
          ch = '\\';
        }
        if (ch === '\\')
          switch (json[i + 1]) {
            case 'u':
              {
                str += json.slice(start, i);
                const code = json.substr(i + 2, 4);
                switch (code) {
                  case '0000':
                    str += '\\0';
                    break;
                  case '0007':
                    str += '\\a';
                    break;
                  case '000b':
                    str += '\\v';
                    break;
                  case '001b':
                    str += '\\e';
                    break;
                  case '0085':
                    str += '\\N';
                    break;
                  case '00a0':
                    str += '\\_';
                    break;
                  case '2028':
                    str += '\\L';
                    break;
                  case '2029':
                    str += '\\P';
                    break;
                  default:
                    if (code.substr(0, 2) === '00') str += '\\x' + code.substr(2);
                    else str += json.substr(i, 6);
                }
                i += 5;
                start = i + 1;
              }
              break;
            case 'n':
              if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) {
                i += 1;
              } else {
                str += json.slice(start, i) + '\n\n';
                while (json[i + 2] === '\\' && json[i + 3] === 'n' && json[i + 4] !== '"') {
                  str += '\n';
                  i += 2;
                }
                str += indent;
                if (json[i + 2] === ' ') str += '\\';
                i += 1;
                start = i + 1;
              }
              break;
            default:
              i += 1;
          }
      }
      str = start ? str + json.slice(start) : json;
      return implicitKey ? str : foldFlowLines(str, indent, FOLD_QUOTED, getFoldOptions(ctx));
    }
    function singleQuotedString(value, ctx) {
      if (ctx.implicitKey) {
        if (/\n/.test(value)) return doubleQuotedString(value, ctx);
      } else {
        if (/[ \t]\n|\n[ \t]/.test(value)) return doubleQuotedString(value, ctx);
      }
      const indent = ctx.indent || (containsDocumentMarker(value) ? '  ' : '');
      const res =
        "'" +
        value.replace(/'/g, "''").replace(
          /\n+/g,
          `$&
${indent}`
        ) +
        "'";
      return ctx.implicitKey ? res : foldFlowLines(res, indent, FOLD_FLOW, getFoldOptions(ctx));
    }
    function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
      if (/\n[\t ]+$/.test(value) || /^\s*$/.test(value)) {
        return doubleQuotedString(value, ctx);
      }
      const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? '  ' : '');
      const indentSize = indent ? '2' : '1';
      const literal =
        type === PlainValue.Type.BLOCK_FOLDED
          ? false
          : type === PlainValue.Type.BLOCK_LITERAL
          ? true
          : !lineLengthOverLimit(value, strOptions.fold.lineWidth, indent.length);
      let header = literal ? '|' : '>';
      if (!value) return header + '\n';
      let wsStart = '';
      let wsEnd = '';
      value = value
        .replace(/[\n\t ]*$/, ws => {
          const n = ws.indexOf('\n');
          if (n === -1) {
            header += '-';
          } else if (value === ws || n !== ws.length - 1) {
            header += '+';
            if (onChompKeep) onChompKeep();
          }
          wsEnd = ws.replace(/\n$/, '');
          return '';
        })
        .replace(/^[\n ]*/, ws => {
          if (ws.indexOf(' ') !== -1) header += indentSize;
          const m = ws.match(/ +$/);
          if (m) {
            wsStart = ws.slice(0, -m[0].length);
            return m[0];
          } else {
            wsStart = ws;
            return '';
          }
        });
      if (wsEnd) wsEnd = wsEnd.replace(/\n+(?!\n|$)/g, `$&${indent}`);
      if (wsStart) wsStart = wsStart.replace(/\n+/g, `$&${indent}`);
      if (comment) {
        header += ' #' + comment.replace(/ ?[\r\n]+/g, ' ');
        if (onComment) onComment();
      }
      if (!value)
        return `${header}${indentSize}
${indent}${wsEnd}`;
      if (literal) {
        value = value.replace(/\n+/g, `$&${indent}`);
        return `${header}
${indent}${wsStart}${value}${wsEnd}`;
      }
      value = value
        .replace(/\n+/g, '\n$&')
        .replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, '$1$2')
        .replace(/\n+/g, `$&${indent}`);
      const body = foldFlowLines(`${wsStart}${value}${wsEnd}`, indent, FOLD_BLOCK, strOptions.fold);
      return `${header}
${indent}${body}`;
    }
    function plainString(item, ctx, onComment, onChompKeep) {
      const { comment, type, value } = item;
      const { actualString, implicitKey, indent, inFlow } = ctx;
      if ((implicitKey && /[\n[\]{},]/.test(value)) || (inFlow && /[[\]{},]/.test(value))) {
        return doubleQuotedString(value, ctx);
      }
      if (!value || /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
        return implicitKey || inFlow || value.indexOf('\n') === -1
          ? value.indexOf('"') !== -1 && value.indexOf("'") === -1
            ? singleQuotedString(value, ctx)
            : doubleQuotedString(value, ctx)
          : blockString(item, ctx, onComment, onChompKeep);
      }
      if (!implicitKey && !inFlow && type !== PlainValue.Type.PLAIN && value.indexOf('\n') !== -1) {
        return blockString(item, ctx, onComment, onChompKeep);
      }
      if (indent === '' && containsDocumentMarker(value)) {
        ctx.forceBlockIndent = true;
        return blockString(item, ctx, onComment, onChompKeep);
      }
      const str = value.replace(
        /\n+/g,
        `$&
${indent}`
      );
      if (actualString) {
        const { tags } = ctx.doc.schema;
        const resolved = resolveScalar(str, tags, tags.scalarFallback).value;
        if (typeof resolved !== 'string') return doubleQuotedString(value, ctx);
      }
      const body = implicitKey ? str : foldFlowLines(str, indent, FOLD_FLOW, getFoldOptions(ctx));
      if (comment && !inFlow && (body.indexOf('\n') !== -1 || comment.indexOf('\n') !== -1)) {
        if (onComment) onComment();
        return addCommentBefore(body, indent, comment);
      }
      return body;
    }
    function stringifyString(item, ctx, onComment, onChompKeep) {
      const { defaultType } = strOptions;
      const { implicitKey, inFlow } = ctx;
      let { type, value } = item;
      if (typeof value !== 'string') {
        value = String(value);
        item = Object.assign({}, item, {
          value
        });
      }
      const _stringify = _type => {
        switch (_type) {
          case PlainValue.Type.BLOCK_FOLDED:
          case PlainValue.Type.BLOCK_LITERAL:
            return blockString(item, ctx, onComment, onChompKeep);
          case PlainValue.Type.QUOTE_DOUBLE:
            return doubleQuotedString(value, ctx);
          case PlainValue.Type.QUOTE_SINGLE:
            return singleQuotedString(value, ctx);
          case PlainValue.Type.PLAIN:
            return plainString(item, ctx, onComment, onChompKeep);
          default:
            return null;
        }
      };
      if (type !== PlainValue.Type.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f]/.test(value)) {
        type = PlainValue.Type.QUOTE_DOUBLE;
      } else if ((implicitKey || inFlow) && (type === PlainValue.Type.BLOCK_FOLDED || type === PlainValue.Type.BLOCK_LITERAL)) {
        type = PlainValue.Type.QUOTE_DOUBLE;
      }
      let res = _stringify(type);
      if (res === null) {
        res = _stringify(defaultType);
        if (res === null) throw new Error(`Unsupported default string type ${defaultType}`);
      }
      return res;
    }
    function stringifyNumber({ format, minFractionDigits, tag, value }) {
      if (typeof value === 'bigint') return String(value);
      if (!isFinite(value)) return isNaN(value) ? '.nan' : value < 0 ? '-.inf' : '.inf';
      let n = JSON.stringify(value);
      if (!format && minFractionDigits && (!tag || tag === 'tag:yaml.org,2002:float') && /^\d/.test(n)) {
        let i = n.indexOf('.');
        if (i < 0) {
          i = n.length;
          n += '.';
        }
        let d = minFractionDigits - (n.length - i - 1);
        while (d-- > 0) n += '0';
      }
      return n;
    }
    function checkFlowCollectionEnd(errors, cst) {
      let char, name;
      switch (cst.type) {
        case PlainValue.Type.FLOW_MAP:
          char = '}';
          name = 'flow map';
          break;
        case PlainValue.Type.FLOW_SEQ:
          char = ']';
          name = 'flow sequence';
          break;
        default:
          errors.push(new PlainValue.YAMLSemanticError(cst, 'Not a flow collection!?'));
          return;
      }
      let lastItem;
      for (let i = cst.items.length - 1; i >= 0; --i) {
        const item = cst.items[i];
        if (!item || item.type !== PlainValue.Type.COMMENT) {
          lastItem = item;
          break;
        }
      }
      if (lastItem && lastItem.char !== char) {
        const msg = `Expected ${name} to end with ${char}`;
        let err;
        if (typeof lastItem.offset === 'number') {
          err = new PlainValue.YAMLSemanticError(cst, msg);
          err.offset = lastItem.offset + 1;
        } else {
          err = new PlainValue.YAMLSemanticError(lastItem, msg);
          if (lastItem.range && lastItem.range.end) err.offset = lastItem.range.end - lastItem.range.start;
        }
        errors.push(err);
      }
    }
    function checkFlowCommentSpace(errors, comment) {
      const prev = comment.context.src[comment.range.start - 1];
      if (prev !== '\n' && prev !== '	' && prev !== ' ') {
        const msg = 'Comments must be separated from other tokens by white space characters';
        errors.push(new PlainValue.YAMLSemanticError(comment, msg));
      }
    }
    function getLongKeyError(source, key) {
      const sk = String(key);
      const k = sk.substr(0, 8) + '...' + sk.substr(-8);
      return new PlainValue.YAMLSemanticError(source, `The "${k}" key is too long`);
    }
    function resolveComments(collection, comments) {
      for (const { afterKey, before, comment } of comments) {
        let item = collection.items[before];
        if (!item) {
          if (comment !== void 0) {
            if (collection.comment) collection.comment += '\n' + comment;
            else collection.comment = comment;
          }
        } else {
          if (afterKey && item.value) item = item.value;
          if (comment === void 0) {
            if (afterKey || !item.commentBefore) item.spaceBefore = true;
          } else {
            if (item.commentBefore) item.commentBefore += '\n' + comment;
            else item.commentBefore = comment;
          }
        }
      }
    }
    function resolveString(doc, node) {
      const res = node.strValue;
      if (!res) return '';
      if (typeof res === 'string') return res;
      res.errors.forEach(error => {
        if (!error.source) error.source = node;
        doc.errors.push(error);
      });
      return res.str;
    }
    function resolveTagHandle(doc, node) {
      const { handle, suffix } = node.tag;
      let prefix = doc.tagPrefixes.find(p => p.handle === handle);
      if (!prefix) {
        const dtp = doc.getDefaults().tagPrefixes;
        if (dtp) prefix = dtp.find(p => p.handle === handle);
        if (!prefix) throw new PlainValue.YAMLSemanticError(node, `The ${handle} tag handle is non-default and was not declared.`);
      }
      if (!suffix) throw new PlainValue.YAMLSemanticError(node, `The ${handle} tag has no suffix.`);
      if (handle === '!' && (doc.version || doc.options.version) === '1.0') {
        if (suffix[0] === '^') {
          doc.warnings.push(new PlainValue.YAMLWarning(node, 'YAML 1.0 ^ tag expansion is not supported'));
          return suffix;
        }
        if (/[:/]/.test(suffix)) {
          const vocab = suffix.match(/^([a-z0-9-]+)\/(.*)/i);
          return vocab ? `tag:${vocab[1]}.yaml.org,2002:${vocab[2]}` : `tag:${suffix}`;
        }
      }
      return prefix.prefix + decodeURIComponent(suffix);
    }
    function resolveTagName(doc, node) {
      const { tag, type } = node;
      let nonSpecific = false;
      if (tag) {
        const { handle, suffix, verbatim } = tag;
        if (verbatim) {
          if (verbatim !== '!' && verbatim !== '!!') return verbatim;
          const msg = `Verbatim tags aren't resolved, so ${verbatim} is invalid.`;
          doc.errors.push(new PlainValue.YAMLSemanticError(node, msg));
        } else if (handle === '!' && !suffix) {
          nonSpecific = true;
        } else {
          try {
            return resolveTagHandle(doc, node);
          } catch (error) {
            doc.errors.push(error);
          }
        }
      }
      switch (type) {
        case PlainValue.Type.BLOCK_FOLDED:
        case PlainValue.Type.BLOCK_LITERAL:
        case PlainValue.Type.QUOTE_DOUBLE:
        case PlainValue.Type.QUOTE_SINGLE:
          return PlainValue.defaultTags.STR;
        case PlainValue.Type.FLOW_MAP:
        case PlainValue.Type.MAP:
          return PlainValue.defaultTags.MAP;
        case PlainValue.Type.FLOW_SEQ:
        case PlainValue.Type.SEQ:
          return PlainValue.defaultTags.SEQ;
        case PlainValue.Type.PLAIN:
          return nonSpecific ? PlainValue.defaultTags.STR : null;
        default:
          return null;
      }
    }
    function resolveByTagName(doc, node, tagName) {
      const { tags } = doc.schema;
      const matchWithTest = [];
      for (const tag of tags) {
        if (tag.tag === tagName) {
          if (tag.test) matchWithTest.push(tag);
          else {
            const res = tag.resolve(doc, node);
            return res instanceof Collection ? res : new Scalar(res);
          }
        }
      }
      const str = resolveString(doc, node);
      if (typeof str === 'string' && matchWithTest.length > 0) return resolveScalar(str, matchWithTest, tags.scalarFallback);
      return null;
    }
    function getFallbackTagName({ type }) {
      switch (type) {
        case PlainValue.Type.FLOW_MAP:
        case PlainValue.Type.MAP:
          return PlainValue.defaultTags.MAP;
        case PlainValue.Type.FLOW_SEQ:
        case PlainValue.Type.SEQ:
          return PlainValue.defaultTags.SEQ;
        default:
          return PlainValue.defaultTags.STR;
      }
    }
    function resolveTag(doc, node, tagName) {
      try {
        const res = resolveByTagName(doc, node, tagName);
        if (res) {
          if (tagName && node.tag) res.tag = tagName;
          return res;
        }
      } catch (error) {
        if (!error.source) error.source = node;
        doc.errors.push(error);
        return null;
      }
      try {
        const fallback = getFallbackTagName(node);
        if (!fallback) throw new Error(`The tag ${tagName} is unavailable`);
        const msg = `The tag ${tagName} is unavailable, falling back to ${fallback}`;
        doc.warnings.push(new PlainValue.YAMLWarning(node, msg));
        const res = resolveByTagName(doc, node, fallback);
        res.tag = tagName;
        return res;
      } catch (error) {
        const refError = new PlainValue.YAMLReferenceError(node, error.message);
        refError.stack = error.stack;
        doc.errors.push(refError);
        return null;
      }
    }
    var isCollectionItem = node => {
      if (!node) return false;
      const { type } = node;
      return type === PlainValue.Type.MAP_KEY || type === PlainValue.Type.MAP_VALUE || type === PlainValue.Type.SEQ_ITEM;
    };
    function resolveNodeProps(errors, node) {
      const comments = {
        before: [],
        after: []
      };
      let hasAnchor = false;
      let hasTag = false;
      const props = isCollectionItem(node.context.parent) ? node.context.parent.props.concat(node.props) : node.props;
      for (const { start, end } of props) {
        switch (node.context.src[start]) {
          case PlainValue.Char.COMMENT: {
            if (!node.commentHasRequiredWhitespace(start)) {
              const msg = 'Comments must be separated from other tokens by white space characters';
              errors.push(new PlainValue.YAMLSemanticError(node, msg));
            }
            const { header, valueRange } = node;
            const cc = valueRange && (start > valueRange.start || (header && start > header.start)) ? comments.after : comments.before;
            cc.push(node.context.src.slice(start + 1, end));
            break;
          }
          case PlainValue.Char.ANCHOR:
            if (hasAnchor) {
              const msg = 'A node can have at most one anchor';
              errors.push(new PlainValue.YAMLSemanticError(node, msg));
            }
            hasAnchor = true;
            break;
          case PlainValue.Char.TAG:
            if (hasTag) {
              const msg = 'A node can have at most one tag';
              errors.push(new PlainValue.YAMLSemanticError(node, msg));
            }
            hasTag = true;
            break;
        }
      }
      return {
        comments,
        hasAnchor,
        hasTag
      };
    }
    function resolveNodeValue(doc, node) {
      const { anchors, errors, schema } = doc;
      if (node.type === PlainValue.Type.ALIAS) {
        const name = node.rawValue;
        const src = anchors.getNode(name);
        if (!src) {
          const msg = `Aliased anchor not found: ${name}`;
          errors.push(new PlainValue.YAMLReferenceError(node, msg));
          return null;
        }
        const res = new Alias(src);
        anchors._cstAliases.push(res);
        return res;
      }
      const tagName = resolveTagName(doc, node);
      if (tagName) return resolveTag(doc, node, tagName);
      if (node.type !== PlainValue.Type.PLAIN) {
        const msg = `Failed to resolve ${node.type} node here`;
        errors.push(new PlainValue.YAMLSyntaxError(node, msg));
        return null;
      }
      try {
        const str = resolveString(doc, node);
        return resolveScalar(str, schema.tags, schema.tags.scalarFallback);
      } catch (error) {
        if (!error.source) error.source = node;
        errors.push(error);
        return null;
      }
    }
    function resolveNode(doc, node) {
      if (!node) return null;
      if (node.error) doc.errors.push(node.error);
      const { comments, hasAnchor, hasTag } = resolveNodeProps(doc.errors, node);
      if (hasAnchor) {
        const { anchors } = doc;
        const name = node.anchor;
        const prev = anchors.getNode(name);
        if (prev) anchors.map[anchors.newName(name)] = prev;
        anchors.map[name] = node;
      }
      if (node.type === PlainValue.Type.ALIAS && (hasAnchor || hasTag)) {
        const msg = 'An alias node must not specify any properties';
        doc.errors.push(new PlainValue.YAMLSemanticError(node, msg));
      }
      const res = resolveNodeValue(doc, node);
      if (res) {
        res.range = [node.range.start, node.range.end];
        if (doc.options.keepCstNodes) res.cstNode = node;
        if (doc.options.keepNodeTypes) res.type = node.type;
        const cb = comments.before.join('\n');
        if (cb) {
          res.commentBefore = res.commentBefore
            ? `${res.commentBefore}
${cb}`
            : cb;
        }
        const ca = comments.after.join('\n');
        if (ca)
          res.comment = res.comment
            ? `${res.comment}
${ca}`
            : ca;
      }
      return (node.resolved = res);
    }
    function resolveMap(doc, cst) {
      if (cst.type !== PlainValue.Type.MAP && cst.type !== PlainValue.Type.FLOW_MAP) {
        const msg = `A ${cst.type} node cannot be resolved as a mapping`;
        doc.errors.push(new PlainValue.YAMLSyntaxError(cst, msg));
        return null;
      }
      const { comments, items } = cst.type === PlainValue.Type.FLOW_MAP ? resolveFlowMapItems(doc, cst) : resolveBlockMapItems(doc, cst);
      const map = new YAMLMap();
      map.items = items;
      resolveComments(map, comments);
      let hasCollectionKey = false;
      for (let i = 0; i < items.length; ++i) {
        const { key: iKey } = items[i];
        if (iKey instanceof Collection) hasCollectionKey = true;
        if (doc.schema.merge && iKey && iKey.value === MERGE_KEY) {
          items[i] = new Merge(items[i]);
          const sources = items[i].value.items;
          let error = null;
          sources.some(node => {
            if (node instanceof Alias) {
              const { type } = node.source;
              if (type === PlainValue.Type.MAP || type === PlainValue.Type.FLOW_MAP) return false;
              return (error = 'Merge nodes aliases can only point to maps');
            }
            return (error = 'Merge nodes can only have Alias nodes as values');
          });
          if (error) doc.errors.push(new PlainValue.YAMLSemanticError(cst, error));
        } else {
          for (let j = i + 1; j < items.length; ++j) {
            const { key: jKey } = items[j];
            if (iKey === jKey || (iKey && jKey && Object.prototype.hasOwnProperty.call(iKey, 'value') && iKey.value === jKey.value)) {
              const msg = `Map keys must be unique; "${iKey}" is repeated`;
              doc.errors.push(new PlainValue.YAMLSemanticError(cst, msg));
              break;
            }
          }
        }
      }
      if (hasCollectionKey && !doc.options.mapAsMap) {
        const warn = 'Keys with collection values will be stringified as YAML due to JS Object restrictions. Use mapAsMap: true to avoid this.';
        doc.warnings.push(new PlainValue.YAMLWarning(cst, warn));
      }
      cst.resolved = map;
      return map;
    }
    var valueHasPairComment = ({ context: { lineStart, node, src }, props }) => {
      if (props.length === 0) return false;
      const { start } = props[0];
      if (node && start > node.valueRange.start) return false;
      if (src[start] !== PlainValue.Char.COMMENT) return false;
      for (let i = lineStart; i < start; ++i) if (src[i] === '\n') return false;
      return true;
    };
    function resolvePairComment(item, pair) {
      if (!valueHasPairComment(item)) return;
      const comment = item.getPropValue(0, PlainValue.Char.COMMENT, true);
      let found = false;
      const cb = pair.value.commentBefore;
      if (cb && cb.startsWith(comment)) {
        pair.value.commentBefore = cb.substr(comment.length + 1);
        found = true;
      } else {
        const cc = pair.value.comment;
        if (!item.node && cc && cc.startsWith(comment)) {
          pair.value.comment = cc.substr(comment.length + 1);
          found = true;
        }
      }
      if (found) pair.comment = comment;
    }
    function resolveBlockMapItems(doc, cst) {
      const comments = [];
      const items = [];
      let key = void 0;
      let keyStart = null;
      for (let i = 0; i < cst.items.length; ++i) {
        const item = cst.items[i];
        switch (item.type) {
          case PlainValue.Type.BLANK_LINE:
            comments.push({
              afterKey: !!key,
              before: items.length
            });
            break;
          case PlainValue.Type.COMMENT:
            comments.push({
              afterKey: !!key,
              before: items.length,
              comment: item.comment
            });
            break;
          case PlainValue.Type.MAP_KEY:
            if (key !== void 0) items.push(new Pair(key));
            if (item.error) doc.errors.push(item.error);
            key = resolveNode(doc, item.node);
            keyStart = null;
            break;
          case PlainValue.Type.MAP_VALUE:
            {
              if (key === void 0) key = null;
              if (item.error) doc.errors.push(item.error);
              if (!item.context.atLineStart && item.node && item.node.type === PlainValue.Type.MAP && !item.node.context.atLineStart) {
                const msg = 'Nested mappings are not allowed in compact mappings';
                doc.errors.push(new PlainValue.YAMLSemanticError(item.node, msg));
              }
              let valueNode = item.node;
              if (!valueNode && item.props.length > 0) {
                valueNode = new PlainValue.PlainValue(PlainValue.Type.PLAIN, []);
                valueNode.context = {
                  parent: item,
                  src: item.context.src
                };
                const pos = item.range.start + 1;
                valueNode.range = {
                  start: pos,
                  end: pos
                };
                valueNode.valueRange = {
                  start: pos,
                  end: pos
                };
                if (typeof item.range.origStart === 'number') {
                  const origPos = item.range.origStart + 1;
                  valueNode.range.origStart = valueNode.range.origEnd = origPos;
                  valueNode.valueRange.origStart = valueNode.valueRange.origEnd = origPos;
                }
              }
              const pair = new Pair(key, resolveNode(doc, valueNode));
              resolvePairComment(item, pair);
              items.push(pair);
              if (key && typeof keyStart === 'number') {
                if (item.range.start > keyStart + 1024) doc.errors.push(getLongKeyError(cst, key));
              }
              key = void 0;
              keyStart = null;
            }
            break;
          default:
            if (key !== void 0) items.push(new Pair(key));
            key = resolveNode(doc, item);
            keyStart = item.range.start;
            if (item.error) doc.errors.push(item.error);
            next: for (let j = i + 1; ; ++j) {
              const nextItem = cst.items[j];
              switch (nextItem && nextItem.type) {
                case PlainValue.Type.BLANK_LINE:
                case PlainValue.Type.COMMENT:
                  continue next;
                case PlainValue.Type.MAP_VALUE:
                  break next;
                default: {
                  const msg = 'Implicit map keys need to be followed by map values';
                  doc.errors.push(new PlainValue.YAMLSemanticError(item, msg));
                  break next;
                }
              }
            }
            if (item.valueRangeContainsNewline) {
              const msg = 'Implicit map keys need to be on a single line';
              doc.errors.push(new PlainValue.YAMLSemanticError(item, msg));
            }
        }
      }
      if (key !== void 0) items.push(new Pair(key));
      return {
        comments,
        items
      };
    }
    function resolveFlowMapItems(doc, cst) {
      const comments = [];
      const items = [];
      let key = void 0;
      let explicitKey = false;
      let next = '{';
      for (let i = 0; i < cst.items.length; ++i) {
        const item = cst.items[i];
        if (typeof item.char === 'string') {
          const { char, offset } = item;
          if (char === '?' && key === void 0 && !explicitKey) {
            explicitKey = true;
            next = ':';
            continue;
          }
          if (char === ':') {
            if (key === void 0) key = null;
            if (next === ':') {
              next = ',';
              continue;
            }
          } else {
            if (explicitKey) {
              if (key === void 0 && char !== ',') key = null;
              explicitKey = false;
            }
            if (key !== void 0) {
              items.push(new Pair(key));
              key = void 0;
              if (char === ',') {
                next = ':';
                continue;
              }
            }
          }
          if (char === '}') {
            if (i === cst.items.length - 1) continue;
          } else if (char === next) {
            next = ':';
            continue;
          }
          const msg = `Flow map contains an unexpected ${char}`;
          const err = new PlainValue.YAMLSyntaxError(cst, msg);
          err.offset = offset;
          doc.errors.push(err);
        } else if (item.type === PlainValue.Type.BLANK_LINE) {
          comments.push({
            afterKey: !!key,
            before: items.length
          });
        } else if (item.type === PlainValue.Type.COMMENT) {
          checkFlowCommentSpace(doc.errors, item);
          comments.push({
            afterKey: !!key,
            before: items.length,
            comment: item.comment
          });
        } else if (key === void 0) {
          if (next === ',') doc.errors.push(new PlainValue.YAMLSemanticError(item, 'Separator , missing in flow map'));
          key = resolveNode(doc, item);
        } else {
          if (next !== ',') doc.errors.push(new PlainValue.YAMLSemanticError(item, 'Indicator : missing in flow map entry'));
          items.push(new Pair(key, resolveNode(doc, item)));
          key = void 0;
          explicitKey = false;
        }
      }
      checkFlowCollectionEnd(doc.errors, cst);
      if (key !== void 0) items.push(new Pair(key));
      return {
        comments,
        items
      };
    }
    function resolveSeq(doc, cst) {
      if (cst.type !== PlainValue.Type.SEQ && cst.type !== PlainValue.Type.FLOW_SEQ) {
        const msg = `A ${cst.type} node cannot be resolved as a sequence`;
        doc.errors.push(new PlainValue.YAMLSyntaxError(cst, msg));
        return null;
      }
      const { comments, items } = cst.type === PlainValue.Type.FLOW_SEQ ? resolveFlowSeqItems(doc, cst) : resolveBlockSeqItems(doc, cst);
      const seq = new YAMLSeq();
      seq.items = items;
      resolveComments(seq, comments);
      if (!doc.options.mapAsMap && items.some(it => it instanceof Pair && it.key instanceof Collection)) {
        const warn = 'Keys with collection values will be stringified as YAML due to JS Object restrictions. Use mapAsMap: true to avoid this.';
        doc.warnings.push(new PlainValue.YAMLWarning(cst, warn));
      }
      cst.resolved = seq;
      return seq;
    }
    function resolveBlockSeqItems(doc, cst) {
      const comments = [];
      const items = [];
      for (let i = 0; i < cst.items.length; ++i) {
        const item = cst.items[i];
        switch (item.type) {
          case PlainValue.Type.BLANK_LINE:
            comments.push({
              before: items.length
            });
            break;
          case PlainValue.Type.COMMENT:
            comments.push({
              comment: item.comment,
              before: items.length
            });
            break;
          case PlainValue.Type.SEQ_ITEM:
            if (item.error) doc.errors.push(item.error);
            items.push(resolveNode(doc, item.node));
            if (item.hasProps) {
              const msg = 'Sequence items cannot have tags or anchors before the - indicator';
              doc.errors.push(new PlainValue.YAMLSemanticError(item, msg));
            }
            break;
          default:
            if (item.error) doc.errors.push(item.error);
            doc.errors.push(new PlainValue.YAMLSyntaxError(item, `Unexpected ${item.type} node in sequence`));
        }
      }
      return {
        comments,
        items
      };
    }
    function resolveFlowSeqItems(doc, cst) {
      const comments = [];
      const items = [];
      let explicitKey = false;
      let key = void 0;
      let keyStart = null;
      let next = '[';
      let prevItem = null;
      for (let i = 0; i < cst.items.length; ++i) {
        const item = cst.items[i];
        if (typeof item.char === 'string') {
          const { char, offset } = item;
          if (char !== ':' && (explicitKey || key !== void 0)) {
            if (explicitKey && key === void 0) key = next ? items.pop() : null;
            items.push(new Pair(key));
            explicitKey = false;
            key = void 0;
            keyStart = null;
          }
          if (char === next) {
            next = null;
          } else if (!next && char === '?') {
            explicitKey = true;
          } else if (next !== '[' && char === ':' && key === void 0) {
            if (next === ',') {
              key = items.pop();
              if (key instanceof Pair) {
                const msg = 'Chaining flow sequence pairs is invalid';
                const err = new PlainValue.YAMLSemanticError(cst, msg);
                err.offset = offset;
                doc.errors.push(err);
              }
              if (!explicitKey && typeof keyStart === 'number') {
                const keyEnd = item.range ? item.range.start : item.offset;
                if (keyEnd > keyStart + 1024) doc.errors.push(getLongKeyError(cst, key));
                const { src } = prevItem.context;
                for (let i2 = keyStart; i2 < keyEnd; ++i2)
                  if (src[i2] === '\n') {
                    const msg = 'Implicit keys of flow sequence pairs need to be on a single line';
                    doc.errors.push(new PlainValue.YAMLSemanticError(prevItem, msg));
                    break;
                  }
              }
            } else {
              key = null;
            }
            keyStart = null;
            explicitKey = false;
            next = null;
          } else if (next === '[' || char !== ']' || i < cst.items.length - 1) {
            const msg = `Flow sequence contains an unexpected ${char}`;
            const err = new PlainValue.YAMLSyntaxError(cst, msg);
            err.offset = offset;
            doc.errors.push(err);
          }
        } else if (item.type === PlainValue.Type.BLANK_LINE) {
          comments.push({
            before: items.length
          });
        } else if (item.type === PlainValue.Type.COMMENT) {
          checkFlowCommentSpace(doc.errors, item);
          comments.push({
            comment: item.comment,
            before: items.length
          });
        } else {
          if (next) {
            const msg = `Expected a ${next} in flow sequence`;
            doc.errors.push(new PlainValue.YAMLSemanticError(item, msg));
          }
          const value = resolveNode(doc, item);
          if (key === void 0) {
            items.push(value);
            prevItem = item;
          } else {
            items.push(new Pair(key, value));
            key = void 0;
          }
          keyStart = item.range.start;
          next = ',';
        }
      }
      checkFlowCollectionEnd(doc.errors, cst);
      if (key !== void 0) items.push(new Pair(key));
      return {
        comments,
        items
      };
    }
    exports2.Alias = Alias;
    exports2.Collection = Collection;
    exports2.Merge = Merge;
    exports2.Node = Node;
    exports2.Pair = Pair;
    exports2.Scalar = Scalar;
    exports2.YAMLMap = YAMLMap;
    exports2.YAMLSeq = YAMLSeq;
    exports2.addComment = addComment;
    exports2.binaryOptions = binaryOptions;
    exports2.boolOptions = boolOptions;
    exports2.findPair = findPair;
    exports2.intOptions = intOptions;
    exports2.isEmptyPath = isEmptyPath;
    exports2.nullOptions = nullOptions;
    exports2.resolveMap = resolveMap;
    exports2.resolveNode = resolveNode;
    exports2.resolveSeq = resolveSeq;
    exports2.resolveString = resolveString;
    exports2.strOptions = strOptions;
    exports2.stringifyNumber = stringifyNumber;
    exports2.stringifyString = stringifyString;
    exports2.toJSON = toJSON;
  }
});

// node_modules/yaml/dist/warnings-1000a372.js
var require_warnings_1000a372 = __commonJS({
  'node_modules/yaml/dist/warnings-1000a372.js'(exports2) {
    'use strict';
    var PlainValue = require_PlainValue_ec8e588e();
    var resolveSeq = require_resolveSeq_d03cb037();
    var binary = {
      identify: value => value instanceof Uint8Array,
      default: false,
      tag: 'tag:yaml.org,2002:binary',
      resolve: (doc, node) => {
        const src = resolveSeq.resolveString(doc, node);
        if (typeof Buffer === 'function') {
          return Buffer.from(src, 'base64');
        } else if (typeof atob === 'function') {
          const str = atob(src.replace(/[\n\r]/g, ''));
          const buffer = new Uint8Array(str.length);
          for (let i = 0; i < str.length; ++i) buffer[i] = str.charCodeAt(i);
          return buffer;
        } else {
          const msg = 'This environment does not support reading binary tags; either Buffer or atob is required';
          doc.errors.push(new PlainValue.YAMLReferenceError(node, msg));
          return null;
        }
      },
      options: resolveSeq.binaryOptions,
      stringify: ({ comment, type, value }, ctx, onComment, onChompKeep) => {
        let src;
        if (typeof Buffer === 'function') {
          src = value instanceof Buffer ? value.toString('base64') : Buffer.from(value.buffer).toString('base64');
        } else if (typeof btoa === 'function') {
          let s = '';
          for (let i = 0; i < value.length; ++i) s += String.fromCharCode(value[i]);
          src = btoa(s);
        } else {
          throw new Error('This environment does not support writing binary tags; either Buffer or btoa is required');
        }
        if (!type) type = resolveSeq.binaryOptions.defaultType;
        if (type === PlainValue.Type.QUOTE_DOUBLE) {
          value = src;
        } else {
          const { lineWidth } = resolveSeq.binaryOptions;
          const n = Math.ceil(src.length / lineWidth);
          const lines = new Array(n);
          for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
            lines[i] = src.substr(o, lineWidth);
          }
          value = lines.join(type === PlainValue.Type.BLOCK_LITERAL ? '\n' : ' ');
        }
        return resolveSeq.stringifyString(
          {
            comment,
            type,
            value
          },
          ctx,
          onComment,
          onChompKeep
        );
      }
    };
    function parsePairs(doc, cst) {
      const seq = resolveSeq.resolveSeq(doc, cst);
      for (let i = 0; i < seq.items.length; ++i) {
        let item = seq.items[i];
        if (item instanceof resolveSeq.Pair) continue;
        else if (item instanceof resolveSeq.YAMLMap) {
          if (item.items.length > 1) {
            const msg = 'Each pair must have its own sequence indicator';
            throw new PlainValue.YAMLSemanticError(cst, msg);
          }
          const pair = item.items[0] || new resolveSeq.Pair();
          if (item.commentBefore)
            pair.commentBefore = pair.commentBefore
              ? `${item.commentBefore}
${pair.commentBefore}`
              : item.commentBefore;
          if (item.comment)
            pair.comment = pair.comment
              ? `${item.comment}
${pair.comment}`
              : item.comment;
          item = pair;
        }
        seq.items[i] = item instanceof resolveSeq.Pair ? item : new resolveSeq.Pair(item);
      }
      return seq;
    }
    function createPairs(schema, iterable, ctx) {
      const pairs2 = new resolveSeq.YAMLSeq(schema);
      pairs2.tag = 'tag:yaml.org,2002:pairs';
      for (const it of iterable) {
        let key, value;
        if (Array.isArray(it)) {
          if (it.length === 2) {
            key = it[0];
            value = it[1];
          } else throw new TypeError(`Expected [key, value] tuple: ${it}`);
        } else if (it && it instanceof Object) {
          const keys = Object.keys(it);
          if (keys.length === 1) {
            key = keys[0];
            value = it[key];
          } else throw new TypeError(`Expected { key: value } tuple: ${it}`);
        } else {
          key = it;
        }
        const pair = schema.createPair(key, value, ctx);
        pairs2.items.push(pair);
      }
      return pairs2;
    }
    var pairs = {
      default: false,
      tag: 'tag:yaml.org,2002:pairs',
      resolve: parsePairs,
      createNode: createPairs
    };
    var YAMLOMap = class extends resolveSeq.YAMLSeq {
      constructor() {
        super();
        PlainValue._defineProperty(this, 'add', resolveSeq.YAMLMap.prototype.add.bind(this));
        PlainValue._defineProperty(this, 'delete', resolveSeq.YAMLMap.prototype.delete.bind(this));
        PlainValue._defineProperty(this, 'get', resolveSeq.YAMLMap.prototype.get.bind(this));
        PlainValue._defineProperty(this, 'has', resolveSeq.YAMLMap.prototype.has.bind(this));
        PlainValue._defineProperty(this, 'set', resolveSeq.YAMLMap.prototype.set.bind(this));
        this.tag = YAMLOMap.tag;
      }
      toJSON(_, ctx) {
        const map = new Map();
        if (ctx && ctx.onCreate) ctx.onCreate(map);
        for (const pair of this.items) {
          let key, value;
          if (pair instanceof resolveSeq.Pair) {
            key = resolveSeq.toJSON(pair.key, '', ctx);
            value = resolveSeq.toJSON(pair.value, key, ctx);
          } else {
            key = resolveSeq.toJSON(pair, '', ctx);
          }
          if (map.has(key)) throw new Error('Ordered maps must not include duplicate keys');
          map.set(key, value);
        }
        return map;
      }
    };
    PlainValue._defineProperty(YAMLOMap, 'tag', 'tag:yaml.org,2002:omap');
    function parseOMap(doc, cst) {
      const pairs2 = parsePairs(doc, cst);
      const seenKeys = [];
      for (const { key } of pairs2.items) {
        if (key instanceof resolveSeq.Scalar) {
          if (seenKeys.includes(key.value)) {
            const msg = 'Ordered maps must not include duplicate keys';
            throw new PlainValue.YAMLSemanticError(cst, msg);
          } else {
            seenKeys.push(key.value);
          }
        }
      }
      return Object.assign(new YAMLOMap(), pairs2);
    }
    function createOMap(schema, iterable, ctx) {
      const pairs2 = createPairs(schema, iterable, ctx);
      const omap2 = new YAMLOMap();
      omap2.items = pairs2.items;
      return omap2;
    }
    var omap = {
      identify: value => value instanceof Map,
      nodeClass: YAMLOMap,
      default: false,
      tag: 'tag:yaml.org,2002:omap',
      resolve: parseOMap,
      createNode: createOMap
    };
    var YAMLSet = class extends resolveSeq.YAMLMap {
      constructor() {
        super();
        this.tag = YAMLSet.tag;
      }
      add(key) {
        const pair = key instanceof resolveSeq.Pair ? key : new resolveSeq.Pair(key);
        const prev = resolveSeq.findPair(this.items, pair.key);
        if (!prev) this.items.push(pair);
      }
      get(key, keepPair) {
        const pair = resolveSeq.findPair(this.items, key);
        return !keepPair && pair instanceof resolveSeq.Pair ? (pair.key instanceof resolveSeq.Scalar ? pair.key.value : pair.key) : pair;
      }
      set(key, value) {
        if (typeof value !== 'boolean') throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
        const prev = resolveSeq.findPair(this.items, key);
        if (prev && !value) {
          this.items.splice(this.items.indexOf(prev), 1);
        } else if (!prev && value) {
          this.items.push(new resolveSeq.Pair(key));
        }
      }
      toJSON(_, ctx) {
        return super.toJSON(_, ctx, Set);
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx) return JSON.stringify(this);
        if (this.hasAllNullValues()) return super.toString(ctx, onComment, onChompKeep);
        else throw new Error('Set items must all have null values');
      }
    };
    PlainValue._defineProperty(YAMLSet, 'tag', 'tag:yaml.org,2002:set');
    function parseSet(doc, cst) {
      const map = resolveSeq.resolveMap(doc, cst);
      if (!map.hasAllNullValues()) throw new PlainValue.YAMLSemanticError(cst, 'Set items must all have null values');
      return Object.assign(new YAMLSet(), map);
    }
    function createSet(schema, iterable, ctx) {
      const set2 = new YAMLSet();
      for (const value of iterable) set2.items.push(schema.createPair(value, null, ctx));
      return set2;
    }
    var set = {
      identify: value => value instanceof Set,
      nodeClass: YAMLSet,
      default: false,
      tag: 'tag:yaml.org,2002:set',
      resolve: parseSet,
      createNode: createSet
    };
    var parseSexagesimal = (sign, parts) => {
      const n = parts.split(':').reduce((n2, p) => n2 * 60 + Number(p), 0);
      return sign === '-' ? -n : n;
    };
    var stringifySexagesimal = ({ value }) => {
      if (isNaN(value) || !isFinite(value)) return resolveSeq.stringifyNumber(value);
      let sign = '';
      if (value < 0) {
        sign = '-';
        value = Math.abs(value);
      }
      const parts = [value % 60];
      if (value < 60) {
        parts.unshift(0);
      } else {
        value = Math.round((value - parts[0]) / 60);
        parts.unshift(value % 60);
        if (value >= 60) {
          value = Math.round((value - parts[0]) / 60);
          parts.unshift(value);
        }
      }
      return (
        sign +
        parts
          .map(n => (n < 10 ? '0' + String(n) : String(n)))
          .join(':')
          .replace(/000000\d*$/, '')
      );
    };
    var intTime = {
      identify: value => typeof value === 'number',
      default: true,
      tag: 'tag:yaml.org,2002:int',
      format: 'TIME',
      test: /^([-+]?)([0-9][0-9_]*(?::[0-5]?[0-9])+)$/,
      resolve: (str, sign, parts) => parseSexagesimal(sign, parts.replace(/_/g, '')),
      stringify: stringifySexagesimal
    };
    var floatTime = {
      identify: value => typeof value === 'number',
      default: true,
      tag: 'tag:yaml.org,2002:float',
      format: 'TIME',
      test: /^([-+]?)([0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*)$/,
      resolve: (str, sign, parts) => parseSexagesimal(sign, parts.replace(/_/g, '')),
      stringify: stringifySexagesimal
    };
    var timestamp = {
      identify: value => value instanceof Date,
      default: true,
      tag: 'tag:yaml.org,2002:timestamp',
      test: RegExp(
        '^(?:([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?)$'
      ),
      resolve: (str, year, month, day, hour, minute, second, millisec, tz) => {
        if (millisec) millisec = (millisec + '00').substr(1, 3);
        let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec || 0);
        if (tz && tz !== 'Z') {
          let d = parseSexagesimal(tz[0], tz.slice(1));
          if (Math.abs(d) < 30) d *= 60;
          date -= 6e4 * d;
        }
        return new Date(date);
      },
      stringify: ({ value }) => value.toISOString().replace(/((T00:00)?:00)?\.000Z$/, '')
    };
    function shouldWarn(deprecation) {
      const env = (typeof process !== 'undefined' && process.env) || {};
      if (deprecation) {
        if (typeof YAML_SILENCE_DEPRECATION_WARNINGS !== 'undefined') return !YAML_SILENCE_DEPRECATION_WARNINGS;
        return !env.YAML_SILENCE_DEPRECATION_WARNINGS;
      }
      if (typeof YAML_SILENCE_WARNINGS !== 'undefined') return !YAML_SILENCE_WARNINGS;
      return !env.YAML_SILENCE_WARNINGS;
    }
    function warn(warning, type) {
      if (shouldWarn(false)) {
        const emit = typeof process !== 'undefined' && process.emitWarning;
        if (emit) emit(warning, type);
        else {
          console.warn(type ? `${type}: ${warning}` : warning);
        }
      }
    }
    function warnFileDeprecation(filename) {
      if (shouldWarn(true)) {
        const path = filename
          .replace(/.*yaml[/\\]/i, '')
          .replace(/\.js$/, '')
          .replace(/\\/g, '/');
        warn(`The endpoint 'yaml/${path}' will be removed in a future release.`, 'DeprecationWarning');
      }
    }
    var warned = {};
    function warnOptionDeprecation(name, alternative) {
      if (!warned[name] && shouldWarn(true)) {
        warned[name] = true;
        let msg = `The option '${name}' will be removed in a future release`;
        msg += alternative ? `, use '${alternative}' instead.` : '.';
        warn(msg, 'DeprecationWarning');
      }
    }
    exports2.binary = binary;
    exports2.floatTime = floatTime;
    exports2.intTime = intTime;
    exports2.omap = omap;
    exports2.pairs = pairs;
    exports2.set = set;
    exports2.timestamp = timestamp;
    exports2.warn = warn;
    exports2.warnFileDeprecation = warnFileDeprecation;
    exports2.warnOptionDeprecation = warnOptionDeprecation;
  }
});

// node_modules/yaml/dist/Schema-88e323a7.js
var require_Schema_88e323a7 = __commonJS({
  'node_modules/yaml/dist/Schema-88e323a7.js'(exports2) {
    'use strict';
    var PlainValue = require_PlainValue_ec8e588e();
    var resolveSeq = require_resolveSeq_d03cb037();
    var warnings = require_warnings_1000a372();
    function createMap(schema, obj, ctx) {
      const map2 = new resolveSeq.YAMLMap(schema);
      if (obj instanceof Map) {
        for (const [key, value] of obj) map2.items.push(schema.createPair(key, value, ctx));
      } else if (obj && typeof obj === 'object') {
        for (const key of Object.keys(obj)) map2.items.push(schema.createPair(key, obj[key], ctx));
      }
      if (typeof schema.sortMapEntries === 'function') {
        map2.items.sort(schema.sortMapEntries);
      }
      return map2;
    }
    var map = {
      createNode: createMap,
      default: true,
      nodeClass: resolveSeq.YAMLMap,
      tag: 'tag:yaml.org,2002:map',
      resolve: resolveSeq.resolveMap
    };
    function createSeq(schema, obj, ctx) {
      const seq2 = new resolveSeq.YAMLSeq(schema);
      if (obj && obj[Symbol.iterator]) {
        for (const it of obj) {
          const v = schema.createNode(it, ctx.wrapScalars, null, ctx);
          seq2.items.push(v);
        }
      }
      return seq2;
    }
    var seq = {
      createNode: createSeq,
      default: true,
      nodeClass: resolveSeq.YAMLSeq,
      tag: 'tag:yaml.org,2002:seq',
      resolve: resolveSeq.resolveSeq
    };
    var string = {
      identify: value => typeof value === 'string',
      default: true,
      tag: 'tag:yaml.org,2002:str',
      resolve: resolveSeq.resolveString,
      stringify(item, ctx, onComment, onChompKeep) {
        ctx = Object.assign(
          {
            actualString: true
          },
          ctx
        );
        return resolveSeq.stringifyString(item, ctx, onComment, onChompKeep);
      },
      options: resolveSeq.strOptions
    };
    var failsafe = [map, seq, string];
    var intIdentify$2 = value => typeof value === 'bigint' || Number.isInteger(value);
    var intResolve$1 = (src, part, radix) => (resolveSeq.intOptions.asBigInt ? BigInt(src) : parseInt(part, radix));
    function intStringify$1(node, radix, prefix) {
      const { value } = node;
      if (intIdentify$2(value) && value >= 0) return prefix + value.toString(radix);
      return resolveSeq.stringifyNumber(node);
    }
    var nullObj = {
      identify: value => value == null,
      createNode: (schema, value, ctx) => (ctx.wrapScalars ? new resolveSeq.Scalar(null) : null),
      default: true,
      tag: 'tag:yaml.org,2002:null',
      test: /^(?:~|[Nn]ull|NULL)?$/,
      resolve: () => null,
      options: resolveSeq.nullOptions,
      stringify: () => resolveSeq.nullOptions.nullStr
    };
    var boolObj = {
      identify: value => typeof value === 'boolean',
      default: true,
      tag: 'tag:yaml.org,2002:bool',
      test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
      resolve: str => str[0] === 't' || str[0] === 'T',
      options: resolveSeq.boolOptions,
      stringify: ({ value }) => (value ? resolveSeq.boolOptions.trueStr : resolveSeq.boolOptions.falseStr)
    };
    var octObj = {
      identify: value => intIdentify$2(value) && value >= 0,
      default: true,
      tag: 'tag:yaml.org,2002:int',
      format: 'OCT',
      test: /^0o([0-7]+)$/,
      resolve: (str, oct) => intResolve$1(str, oct, 8),
      options: resolveSeq.intOptions,
      stringify: node => intStringify$1(node, 8, '0o')
    };
    var intObj = {
      identify: intIdentify$2,
      default: true,
      tag: 'tag:yaml.org,2002:int',
      test: /^[-+]?[0-9]+$/,
      resolve: str => intResolve$1(str, str, 10),
      options: resolveSeq.intOptions,
      stringify: resolveSeq.stringifyNumber
    };
    var hexObj = {
      identify: value => intIdentify$2(value) && value >= 0,
      default: true,
      tag: 'tag:yaml.org,2002:int',
      format: 'HEX',
      test: /^0x([0-9a-fA-F]+)$/,
      resolve: (str, hex) => intResolve$1(str, hex, 16),
      options: resolveSeq.intOptions,
      stringify: node => intStringify$1(node, 16, '0x')
    };
    var nanObj = {
      identify: value => typeof value === 'number',
      default: true,
      tag: 'tag:yaml.org,2002:float',
      test: /^(?:[-+]?\.inf|(\.nan))$/i,
      resolve: (str, nan) => (nan ? NaN : str[0] === '-' ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY),
      stringify: resolveSeq.stringifyNumber
    };
    var expObj = {
      identify: value => typeof value === 'number',
      default: true,
      tag: 'tag:yaml.org,2002:float',
      format: 'EXP',
      test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
      resolve: str => parseFloat(str),
      stringify: ({ value }) => Number(value).toExponential()
    };
    var floatObj = {
      identify: value => typeof value === 'number',
      default: true,
      tag: 'tag:yaml.org,2002:float',
      test: /^[-+]?(?:\.([0-9]+)|[0-9]+\.([0-9]*))$/,
      resolve(str, frac1, frac2) {
        const frac = frac1 || frac2;
        const node = new resolveSeq.Scalar(parseFloat(str));
        if (frac && frac[frac.length - 1] === '0') node.minFractionDigits = frac.length;
        return node;
      },
      stringify: resolveSeq.stringifyNumber
    };
    var core2 = failsafe.concat([nullObj, boolObj, octObj, intObj, hexObj, nanObj, expObj, floatObj]);
    var intIdentify$1 = value => typeof value === 'bigint' || Number.isInteger(value);
    var stringifyJSON = ({ value }) => JSON.stringify(value);
    var json = [
      map,
      seq,
      {
        identify: value => typeof value === 'string',
        default: true,
        tag: 'tag:yaml.org,2002:str',
        resolve: resolveSeq.resolveString,
        stringify: stringifyJSON
      },
      {
        identify: value => value == null,
        createNode: (schema, value, ctx) => (ctx.wrapScalars ? new resolveSeq.Scalar(null) : null),
        default: true,
        tag: 'tag:yaml.org,2002:null',
        test: /^null$/,
        resolve: () => null,
        stringify: stringifyJSON
      },
      {
        identify: value => typeof value === 'boolean',
        default: true,
        tag: 'tag:yaml.org,2002:bool',
        test: /^true|false$/,
        resolve: str => str === 'true',
        stringify: stringifyJSON
      },
      {
        identify: intIdentify$1,
        default: true,
        tag: 'tag:yaml.org,2002:int',
        test: /^-?(?:0|[1-9][0-9]*)$/,
        resolve: str => (resolveSeq.intOptions.asBigInt ? BigInt(str) : parseInt(str, 10)),
        stringify: ({ value }) => (intIdentify$1(value) ? value.toString() : JSON.stringify(value))
      },
      {
        identify: value => typeof value === 'number',
        default: true,
        tag: 'tag:yaml.org,2002:float',
        test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
        resolve: str => parseFloat(str),
        stringify: stringifyJSON
      }
    ];
    json.scalarFallback = str => {
      throw new SyntaxError(`Unresolved plain scalar ${JSON.stringify(str)}`);
    };
    var boolStringify = ({ value }) => (value ? resolveSeq.boolOptions.trueStr : resolveSeq.boolOptions.falseStr);
    var intIdentify = value => typeof value === 'bigint' || Number.isInteger(value);
    function intResolve(sign, src, radix) {
      let str = src.replace(/_/g, '');
      if (resolveSeq.intOptions.asBigInt) {
        switch (radix) {
          case 2:
            str = `0b${str}`;
            break;
          case 8:
            str = `0o${str}`;
            break;
          case 16:
            str = `0x${str}`;
            break;
        }
        const n2 = BigInt(str);
        return sign === '-' ? BigInt(-1) * n2 : n2;
      }
      const n = parseInt(str, radix);
      return sign === '-' ? -1 * n : n;
    }
    function intStringify(node, radix, prefix) {
      const { value } = node;
      if (intIdentify(value)) {
        const str = value.toString(radix);
        return value < 0 ? '-' + prefix + str.substr(1) : prefix + str;
      }
      return resolveSeq.stringifyNumber(node);
    }
    var yaml11 = failsafe.concat(
      [
        {
          identify: value => value == null,
          createNode: (schema, value, ctx) => (ctx.wrapScalars ? new resolveSeq.Scalar(null) : null),
          default: true,
          tag: 'tag:yaml.org,2002:null',
          test: /^(?:~|[Nn]ull|NULL)?$/,
          resolve: () => null,
          options: resolveSeq.nullOptions,
          stringify: () => resolveSeq.nullOptions.nullStr
        },
        {
          identify: value => typeof value === 'boolean',
          default: true,
          tag: 'tag:yaml.org,2002:bool',
          test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
          resolve: () => true,
          options: resolveSeq.boolOptions,
          stringify: boolStringify
        },
        {
          identify: value => typeof value === 'boolean',
          default: true,
          tag: 'tag:yaml.org,2002:bool',
          test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/i,
          resolve: () => false,
          options: resolveSeq.boolOptions,
          stringify: boolStringify
        },
        {
          identify: intIdentify,
          default: true,
          tag: 'tag:yaml.org,2002:int',
          format: 'BIN',
          test: /^([-+]?)0b([0-1_]+)$/,
          resolve: (str, sign, bin) => intResolve(sign, bin, 2),
          stringify: node => intStringify(node, 2, '0b')
        },
        {
          identify: intIdentify,
          default: true,
          tag: 'tag:yaml.org,2002:int',
          format: 'OCT',
          test: /^([-+]?)0([0-7_]+)$/,
          resolve: (str, sign, oct) => intResolve(sign, oct, 8),
          stringify: node => intStringify(node, 8, '0')
        },
        {
          identify: intIdentify,
          default: true,
          tag: 'tag:yaml.org,2002:int',
          test: /^([-+]?)([0-9][0-9_]*)$/,
          resolve: (str, sign, abs) => intResolve(sign, abs, 10),
          stringify: resolveSeq.stringifyNumber
        },
        {
          identify: intIdentify,
          default: true,
          tag: 'tag:yaml.org,2002:int',
          format: 'HEX',
          test: /^([-+]?)0x([0-9a-fA-F_]+)$/,
          resolve: (str, sign, hex) => intResolve(sign, hex, 16),
          stringify: node => intStringify(node, 16, '0x')
        },
        {
          identify: value => typeof value === 'number',
          default: true,
          tag: 'tag:yaml.org,2002:float',
          test: /^(?:[-+]?\.inf|(\.nan))$/i,
          resolve: (str, nan) => (nan ? NaN : str[0] === '-' ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY),
          stringify: resolveSeq.stringifyNumber
        },
        {
          identify: value => typeof value === 'number',
          default: true,
          tag: 'tag:yaml.org,2002:float',
          format: 'EXP',
          test: /^[-+]?([0-9][0-9_]*)?(\.[0-9_]*)?[eE][-+]?[0-9]+$/,
          resolve: str => parseFloat(str.replace(/_/g, '')),
          stringify: ({ value }) => Number(value).toExponential()
        },
        {
          identify: value => typeof value === 'number',
          default: true,
          tag: 'tag:yaml.org,2002:float',
          test: /^[-+]?(?:[0-9][0-9_]*)?\.([0-9_]*)$/,
          resolve(str, frac) {
            const node = new resolveSeq.Scalar(parseFloat(str.replace(/_/g, '')));
            if (frac) {
              const f = frac.replace(/_/g, '');
              if (f[f.length - 1] === '0') node.minFractionDigits = f.length;
            }
            return node;
          },
          stringify: resolveSeq.stringifyNumber
        }
      ],
      warnings.binary,
      warnings.omap,
      warnings.pairs,
      warnings.set,
      warnings.intTime,
      warnings.floatTime,
      warnings.timestamp
    );
    var schemas = {
      core: core2,
      failsafe,
      json,
      yaml11
    };
    var tags = {
      binary: warnings.binary,
      bool: boolObj,
      float: floatObj,
      floatExp: expObj,
      floatNaN: nanObj,
      floatTime: warnings.floatTime,
      int: intObj,
      intHex: hexObj,
      intOct: octObj,
      intTime: warnings.intTime,
      map,
      null: nullObj,
      omap: warnings.omap,
      pairs: warnings.pairs,
      seq,
      set: warnings.set,
      timestamp: warnings.timestamp
    };
    function findTagObject(value, tagName, tags2) {
      if (tagName) {
        const match = tags2.filter(t => t.tag === tagName);
        const tagObj = match.find(t => !t.format) || match[0];
        if (!tagObj) throw new Error(`Tag ${tagName} not found`);
        return tagObj;
      }
      return tags2.find(t => ((t.identify && t.identify(value)) || (t.class && value instanceof t.class)) && !t.format);
    }
    function createNode(value, tagName, ctx) {
      if (value instanceof resolveSeq.Node) return value;
      const { defaultPrefix, onTagObj, prevObjects, schema, wrapScalars } = ctx;
      if (tagName && tagName.startsWith('!!')) tagName = defaultPrefix + tagName.slice(2);
      let tagObj = findTagObject(value, tagName, schema.tags);
      if (!tagObj) {
        if (typeof value.toJSON === 'function') value = value.toJSON();
        if (!value || typeof value !== 'object') return wrapScalars ? new resolveSeq.Scalar(value) : value;
        tagObj = value instanceof Map ? map : value[Symbol.iterator] ? seq : map;
      }
      if (onTagObj) {
        onTagObj(tagObj);
        delete ctx.onTagObj;
      }
      const obj = {
        value: void 0,
        node: void 0
      };
      if (value && typeof value === 'object' && prevObjects) {
        const prev = prevObjects.get(value);
        if (prev) {
          const alias = new resolveSeq.Alias(prev);
          ctx.aliasNodes.push(alias);
          return alias;
        }
        obj.value = value;
        prevObjects.set(value, obj);
      }
      obj.node = tagObj.createNode ? tagObj.createNode(ctx.schema, value, ctx) : wrapScalars ? new resolveSeq.Scalar(value) : value;
      if (tagName && obj.node instanceof resolveSeq.Node) obj.node.tag = tagName;
      return obj.node;
    }
    function getSchemaTags(schemas2, knownTags, customTags, schemaId) {
      let tags2 = schemas2[schemaId.replace(/\W/g, '')];
      if (!tags2) {
        const keys = Object.keys(schemas2)
          .map(key => JSON.stringify(key))
          .join(', ');
        throw new Error(`Unknown schema "${schemaId}"; use one of ${keys}`);
      }
      if (Array.isArray(customTags)) {
        for (const tag of customTags) tags2 = tags2.concat(tag);
      } else if (typeof customTags === 'function') {
        tags2 = customTags(tags2.slice());
      }
      for (let i = 0; i < tags2.length; ++i) {
        const tag = tags2[i];
        if (typeof tag === 'string') {
          const tagObj = knownTags[tag];
          if (!tagObj) {
            const keys = Object.keys(knownTags)
              .map(key => JSON.stringify(key))
              .join(', ');
            throw new Error(`Unknown custom tag "${tag}"; use one of ${keys}`);
          }
          tags2[i] = tagObj;
        }
      }
      return tags2;
    }
    var sortMapEntriesByKey = (a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0);
    var Schema = class {
      constructor({ customTags, merge, schema, sortMapEntries, tags: deprecatedCustomTags }) {
        this.merge = !!merge;
        this.name = schema;
        this.sortMapEntries = sortMapEntries === true ? sortMapEntriesByKey : sortMapEntries || null;
        if (!customTags && deprecatedCustomTags) warnings.warnOptionDeprecation('tags', 'customTags');
        this.tags = getSchemaTags(schemas, tags, customTags || deprecatedCustomTags, schema);
      }
      createNode(value, wrapScalars, tagName, ctx) {
        const baseCtx = {
          defaultPrefix: Schema.defaultPrefix,
          schema: this,
          wrapScalars
        };
        const createCtx = ctx ? Object.assign(ctx, baseCtx) : baseCtx;
        return createNode(value, tagName, createCtx);
      }
      createPair(key, value, ctx) {
        if (!ctx)
          ctx = {
            wrapScalars: true
          };
        const k = this.createNode(key, ctx.wrapScalars, null, ctx);
        const v = this.createNode(value, ctx.wrapScalars, null, ctx);
        return new resolveSeq.Pair(k, v);
      }
    };
    PlainValue._defineProperty(Schema, 'defaultPrefix', PlainValue.defaultTagPrefix);
    PlainValue._defineProperty(Schema, 'defaultTags', PlainValue.defaultTags);
    exports2.Schema = Schema;
  }
});

// node_modules/yaml/dist/Document-9b4560a1.js
var require_Document_9b4560a1 = __commonJS({
  'node_modules/yaml/dist/Document-9b4560a1.js'(exports2) {
    'use strict';
    var PlainValue = require_PlainValue_ec8e588e();
    var resolveSeq = require_resolveSeq_d03cb037();
    var Schema = require_Schema_88e323a7();
    var defaultOptions = {
      anchorPrefix: 'a',
      customTags: null,
      indent: 2,
      indentSeq: true,
      keepCstNodes: false,
      keepNodeTypes: true,
      keepBlobsInJSON: true,
      mapAsMap: false,
      maxAliasCount: 100,
      prettyErrors: false,
      simpleKeys: false,
      version: '1.2'
    };
    var scalarOptions = {
      get binary() {
        return resolveSeq.binaryOptions;
      },
      set binary(opt) {
        Object.assign(resolveSeq.binaryOptions, opt);
      },
      get bool() {
        return resolveSeq.boolOptions;
      },
      set bool(opt) {
        Object.assign(resolveSeq.boolOptions, opt);
      },
      get int() {
        return resolveSeq.intOptions;
      },
      set int(opt) {
        Object.assign(resolveSeq.intOptions, opt);
      },
      get null() {
        return resolveSeq.nullOptions;
      },
      set null(opt) {
        Object.assign(resolveSeq.nullOptions, opt);
      },
      get str() {
        return resolveSeq.strOptions;
      },
      set str(opt) {
        Object.assign(resolveSeq.strOptions, opt);
      }
    };
    var documentOptions = {
      '1.0': {
        schema: 'yaml-1.1',
        merge: true,
        tagPrefixes: [
          {
            handle: '!',
            prefix: PlainValue.defaultTagPrefix
          },
          {
            handle: '!!',
            prefix: 'tag:private.yaml.org,2002:'
          }
        ]
      },
      1.1: {
        schema: 'yaml-1.1',
        merge: true,
        tagPrefixes: [
          {
            handle: '!',
            prefix: '!'
          },
          {
            handle: '!!',
            prefix: PlainValue.defaultTagPrefix
          }
        ]
      },
      1.2: {
        schema: 'core',
        merge: false,
        tagPrefixes: [
          {
            handle: '!',
            prefix: '!'
          },
          {
            handle: '!!',
            prefix: PlainValue.defaultTagPrefix
          }
        ]
      }
    };
    function stringifyTag(doc, tag) {
      if ((doc.version || doc.options.version) === '1.0') {
        const priv = tag.match(/^tag:private\.yaml\.org,2002:([^:/]+)$/);
        if (priv) return '!' + priv[1];
        const vocab = tag.match(/^tag:([a-zA-Z0-9-]+)\.yaml\.org,2002:(.*)/);
        return vocab ? `!${vocab[1]}/${vocab[2]}` : `!${tag.replace(/^tag:/, '')}`;
      }
      let p = doc.tagPrefixes.find(p2 => tag.indexOf(p2.prefix) === 0);
      if (!p) {
        const dtp = doc.getDefaults().tagPrefixes;
        p = dtp && dtp.find(p2 => tag.indexOf(p2.prefix) === 0);
      }
      if (!p) return tag[0] === '!' ? tag : `!<${tag}>`;
      const suffix = tag.substr(p.prefix.length).replace(
        /[!,[\]{}]/g,
        ch =>
          ({
            '!': '%21',
            ',': '%2C',
            '[': '%5B',
            ']': '%5D',
            '{': '%7B',
            '}': '%7D'
          }[ch])
      );
      return p.handle + suffix;
    }
    function getTagObject(tags, item) {
      if (item instanceof resolveSeq.Alias) return resolveSeq.Alias;
      if (item.tag) {
        const match = tags.filter(t => t.tag === item.tag);
        if (match.length > 0) return match.find(t => t.format === item.format) || match[0];
      }
      let tagObj, obj;
      if (item instanceof resolveSeq.Scalar) {
        obj = item.value;
        const match = tags.filter(t => (t.identify && t.identify(obj)) || (t.class && obj instanceof t.class));
        tagObj = match.find(t => t.format === item.format) || match.find(t => !t.format);
      } else {
        obj = item;
        tagObj = tags.find(t => t.nodeClass && obj instanceof t.nodeClass);
      }
      if (!tagObj) {
        const name = obj && obj.constructor ? obj.constructor.name : typeof obj;
        throw new Error(`Tag not resolved for ${name} value`);
      }
      return tagObj;
    }
    function stringifyProps(node, tagObj, { anchors, doc }) {
      const props = [];
      const anchor = doc.anchors.getName(node);
      if (anchor) {
        anchors[anchor] = node;
        props.push(`&${anchor}`);
      }
      if (node.tag) {
        props.push(stringifyTag(doc, node.tag));
      } else if (!tagObj.default) {
        props.push(stringifyTag(doc, tagObj.tag));
      }
      return props.join(' ');
    }
    function stringify(item, ctx, onComment, onChompKeep) {
      const { anchors, schema } = ctx.doc;
      let tagObj;
      if (!(item instanceof resolveSeq.Node)) {
        const createCtx = {
          aliasNodes: [],
          onTagObj: o => (tagObj = o),
          prevObjects: new Map()
        };
        item = schema.createNode(item, true, null, createCtx);
        for (const alias of createCtx.aliasNodes) {
          alias.source = alias.source.node;
          let name = anchors.getName(alias.source);
          if (!name) {
            name = anchors.newName();
            anchors.map[name] = alias.source;
          }
        }
      }
      if (item instanceof resolveSeq.Pair) return item.toString(ctx, onComment, onChompKeep);
      if (!tagObj) tagObj = getTagObject(schema.tags, item);
      const props = stringifyProps(item, tagObj, ctx);
      if (props.length > 0) ctx.indentAtStart = (ctx.indentAtStart || 0) + props.length + 1;
      const str =
        typeof tagObj.stringify === 'function'
          ? tagObj.stringify(item, ctx, onComment, onChompKeep)
          : item instanceof resolveSeq.Scalar
          ? resolveSeq.stringifyString(item, ctx, onComment, onChompKeep)
          : item.toString(ctx, onComment, onChompKeep);
      if (!props) return str;
      return item instanceof resolveSeq.Scalar || str[0] === '{' || str[0] === '['
        ? `${props} ${str}`
        : `${props}
${ctx.indent}${str}`;
    }
    var Anchors = class {
      static validAnchorNode(node) {
        return node instanceof resolveSeq.Scalar || node instanceof resolveSeq.YAMLSeq || node instanceof resolveSeq.YAMLMap;
      }
      constructor(prefix) {
        PlainValue._defineProperty(this, 'map', Object.create(null));
        this.prefix = prefix;
      }
      createAlias(node, name) {
        this.setAnchor(node, name);
        return new resolveSeq.Alias(node);
      }
      createMergePair(...sources) {
        const merge = new resolveSeq.Merge();
        merge.value.items = sources.map(s => {
          if (s instanceof resolveSeq.Alias) {
            if (s.source instanceof resolveSeq.YAMLMap) return s;
          } else if (s instanceof resolveSeq.YAMLMap) {
            return this.createAlias(s);
          }
          throw new Error('Merge sources must be Map nodes or their Aliases');
        });
        return merge;
      }
      getName(node) {
        const { map } = this;
        return Object.keys(map).find(a => map[a] === node);
      }
      getNames() {
        return Object.keys(this.map);
      }
      getNode(name) {
        return this.map[name];
      }
      newName(prefix) {
        if (!prefix) prefix = this.prefix;
        const names = Object.keys(this.map);
        for (let i = 1; true; ++i) {
          const name = `${prefix}${i}`;
          if (!names.includes(name)) return name;
        }
      }
      resolveNodes() {
        const { map, _cstAliases } = this;
        Object.keys(map).forEach(a => {
          map[a] = map[a].resolved;
        });
        _cstAliases.forEach(a => {
          a.source = a.source.resolved;
        });
        delete this._cstAliases;
      }
      setAnchor(node, name) {
        if (node != null && !Anchors.validAnchorNode(node)) {
          throw new Error('Anchors may only be set for Scalar, Seq and Map nodes');
        }
        if (name && /[\x00-\x19\s,[\]{}]/.test(name)) {
          throw new Error('Anchor names must not contain whitespace or control characters');
        }
        const { map } = this;
        const prev = node && Object.keys(map).find(a => map[a] === node);
        if (prev) {
          if (!name) {
            return prev;
          } else if (prev !== name) {
            delete map[prev];
            map[name] = node;
          }
        } else {
          if (!name) {
            if (!node) return null;
            name = this.newName();
          }
          map[name] = node;
        }
        return name;
      }
    };
    var visit = (node, tags) => {
      if (node && typeof node === 'object') {
        const { tag } = node;
        if (node instanceof resolveSeq.Collection) {
          if (tag) tags[tag] = true;
          node.items.forEach(n => visit(n, tags));
        } else if (node instanceof resolveSeq.Pair) {
          visit(node.key, tags);
          visit(node.value, tags);
        } else if (node instanceof resolveSeq.Scalar) {
          if (tag) tags[tag] = true;
        }
      }
      return tags;
    };
    var listTagNames = node => Object.keys(visit(node, {}));
    function parseContents(doc, contents) {
      const comments = {
        before: [],
        after: []
      };
      let body = void 0;
      let spaceBefore = false;
      for (const node of contents) {
        if (node.valueRange) {
          if (body !== void 0) {
            const msg = 'Document contains trailing content not separated by a ... or --- line';
            doc.errors.push(new PlainValue.YAMLSyntaxError(node, msg));
            break;
          }
          const res = resolveSeq.resolveNode(doc, node);
          if (spaceBefore) {
            res.spaceBefore = true;
            spaceBefore = false;
          }
          body = res;
        } else if (node.comment !== null) {
          const cc = body === void 0 ? comments.before : comments.after;
          cc.push(node.comment);
        } else if (node.type === PlainValue.Type.BLANK_LINE) {
          spaceBefore = true;
          if (body === void 0 && comments.before.length > 0 && !doc.commentBefore) {
            doc.commentBefore = comments.before.join('\n');
            comments.before = [];
          }
        }
      }
      doc.contents = body || null;
      if (!body) {
        doc.comment = comments.before.concat(comments.after).join('\n') || null;
      } else {
        const cb = comments.before.join('\n');
        if (cb) {
          const cbNode = body instanceof resolveSeq.Collection && body.items[0] ? body.items[0] : body;
          cbNode.commentBefore = cbNode.commentBefore
            ? `${cb}
${cbNode.commentBefore}`
            : cb;
        }
        doc.comment = comments.after.join('\n') || null;
      }
    }
    function resolveTagDirective({ tagPrefixes }, directive) {
      const [handle, prefix] = directive.parameters;
      if (!handle || !prefix) {
        const msg = 'Insufficient parameters given for %TAG directive';
        throw new PlainValue.YAMLSemanticError(directive, msg);
      }
      if (tagPrefixes.some(p => p.handle === handle)) {
        const msg = 'The %TAG directive must only be given at most once per handle in the same document.';
        throw new PlainValue.YAMLSemanticError(directive, msg);
      }
      return {
        handle,
        prefix
      };
    }
    function resolveYamlDirective(doc, directive) {
      let [version] = directive.parameters;
      if (directive.name === 'YAML:1.0') version = '1.0';
      if (!version) {
        const msg = 'Insufficient parameters given for %YAML directive';
        throw new PlainValue.YAMLSemanticError(directive, msg);
      }
      if (!documentOptions[version]) {
        const v0 = doc.version || doc.options.version;
        const msg = `Document will be parsed as YAML ${v0} rather than YAML ${version}`;
        doc.warnings.push(new PlainValue.YAMLWarning(directive, msg));
      }
      return version;
    }
    function parseDirectives(doc, directives, prevDoc) {
      const directiveComments = [];
      let hasDirectives = false;
      for (const directive of directives) {
        const { comment, name } = directive;
        switch (name) {
          case 'TAG':
            try {
              doc.tagPrefixes.push(resolveTagDirective(doc, directive));
            } catch (error) {
              doc.errors.push(error);
            }
            hasDirectives = true;
            break;
          case 'YAML':
          case 'YAML:1.0':
            if (doc.version) {
              const msg = 'The %YAML directive must only be given at most once per document.';
              doc.errors.push(new PlainValue.YAMLSemanticError(directive, msg));
            }
            try {
              doc.version = resolveYamlDirective(doc, directive);
            } catch (error) {
              doc.errors.push(error);
            }
            hasDirectives = true;
            break;
          default:
            if (name) {
              const msg = `YAML only supports %TAG and %YAML directives, and not %${name}`;
              doc.warnings.push(new PlainValue.YAMLWarning(directive, msg));
            }
        }
        if (comment) directiveComments.push(comment);
      }
      if (prevDoc && !hasDirectives && (doc.version || prevDoc.version || doc.options.version) === '1.1') {
        const copyTagPrefix = ({ handle, prefix }) => ({
          handle,
          prefix
        });
        doc.tagPrefixes = prevDoc.tagPrefixes.map(copyTagPrefix);
        doc.version = prevDoc.version;
      }
      doc.commentBefore = directiveComments.join('\n') || null;
    }
    function assertCollection(contents) {
      if (contents instanceof resolveSeq.Collection) return true;
      throw new Error('Expected a YAML collection as document contents');
    }
    var Document = class {
      constructor(options) {
        this.anchors = new Anchors(options.anchorPrefix);
        this.commentBefore = null;
        this.comment = null;
        this.contents = null;
        this.directivesEndMarker = null;
        this.errors = [];
        this.options = options;
        this.schema = null;
        this.tagPrefixes = [];
        this.version = null;
        this.warnings = [];
      }
      add(value) {
        assertCollection(this.contents);
        return this.contents.add(value);
      }
      addIn(path, value) {
        assertCollection(this.contents);
        this.contents.addIn(path, value);
      }
      delete(key) {
        assertCollection(this.contents);
        return this.contents.delete(key);
      }
      deleteIn(path) {
        if (resolveSeq.isEmptyPath(path)) {
          if (this.contents == null) return false;
          this.contents = null;
          return true;
        }
        assertCollection(this.contents);
        return this.contents.deleteIn(path);
      }
      getDefaults() {
        return Document.defaults[this.version] || Document.defaults[this.options.version] || {};
      }
      get(key, keepScalar) {
        return this.contents instanceof resolveSeq.Collection ? this.contents.get(key, keepScalar) : void 0;
      }
      getIn(path, keepScalar) {
        if (resolveSeq.isEmptyPath(path)) return !keepScalar && this.contents instanceof resolveSeq.Scalar ? this.contents.value : this.contents;
        return this.contents instanceof resolveSeq.Collection ? this.contents.getIn(path, keepScalar) : void 0;
      }
      has(key) {
        return this.contents instanceof resolveSeq.Collection ? this.contents.has(key) : false;
      }
      hasIn(path) {
        if (resolveSeq.isEmptyPath(path)) return this.contents !== void 0;
        return this.contents instanceof resolveSeq.Collection ? this.contents.hasIn(path) : false;
      }
      set(key, value) {
        assertCollection(this.contents);
        this.contents.set(key, value);
      }
      setIn(path, value) {
        if (resolveSeq.isEmptyPath(path)) this.contents = value;
        else {
          assertCollection(this.contents);
          this.contents.setIn(path, value);
        }
      }
      setSchema(id, customTags) {
        if (!id && !customTags && this.schema) return;
        if (typeof id === 'number') id = id.toFixed(1);
        if (id === '1.0' || id === '1.1' || id === '1.2') {
          if (this.version) this.version = id;
          else this.options.version = id;
          delete this.options.schema;
        } else if (id && typeof id === 'string') {
          this.options.schema = id;
        }
        if (Array.isArray(customTags)) this.options.customTags = customTags;
        const opt = Object.assign({}, this.getDefaults(), this.options);
        this.schema = new Schema.Schema(opt);
      }
      parse(node, prevDoc) {
        if (this.options.keepCstNodes) this.cstNode = node;
        if (this.options.keepNodeTypes) this.type = 'DOCUMENT';
        const { directives = [], contents = [], directivesEndMarker, error, valueRange } = node;
        if (error) {
          if (!error.source) error.source = this;
          this.errors.push(error);
        }
        parseDirectives(this, directives, prevDoc);
        if (directivesEndMarker) this.directivesEndMarker = true;
        this.range = valueRange ? [valueRange.start, valueRange.end] : null;
        this.setSchema();
        this.anchors._cstAliases = [];
        parseContents(this, contents);
        this.anchors.resolveNodes();
        if (this.options.prettyErrors) {
          for (const error2 of this.errors) if (error2 instanceof PlainValue.YAMLError) error2.makePretty();
          for (const warn of this.warnings) if (warn instanceof PlainValue.YAMLError) warn.makePretty();
        }
        return this;
      }
      listNonDefaultTags() {
        return listTagNames(this.contents).filter(t => t.indexOf(Schema.Schema.defaultPrefix) !== 0);
      }
      setTagPrefix(handle, prefix) {
        if (handle[0] !== '!' || handle[handle.length - 1] !== '!') throw new Error('Handle must start and end with !');
        if (prefix) {
          const prev = this.tagPrefixes.find(p => p.handle === handle);
          if (prev) prev.prefix = prefix;
          else
            this.tagPrefixes.push({
              handle,
              prefix
            });
        } else {
          this.tagPrefixes = this.tagPrefixes.filter(p => p.handle !== handle);
        }
      }
      toJSON(arg, onAnchor) {
        const { keepBlobsInJSON, mapAsMap, maxAliasCount } = this.options;
        const keep = keepBlobsInJSON && (typeof arg !== 'string' || !(this.contents instanceof resolveSeq.Scalar));
        const ctx = {
          doc: this,
          indentStep: '  ',
          keep,
          mapAsMap: keep && !!mapAsMap,
          maxAliasCount,
          stringify
        };
        const anchorNames = Object.keys(this.anchors.map);
        if (anchorNames.length > 0)
          ctx.anchors = new Map(
            anchorNames.map(name => [
              this.anchors.map[name],
              {
                alias: [],
                aliasCount: 0,
                count: 1
              }
            ])
          );
        const res = resolveSeq.toJSON(this.contents, arg, ctx);
        if (typeof onAnchor === 'function' && ctx.anchors) for (const { count, res: res2 } of ctx.anchors.values()) onAnchor(res2, count);
        return res;
      }
      toString() {
        if (this.errors.length > 0) throw new Error('Document with errors cannot be stringified');
        const indentSize = this.options.indent;
        if (!Number.isInteger(indentSize) || indentSize <= 0) {
          const s = JSON.stringify(indentSize);
          throw new Error(`"indent" option must be a positive integer, not ${s}`);
        }
        this.setSchema();
        const lines = [];
        let hasDirectives = false;
        if (this.version) {
          let vd = '%YAML 1.2';
          if (this.schema.name === 'yaml-1.1') {
            if (this.version === '1.0') vd = '%YAML:1.0';
            else if (this.version === '1.1') vd = '%YAML 1.1';
          }
          lines.push(vd);
          hasDirectives = true;
        }
        const tagNames = this.listNonDefaultTags();
        this.tagPrefixes.forEach(({ handle, prefix }) => {
          if (tagNames.some(t => t.indexOf(prefix) === 0)) {
            lines.push(`%TAG ${handle} ${prefix}`);
            hasDirectives = true;
          }
        });
        if (hasDirectives || this.directivesEndMarker) lines.push('---');
        if (this.commentBefore) {
          if (hasDirectives || !this.directivesEndMarker) lines.unshift('');
          lines.unshift(this.commentBefore.replace(/^/gm, '#'));
        }
        const ctx = {
          anchors: Object.create(null),
          doc: this,
          indent: '',
          indentStep: ' '.repeat(indentSize),
          stringify
        };
        let chompKeep = false;
        let contentComment = null;
        if (this.contents) {
          if (this.contents instanceof resolveSeq.Node) {
            if (this.contents.spaceBefore && (hasDirectives || this.directivesEndMarker)) lines.push('');
            if (this.contents.commentBefore) lines.push(this.contents.commentBefore.replace(/^/gm, '#'));
            ctx.forceBlockIndent = !!this.comment;
            contentComment = this.contents.comment;
          }
          const onChompKeep = contentComment ? null : () => (chompKeep = true);
          const body = stringify(this.contents, ctx, () => (contentComment = null), onChompKeep);
          lines.push(resolveSeq.addComment(body, '', contentComment));
        } else if (this.contents !== void 0) {
          lines.push(stringify(this.contents, ctx));
        }
        if (this.comment) {
          if ((!chompKeep || contentComment) && lines[lines.length - 1] !== '') lines.push('');
          lines.push(this.comment.replace(/^/gm, '#'));
        }
        return lines.join('\n') + '\n';
      }
    };
    PlainValue._defineProperty(Document, 'defaults', documentOptions);
    exports2.Document = Document;
    exports2.defaultOptions = defaultOptions;
    exports2.scalarOptions = scalarOptions;
  }
});

// node_modules/yaml/dist/index.js
var require_dist = __commonJS({
  'node_modules/yaml/dist/index.js'(exports2) {
    'use strict';
    var parseCst = require_parse_cst();
    var Document$1 = require_Document_9b4560a1();
    var Schema = require_Schema_88e323a7();
    var PlainValue = require_PlainValue_ec8e588e();
    var warnings = require_warnings_1000a372();
    require_resolveSeq_d03cb037();
    function createNode(value, wrapScalars = true, tag) {
      if (tag === void 0 && typeof wrapScalars === 'string') {
        tag = wrapScalars;
        wrapScalars = true;
      }
      const options = Object.assign({}, Document$1.Document.defaults[Document$1.defaultOptions.version], Document$1.defaultOptions);
      const schema = new Schema.Schema(options);
      return schema.createNode(value, wrapScalars, tag);
    }
    var Document = class extends Document$1.Document {
      constructor(options) {
        super(Object.assign({}, Document$1.defaultOptions, options));
      }
    };
    function parseAllDocuments(src, options) {
      const stream = [];
      let prev;
      for (const cstDoc of parseCst.parse(src)) {
        const doc = new Document(options);
        doc.parse(cstDoc, prev);
        stream.push(doc);
        prev = doc;
      }
      return stream;
    }
    function parseDocument(src, options) {
      const cst = parseCst.parse(src);
      const doc = new Document(options).parse(cst[0]);
      if (cst.length > 1) {
        const errMsg = 'Source contains multiple documents; please use YAML.parseAllDocuments()';
        doc.errors.unshift(new PlainValue.YAMLSemanticError(cst[1], errMsg));
      }
      return doc;
    }
    function parse(src, options) {
      const doc = parseDocument(src, options);
      doc.warnings.forEach(warning => warnings.warn(warning));
      if (doc.errors.length > 0) throw doc.errors[0];
      return doc.toJSON();
    }
    function stringify(value, options) {
      const doc = new Document(options);
      doc.contents = value;
      return String(doc);
    }
    var YAML = {
      createNode,
      defaultOptions: Document$1.defaultOptions,
      Document,
      parse,
      parseAllDocuments,
      parseCST: parseCst.parse,
      parseDocument,
      scalarOptions: Document$1.scalarOptions,
      stringify
    };
    exports2.YAML = YAML;
  }
});

// node_modules/yaml/index.js
var require_yaml = __commonJS({
  'node_modules/yaml/index.js'(exports2, module2) {
    module2.exports = require_dist().YAML;
  }
});

// src/action_library.js
var require_action_library = __commonJS({
  'src/action_library.js'(exports2, module2) {
    var core2 = require_core();
    var fs = require('fs');
    var { env } = require('process');
    var yaml = require_yaml();
    var action_library2 = class {
      getFileYaml = path => {
        const fileData = fs.readFileSync(path, 'utf8');
        const fileYaml = yaml.parse(fileData);
        return fileYaml;
      };
      filterObjectProperties = (filterObject, filterFunction, keyTransform) =>
        Object.keys(filterObject)
          .filter(k => filterFunction(k))
          .reduce((scoped, key) => {
            const returnKey = keyTransform ? keyTransform(key) : key;
            return {
              ...scoped,
              [returnKey]: filterObject[key]
            };
          }, {});
      getCurrentEnvironmentVars = () => this.filterObjectProperties(process.env, k => k.includes('@'));
      keyName = key => key.split('@')[0];
      keyIsPartOfScope = (scope, key) => {
        const scopes = key
          .split('@')[1]
          .split(' ')
          .map(s => s.toUpperCase());
        return scopes.includes(scope.toUpperCase());
      };
      buildAllKeysUsed = newItems =>
        Object.keys(newItems).reduce((keys, key) => {
          return {
            ...keys,
            [this.keyName(key)]: false
          };
        }, {});
      errorOnNoMatchProcessUnusedKeys(inputItems, environmentItems, scopedItems) {
        const allKeys = { ...this.buildAllKeysUsed(inputItems), ...this.buildAllKeysUsed(environmentItems) };
        Object.keys(scopedItems).forEach(key => {
          allKeys[key] = true;
        });
        const unused = this.filterObjectProperties(allKeys, f => !allKeys[f]);
        const unusedKeys = Object.keys(unused);
        for (let u in unusedKeys) {
          core2.warning(`<<${unusedKeys[u]}>>: env/input key unused by scope specified.`);
        }
      }
      buildEnvironmentDictionary = (input_scope2, inputItems, environmentItems, errorOnNoMatch2) => {
        const scopedItems = {};
        const inputScoped = this.filterObjectProperties(inputItems, k => this.keyIsPartOfScope(input_scope2, k), this.keyName);
        const environmentScoped = this.filterObjectProperties(environmentItems, k => this.keyIsPartOfScope(input_scope2, k), this.keyName);
        for (let i in inputScoped) {
          scopedItems[i] = inputScoped[i];
        }
        for (let e in environmentScoped) {
          if (scopedItems[e]) {
            core2.warning(`<<${e}>>: key and scope specified as env and input file var, env var will be used.`);
          }
          scopedItems[e] = environmentScoped[e];
        }
        if (errorOnNoMatch2) {
          this.errorOnNoMatchProcessUnusedKeys(inputItems, environmentItems, scopedItems);
        }
        return scopedItems;
      };
      setEnvironmentVar = (key, value) => {
        core2.exportVariable(key, value);
        core2.info(`Set env var: ${key} = ${value}`);
      };
      setOutputVar = (key, value) => {
        core2.setOutput(key, value);
        core2.info(`Set output var: ${key} = ${value}`);
      };
    };
    module2.exports = { action_library: action_library2 };
  }
});

// src/main.js
var core = require_core();
var { action_library } = require_action_library();
var library = new action_library();
var input_scope = core.getInput('scope');
var createOutputVariables = core.getBooleanInput('create-output-variables');
var inputFilePath = core.getInput('input-file');
var inputYaml = inputFilePath.length > 0 ? library.getFileYaml(inputFilePath) : {};
var errorOnNoMatch = core.getBooleanInput('error-on-no-match');
var customErrorMessage = core.getInput('custom-error-message');
if (!errorOnNoMatch && customErrorMessage) {
  core.info('custom-error-message is specified, but error-on-no-match is not.');
}
var environmentYaml = library.getCurrentEnvironmentVars();
var environmentDictionary = library.buildEnvironmentDictionary(input_scope, inputYaml, environmentYaml, errorOnNoMatch);
console.log('Scoped Variables:', environmentDictionary);
for (let envVar in environmentDictionary) {
  library.setEnvironmentVar(envVar, environmentDictionary[envVar]);
  if (createOutputVariables) {
    library.setOutputVar(envVar, environmentDictionary[envVar]);
  }
}
if (errorOnNoMatch && Object.keys(environmentDictionary).length == 0) {
  core.setFailed(customErrorMessage.length > 0 ? customErrorMessage : 'No variable scope matches.');
}
