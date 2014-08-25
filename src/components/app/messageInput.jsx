/** @jsx React.DOM */

app.components.message_input = function() {
  var nickBox = React.createBackboneClass({
    componentDidUpdate: function() {
      var position = $('ul li:nth-child(' + this.props.selectedIndex + ')', this.getDOMNode()).position();
      position = position ? position.top : 0;
      if(this.props.tabMode) {
        $(this.getDOMNode()).animate({
          scrollTop: position
        }, 200);
      }
    },

    handleSelect: function(ev) {
      this.props.selectUser($(ev.target).index());
    },

    render: function() {
      var _this = this;
      return (
        <div className={this.props.tabMode ? "nickBox" : "nickBox hide"}>
          <ul>
            {this.props.nicks.map(function(user, idx){
              return (
                <li onClick={_this.handleSelect} className={_this.props.selectedIndex-1 === idx ? "selected": ""}>
                  <span className={user.isActive()}>
                    <i className="fa fa-circle"></i>
                  </span>
                  <span>{user.get("type")}{user.get("nick")}</span>
                  <span className="lastActive">{user.getActive()}</span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  });

  var MessageInput = React.createBackboneClass({
    getInitialState: function() {
      return {
        nicks: [],
        selectedIndex: 0
      };
    },

    selectUser: function(index) {
      this.state.selectedIndex = index;

      // We pass a pseudo event to our keyDown handler
      this.keyDown({
        keyCode: 9,
        target: $('input', this.getDOMNode())[0],
        preventDefault: function() {}
      });

      // This will cause the nick box to close
      this.setState({tabMode: false});
    },

    keyDown: function(ev) {
      // handle tabKey and autocompletion
      if (ev.keyCode === 9) {
        var server = app.irc.getActiveServer();
        var channel = app.irc.getActiveChannel();

        var sentence = ev.target.value.split(" ");
        ev.target.focus();
        ev.preventDefault();

        // Variable to keep track of
        if(!this.state.tabMode) {
          this.setState({tabMode: true})
          this.partialMatch = new RegExp(sentence.pop(), "i");
          this.originalSentence = _.extend([], sentence);
        }

        // Filter our channels users to the ones that start with our
        // partial match
        var _this = this;
        var users = channel.get("users").filter(function(user) {
          return (user.get("nick").search(_this.partialMatch) === 0 &&
                  user.get("nick") !== server.get("nick"));
        });

        this.setState({nicks: users});

        if (this.state.selectedIndex >= users.length) {
          this.state.selectedIndex = 0;
        }

        if (users.length) {
          //sentence.push(users[this.state.selectedIndex].get('nick'));
          var usr = users[this.state.selectedIndex].get('nick');
          if (this.originalSentence.length === 0) {
            ev.target.value = this.originalSentence.join(' ') + usr + ": ";
          } else {
            ev.target.value = this.originalSentence.join(' ') + " " + usr;
          }
        }

        this.setState({selectedIndex: ++this.state.selectedIndex});
      } else {
        this.setState({tabMode: false, selectedIndex: 0})
      }
    },

    handleInput: function(ev) {
      // If the user pushed enter
      var server = app.irc.getActiveServer();
      var channel = app.irc.getActiveChannel();
      var target = channel.get("name");

      var input = ev.target.value;

      if (input === "") {
        return;
      }

      if (ev.keyCode === 13) {
        input = ev.target.value;

        // If the first character is a slash
        if (input[0] === "/" && input.indexOf("/me") !== 0) {
          // Stript the slash but emit the rest as a command
          app.io.emit("command", {server: server.get("name"), target: target, command: input.substring(1)});
          if (input.indexOf("/msg") === 0 ) {
            var new_channel = input.split(" ")[1];
            server.addChannel(new_channel);
            server.addMessage(new_channel, {from: server.get("nick"), text: input.split(" ").splice(2).join(" ")});
          }
        } else if(input.indexOf("/me") === 0) {
          app.io.emit("command", {server: server.get("name"), target: target, command: input.substring(1)});
          server.addMessage(target, {from: server.get("nick"), text: input.replace("/me", '\u0001ACTION'), type: "PRIVMSG"});
        } else {
          app.io.emit("say", {server: server.get("name"), target: target, text: input});
          server.addMessage(target, {from: server.get("nick"), text: input, type: "PRIVMSG"});
        }
        channel.get("history").push(input);
        ev.target.value = "";
      }

      if (ev.keyCode === 38) {
        // handle up key
        ev.target.value = channel.getNextHistory();
      }

      if (ev.keyCode === 40) {
        // handle down key
        ev.target.value = channel.getPrevHistory();
      }
    },

    render: function() {
      return (
        <div className="messageInput">
          <nickBox selectUser={this.selectUser} nicks={this.state.nicks} selectedIndex={this.state.selectedIndex} tabMode={this.state.tabMode}/>
          <input ref="messageInput" onKeyDown={this.keyDown} onKeyUp={this.handleInput} placeholder="You type here..."/>
        </div>
      );
    }
  });

  return MessageInput;
}
