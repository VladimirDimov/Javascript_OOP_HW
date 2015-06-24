function solve() {
    'use strict';
    var domElement = (function() {
        var domElement = {
            init: function(type) {
                this.type = type;
                this.attributes = {};
                this.children = [];
                this.content = '';
                this.parent = null;
                return this;
            },
            appendChild: function(child) {
                if (typeof child !== 'string') {
                    child.parent = this;
                }
                this.children.push(child);

                return this;
            },
            addAttribute: function(name, value) {
                if (name === '' || (name.match(/[^\w\-]/))) {
                    throw 'Letters, digits and - only';
                }
                this.attributes[name] = value;
                return this;
            },
            get innerHTML() {
                return createInnerHtml(this);
            }
        };

        function createInnerHtml(obj) {
            var innerResult = '',
                result;
            if (obj.children.length > 0) {
                obj.children.forEach(function(item) {
                    typeof item === 'string' ? innerResult += item : innerResult += item.innerHTML;
                });
                result = '<' + obj.type + parseAttributes(obj.attributes) + '>' + innerResult + '</' + obj.type + '>';
            } else {
                result = '<' + obj.type + parseAttributes(obj.attributes) + '>' + obj.content + '</' + obj.type + '>';
            }

            return result;
        }

        function parseAttributes(obj) {
            var result = ' ',
                attr,
                arr = [];
            for (attr in obj) {
                arr.push([attr, obj[attr]]);
            }
            arr.sort();
            arr.forEach(function(item) {
                result += item[0] + '="' + item[1] + '" ';
            });
            return result.trimRight();
        }

        Object.defineProperty(domElement, 'type', {
            get: function() {
                return this._type;
            },
            set: function(value) {
                if (value === '' || value.match(/[^\w]/)) {
                    throw 'Letters and digits only';
                }

                this._type = value;
            },
            enumerable: true
        });

        Object.defineProperty(domElement, 'content', {
            get: function() {
                return this._content;
            },
            set: function(value) {
                if (!this.hasChildren) {
                    this._content = value;
                }
            },
            enumerable: true
        });

        return domElement;
    }());


    return domElement;
}

var domElement = solve();

var meta = Object.create(domElement)
    .init('meta')
    .addAttribute('charset', 'utf-8');

var head = Object.create(domElement)
    .init('head')
    .appendChild(meta);

var div = Object.create(domElement)
    .init('div')
    .addAttribute('style', 'font-size: 42px');

div.content = 'Hello, world!';

var body = Object.create(domElement)
    .init('body')
    .appendChild(div)
    .addAttribute('id', 'cuki')
    .addAttribute('bgcolor', '#012345');

var root = Object.create(domElement)
    .init('html')
    .appendChild(head)
    .appendChild(body);

console.log(head.parent);
console.log(root.innerHTML);

// Outputs:
// <html><head><meta charset="utf-8"></meta></head><body bgcolor="#012345" id="cuki"><div style="font-size: 42px">Hello, world!</div></body></html>

module.exports = solve;