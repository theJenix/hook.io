var helpers = exports;


var Table = require('cli-table');


helpers.report = function ( suite, results ) {

  // instantiate
  var table = new Table({
      head: ['Diff', 'Expect', 'Actual', 'Namespace', 'Event', 'Data']
    , colWidths: [8, 8, 8, 42, 38, 20]
  });

  console.log('\n');
  console.log(' ' + suite.magenta + ' has completed, here is the report:' );
  
  
  var isIsWell = true;
  for (var e in results) {

    var s = e.split(' ');
    
    var tally = (results[e].expected - results[e].actual);
    if(tally == 0) {
      tally = tally.toString().green;
    } {
      tally = tally.toString().red;
    }
    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    table.push(
        [tally, results[e].expected, results[e].actual, s[0], s[1], (results[e].data || 'null')]
    );

    if(results[e].actual !== results[e].expected) {
      isIsWell = false;
    }

  }

  console.log(table.toString());
  
  console.log('\n');
  if (!isIsWell) {
    console.log(' It appears there has been some issues with this suite. You should look into that.'.red);
  }
  else {
    console.log(' All is well in the world'.green);
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  
}

helpers.fired = function ( event, expected_events, data ) {
  
  
  if (expected_events[event]) {
    if (!expected_events[event].actual) { 
      expected_events[event].actual = 0;
    }
    expected_events[event].actual++;
  }
  else {
    expected_events[event] = {};
    expected_events[event].expected = 0;
    expected_events[event].actual   = 1;
  }
  
  expected_events[event].data = data;
  return expected_events;
  
}