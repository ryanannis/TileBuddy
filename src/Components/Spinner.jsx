import React from 'react';

const Spinner = React.createClass({
    render: function(boardFormatName){
     return (
       <div className="loader">Loading...</div>
     );
    }
});

export default Spinner;