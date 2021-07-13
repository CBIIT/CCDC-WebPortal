import React from "react";

import ReactDOM from 'react-dom';

//import { Divider } from '@material-ui/core';

import {Link} from "react-router-dom";

import {
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Grid,
	Tab,
	Tabs,
	Typography,
	AppBar,
	Toolbar,
} from "@material-ui/core";

const ParticipatingResourcesPage = () => (
    <div>
        <h2>Participating Resources</h2>

		<form>
                {/* <h5 >Search the Catalog</h5> */}
                <input
                    style={{ width: "1000px" }}
                    type="text"
                />
        </form>

		<Link to="ParticipatingResources" className="btn btn-primary btn-sm">
            
            Search
        </Link>

		{/* List of potential resources being used in card view */}
		
        <Card className="info-card">
			<CardContent>
				<Typography variant="h5" component="h2">
					<Link to="ResourceDetail"  >Resource 1</Link>
					{/* Resource 1 */}
				</Typography>
				<Typography variant="body2" component="p" className="info-card-text">
					This will be a brief description about the resource and other relevant information.
				</Typography>
			</CardContent>
			<CardActions>
				<Button color="secondary"
						size="small"
						onClick={(e) => window.open("https://www.cancer.gov/contact", "_blank")}>
					External Link
				</Button>
			</CardActions>
		</Card>

        <Card className="info-card">
			<CardContent>
				<Typography variant="h5" component="h2">
					{/* Resource 2 */}
					<Link to="ResourceDetail"  >Resource 2</Link>
				</Typography>
				<Typography variant="body2" component="p" className="info-card-text">
                This will be a brief description about the resource and other relevant information.
				</Typography>
			</CardContent>
			<CardActions>
				<Button color="secondary"
						size="small"
						onClick={(e) => window.open("https://www.cancer.gov/contact", "_blank")}>
					External Link
				</Button>
			</CardActions>
		</Card>

        <Card className="info-card">
			<CardContent>
				<Typography variant="h5" component="h2">
					{/* Resource 3 */}
					<Link to="ResourceDetail"  >Resource 3</Link>
				</Typography>
				<Typography variant="body2" component="p" className="info-card-text">
                This will be a brief description about the resource and other relevant information.
				</Typography>
			</CardContent>
			<CardActions>
				<Button color="secondary"
						size="small"
						onClick={(e) => window.open("https://www.cancer.gov/contact", "_blank")}>
					External Link
				</Button>
			</CardActions>
		</Card>

		<Card className="info-card">
			<CardContent>
				<Typography variant="h5" component="h2">
					{/* Resource 4 */}
					<Link to="ResourceDetail"  >Resource 4</Link>
				</Typography>
				<Typography variant="body2" component="p" className="info-card-text">
					This will be a brief description about the resource and other relevant information.
				</Typography>
			</CardContent>
			<CardActions>
				<Button color="secondary"
						size="small"
						onClick={(e) => window.open("https://www.cancer.gov/contact", "_blank")}>
					External Link
				</Button>
			</CardActions>
		</Card>

		<Card className="info-card">
			<CardContent>
				<Typography variant="h5" component="h2">
					{/* Resource 5 */}
					<Link to="ResourceDetail"  >Resource 5</Link>
				</Typography>
				<Typography variant="body2" component="p" className="info-card-text">
					This will be a brief description about the resource and other relevant information.
				</Typography>
			</CardContent>
			<CardActions>
				<Button color="secondary"
						size="small"
						onClick={(e) => window.open("https://www.cancer.gov/contact", "_blank")}>
					External Link
				</Button>
			</CardActions>
		</Card>



    </div>

    
);

export default ParticipatingResourcesPage;