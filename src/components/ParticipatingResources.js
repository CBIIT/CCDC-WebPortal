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
        <p>
            {/* This is the participating resources page. */}
        </p>

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

        {/* <Grid container 
            item
            xs={3}
            direction="column"
            className="flex-col-scroll browse-container overflow-auto">
        </Grid>

        <Grid container spacing={3} className="catalog-update flex-section">
			<Grid item xs={4}>
				<Typography variant="h4" component="h4">
					Highlighted message identifies new approach for the catalog
				</Typography>
			</Grid>
			<Grid item xs={8}>
				<Typography variant="body2" component="p">
					Explanation of new features, new resources, or highlighted user
					success story. Use this space to explain the purpose of PODCat
					and goals for the site.
				</Typography>
			</Grid>
		</Grid> */}





		
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