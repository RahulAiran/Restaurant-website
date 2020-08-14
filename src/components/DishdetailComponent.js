import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Modal,ModalHeader,
    ModalBody, Label,Button } from 'reactstrap';

import { Link } from 'react-router-dom';

import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

const optionsList= [{value:"1"},{value:"2"},{value:"3"},{value:"4"},{value:"5"}];

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal = ()=>{
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }


  handleSubmit(values) {
    this.toggleModal();
this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }

    render(){
        
        return(
            <div>
                <button 
                    onClick={this.toggleModal} 
                    type="button" class="btn btn-outline-secondary">
                        <span 
                            className="fa fa-pencil mr-1">
                        </span>
                        Submit Comment
                </button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm initialState={{ rating: '1' }} onSubmit={(values) => this.handleSubmit(values)}>
                            <div className = "form-group">
                                <Label htmlFor="rating">Rating</Label>
                                    
                                <Control.select model=".rating" id="rating" name="rating"
                                    className="form-control">
                                    {optionsList.map( 
                                            opt=>(
                                                <option 
                                                    key={opt.value}
                                                    value={opt.value} 
                                                    name={opt.value}>
                                                    {opt.value}
                                                </option>)
                                    )}
                                </Control.select>
                            </div>

                            <div className = "form-group">
                                <Label htmlFor="firstname">First Name</Label>
                                    
                                <Control.text model=".firstname" id="firstname" name="firstname"
                                    placeholder="First Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                     />
                                <Errors
                                    className="text-danger"
                                    model=".firstname"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                 />
                             </div>
                             <div className = "form-group">
                                <Label htmlFor="comment">Comment</Label>
                                    
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control" />
                             </div>
                                <Button type="submit" color="primary">
                                        submit
                                        </Button>
                                
                            
                        </LocalForm>
                    </ModalBody>
                </Modal>

            </div>
        )
    }
}

function RenderDish({dish}){
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle><span className="font-weight-bold">{dish.name}</span></CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    }

function RenderComments({comments,addComment,dishId}){
        if(comments != null){
            return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                                        
                    {
                        comments.map((c)=>{
                                return(
                                    <div>
                                    <li><span>{c.comment}</span></li>
                                    <li><span>-- {c.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}</span></li>
                                    <br/>
                                    </div>
                                    );
                            }

                        )
                    }
                    </ul>
                    <CommentForm dishId={dishId} addComment={addComment} />
                </div>
            )
        }
        else{
            return(
                <div></div>
            );
        }
    }

const Dishdetail = (props)=>{

    
    if (props.dish != null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
        addComment={props.addComment}
        dishId={props.dish.id}
      />

                    </div>
                </div>
            </div>
        );
    }
    else{
        return(
            <div></div>
        );
    }
    
}

export default Dishdetail;


