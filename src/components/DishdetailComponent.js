import React , { Component } from 'react';
import { Card, CardImg , CardImgOverlay , CardText , CardBody , CardTitle } from 'reactstrap';

class DishDetail extends Component {

	constructor(props){
		super(props);

	}

/*	onDishSelect(dish){
		this.setState({selectedDish:dish});
	}*/
	renderDish(dish){
		if(dish != null){
			return(
				<Card>
					<CardImg src={dish.image} alt={dish.name} />
					<CardBody>
						 <CardTitle>{dish.name}</CardTitle>
						 <CardText>{dish.description}</CardText>
					</CardBody>
				</Card>
				);
		}
		else{
			return(
					<div></div>
				);
		}
	}

	parseDate(date) {
    const dateString = new Date(date);
    return dateString.toDateString();
  }
	   renderComments(comments){
		if(comments != null){
			return(
			<div>
				<h4>Comments</h4>
				<ul className="list-unstyled">
				{comments.map((comment) => (
				<li key={comment.id}>
				<p>{comment.comment}</p>
				<p> {comment.author} , {this.parseDate(comment.date)}
                </p>
                </li>
                ))}
                </ul>
				</div>
				);
		}
		else{
			return(
					<div></div>
				);
		}
	}

	render()
	{


		return (
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						{this.renderDish(this.props.selectedDish)}
					</div>

					<div className="col-12 col-md-5 m-1">
						{this.props.selectedDish !== null ? (
            this.renderComments(this.props.selectedDish.comments)
          ) : (
            <div></div>
          )}
						</div>
					</div>
			);
	}
}

export default DishDetail;