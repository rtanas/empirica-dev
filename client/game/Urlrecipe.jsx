import React from "react";

export default class Urlrecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recipe: "", count: props.count + 1 };
  }
  
  render() {    
    const { count } = this.props;
    return (      
      <form onSubmit={this.handleSubmit}>
        <div className="formdiv">
          <label>
            URL Recipes {count + 1}
          </label>
          <div className="bp3-form-content">
            <input            
              className="bp3-input"
              type="text"          
            />
          </div>
        </div>
      </form>      
      
    );
  }


  handleSubmit = (e) => {   
    e.preventDefault();          
  }

  
}
