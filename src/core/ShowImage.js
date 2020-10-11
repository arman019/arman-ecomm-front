import React from "react";
import { API } from "../config";



const ShowImage = ({ item, url }) => (
    <div className="product-img col-12 col-md">
        <img
            src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className="mb-3 "
            height="100%"
            width="100%"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          
        />
    </div>
);

export default ShowImage;

{/* <Card>
<CardImg src={item.image} alt={item.name} />
<CardBody>
<CardTitle>{item.name}</CardTitle>
{item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
<CardText>{item.description}</CardText>
</CardBody>
</Card> */}