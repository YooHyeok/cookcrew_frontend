import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import RECIPES from '../../data/data';


const RecipeCard = ({ RECIPES }) => {
    return (
        <div>
            {RECIPES.map(r => {
                return (
                <Card key={r.rno}
                  style={{
                    width: '18rem'
                  }}
                >
                  <img
                    alt="Sample"
                    src={r.thumbPath}
                  />
                  <CardBody>
                    <CardTitle tag="h5">
                      {r.title}
                    </CardTitle>
                    <CardSubtitle
                      className="mb-2 text-muted"
                      tag="h6"
                    >
                      {r.rkcal}
                    </CardSubtitle>
                    <CardText>
                      {r.regId}
                    </CardText>
                    <Button>
                      Button
                    </Button>
                  </CardBody>
                </Card>)
            })}
        </div>
    );
};

export default RecipeCard;