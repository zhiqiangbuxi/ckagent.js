(function(window,undefined){
    window.ckagent={
        'elements':null,
        'start':function(){
                //初始化 engine
                var engine = {
                    ie: 0,
                    gecko: 0,
                    webkit: 0,
                    khtml: 0,
                    opera: 0,
                    //complete version
                    ver: null
                };
                // 初始化 browsers
                var browser = {
                    //browsers
                    ie: 0,
                    firefox: 0,
                    safari: 0,
                    konq: 0,
                    opera: 0,
                    chrome: 0,
                    //specific version
                    ver: null
                };
                //初始化 platform/device/OS
                var system = {
                    win: false,
                    mac: false,
                    x11: false,
                    //mobile devices
                    iphone: false,
                    ipod: false,
                    ipad: false,
                    ios: false,
                    android: false,
                    nokiaN: false,
                    winMobile: false,
                    //game systems
                    wii: false,
                    ps: false
                };
                //匹配 engines/browsers agent
                var ua = navigator.userAgent;
                if (window.opera) {
                    engine.ver = browser.ver = window.opera.version();
                    engine.opera = browser.opera = parseFloat(engine.ver);
                } else if (/AppleWebKit\/(\S+)/.test(ua)) {
                    engine.ver = RegExp["$1"];
                    engine.webkit = parseFloat(engine.ver);
                    //figure out if it's Chrome or Safari
                    if (/Chrome\/(\S+)/.test(ua)) {
                        browser.ver = RegExp["$1"];
                        browser.chrome = parseFloat(browser.ver);
                    } else if (/Version\/(\S+)/.test(ua)) {
                        browser.ver = RegExp["$1"];
                        browser.safari = parseFloat(browser.ver);
                    } else {
                        //approximate version
                        var safariVersion = 1;
                        if (engine.webkit < 100) {
                            safariVersion = 1;
                        } else if (engine.webkit < 312) {
                            safariVersion = 1.2;
                        } else if (engine.webkit < 412) {
                            safariVersion = 1.3;
                        } else {
                            safariVersion = 2;
                        }
                        browser.safari = browser.ver = safariVersion;
                    }
                } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
                    engine.ver = browser.ver = RegExp["$1"];
                    engine.khtml = browser.konq = parseFloat(engine.ver);
                } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
                    engine.ver = RegExp["$1"];
                    engine.gecko = parseFloat(engine.ver);

                    //determine if it's Firefox
                    if (/Firefox\/(\S+)/.test(ua)) {
                        browser.ver = RegExp["$1"];
                        browser.firefox = parseFloat(browser.ver);
                    }
                } else if (/MSIE ([^;]+)/.test(ua)) {
                    engine.ver = browser.ver = RegExp["$1"];
                    engine.ie = browser.ie = parseFloat(engine.ver);
                }
                //detect browsers
                browser.ie = engine.ie;
                browser.opera = engine.opera;
                //detect platform
                var p = navigator.platform;
                system.win = p.indexOf("Win") == 0;
                system.mac = p.indexOf("Mac") == 0;
                system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
                //detect windows operating systems
                if (system.win) {
                    if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
                        if (RegExp["$1"] == "NT") {
                            switch (RegExp["$2"]) {
                                case "5.0":
                                    system.win = "2000";
                                    break;
                                case "5.1":
                                    system.win = "XP";
                                    break;
                                case "6.0":
                                    system.win = "Vista";
                                    break;
                                case "6.1":
                                    system.win = "7";
                                    break;
                                default:
                                    system.win = "NT";
                                    break;
                            }
                        } else if (RegExp["$1"] == "9x") {
                            system.win = "ME";
                        } else {
                            system.win = RegExp["$1"];
                        }
                    }
                }
                //手机设备
                system.iphone = ua.indexOf("iPhone") > -1;
                system.ipod = ua.indexOf("iPod") > -1;
                system.ipad = ua.indexOf("iPad") > -1;
                system.nokiaN = ua.indexOf("NokiaN") > -1;
                //windows mobile
                if (system.win == "CE") {
                    system.winMobile = system.win;
                } else if (system.win == "Ph") {
                    if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
                        ;
                        system.win = "Phone";
                        system.winMobile = parseFloat(RegExp["$1"]);
                    }
                }
                //determine iOS version
                if (system.mac && ua.indexOf("Mobile") > -1) {
                    if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
                        system.ios = parseFloat(RegExp.$1.replace("_", "."));
                    } else {
                        system.ios = 2;  //can't really detect - so guess
                    }
                }
                //determine Android version
                if (/Android (\d+\.\d+)/.test(ua)) {
                    system.android = parseFloat(RegExp.$1);
                }
                //gaming systems
                system.wii = ua.indexOf("Wii") > -1;
                system.ps = /playstation/i.test(ua);
                //return it
                return {
                    engine: engine,
                    browser: browser,
                    system: system
                };
        },
        'type':null,
        'client':null,
        agent:function(type){
            var client=this.client?this.client:this.start();
            var allInfo=[];
            for(var b in client){
                var tmpInfo=[];
                for(var c in client[b]){
                    if(c=='ver') continue;
                    tmpInfo.push(c);
                }
                allInfo[b]=tmpInfo;
            }
            return (arguments.length)?allInfo[type]:allInfo;
        },
        browser:function(r,v){
            var client=this.client?this.client:this.start(),br,current;
            var keys=(this.type)?this.type:'browser';
            for(var b in client[keys]){
                if(parseInt(client[keys][b])&&b!='ver'){
                    br=b;
                    var cur="{'"+keys+"':'"+br+"','version':'"+client[keys].ver+"'}";
                    eval('current='+cur.toString());
                }else{
                    br='The '+keys+' is not  mainstream!';
                }
            }
            if(!arguments.length) return current;
            if(arguments.length==1){
                return (current[keys]== r.toLowerCase())?true:false;
            }else if(arguments.length==2){
                var reg=new RegExp("^"+v+".*?",'ig');
                return (current[keys]== r.toLowerCase()&&(reg.test(current['version'])))?true:false;
            }else{
                return {keys:br,'version':client[keys].ver};
            }
        },
        system:function(r,v){
            var client=this.client?this.client:this.start();
            for(var b in client.system){
                if(client.system[b]){
                    current={'system':b,'version':client.system[b]};
                }else{
                    br='The system is not  mainstream!';
                }
            }
            if(!arguments.length) return current;
            var reg=new RegExp(".*?"+current['system']+".*?",'ig');
            if(arguments.length==1){
                return (reg.test(r.toLowerCase()))?true:false;
            }else if(arguments.length==2){
                return (current['version']==v&&reg.test(r.toLowerCase()))?true:false;
            }
        },
        engine:function(r,v){
            this.type='engine';
            if(!arguments.length){
                return this.browser.call(this);
            }else if(arguments.length==1){
                return this.browser.call(this,r);
            }else{
                return this.browser.call(this,r,v);
            };
        }
    }
    window.ckagent=ckagent;
})(window)
