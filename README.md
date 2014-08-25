Subway
======

Subway is a web-based IRC client with a multi-user backend and a
JavaScript-heavy UI. Frontend/backend communication is done with
websockets (or best available fallback where not available).
The backend supports connection persistence and optional logging when the
browser disconnects.

Subway is built with [node.js](http://nodejs.org/),
[node-irc](https://github.com/martynsmith/node-irc)
and [Backbone.js](http://documentcloud.github.com/backbone/)/ReactJS and
[jQuery](http://jquery.com/) on the frontend.

Screenshots
------------

![Chat](http://i.imgur.com/y56tLP9.png)
![Settings](http://i.imgur.com/hgwRzHq.png)

Installation
------------

*Should be something like this, once implemented:*

1. Assuming you already have node.js, and npm, run:

        $ git clone https://github.com/thedjpetersen/subway.git
        $ cd subway

2. Install the dependencies using npm:
    
    	$ npm install

3. Launch the web server

        $ ./subway

4. Point your browser at `http://localhost:3000/`


Development
-----------

Discussion about the client takes place on this repository's [Issues](https://github.com/thedjpetersen/subway/issues) page.
Contributors are welcome and greatly appreciated.


Goals
-------

Its goals are twofold:

1) Become the best web-based IRC client available

2) Provide a really easy method of persistent IRC connections, available
   from any web browser

The inspiration for Subway was trying to watch a fellow programmer try
to explain how to set up screen/irssi to a non-technical person.


License
-------

Excepting third-party assets (licensed as specified in their respective files
or directories), this project is covered by the MIT License:


The MIT License (MIT)
Copyright (c) 2014 David Petersen

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
