import React from "react";
import { Card } from "react-bootstrap";


class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="container">
        <div className="rounded-border d-flex flex-row align-items-center bg-light">
          <Card border="dark">
            <Card.Img variant="top" src={``}/>
            <Card.Title>
              
            </Card.Title>
          </Card>
        </div>
      </div>
    );
  }
}

export default Recipe;