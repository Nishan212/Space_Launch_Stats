import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import classNames from "classnames";

const LAUNCH_QUERY = gql`
	query LaunchQuery($id: String!) {
		launch(id: $id) {
			id
			name
			details
			date_local
			success
			rocket
		}
	}
`;

const ROCKET_QUERY = gql`
	query RocketQuery($rocket: String!) {
		rocket(id: $rocket) {
			id
			name
			description
		}
	}
`;

export class Launch extends Component {
	render() {
		let { id } = this.props.match.params;

		return (
			<Fragment>
				<Query query={LAUNCH_QUERY} variables={{ id }}>
					{({ loading, error, data }) => {
						if (loading) return <h4>Loading...</h4>;
						if (error) console.log(error);

						const { name, details, date_local, success, rocket } = data.launch;

						return (
							<div>
								<h1 className="display-4 my-3">
									<span className="text-dark">Mission:</span> {name}
								</h1>
								<h4 className="mb-3">Launch Details</h4>
								<ul className="list-group">
									<li className="list-group-item">
										Launch Year: {new Date(date_local).getFullYear()}
									</li>
									<li className="list-group-item">
										Launch Successful:{" "}
										<span
											className={classNames({
												"text-success": success,
												"text-danger": !success,
											})}
										>
											{success ? "Yes" : "No"}
										</span>
									</li>
									<li className="list-group-item">Details: {details}</li>
								</ul>
								<hr />
								<Query query={ROCKET_QUERY} variables={{ rocket }}>
									{({ loading, error, data }) => {
										if (loading) return <h4>Loading...</h4>;
										if (error) console.log(error);

										const { name, description } = data.rocket;
										return (
											<div>
												<h4 className="mb-3">Rocket Details</h4>
												<ul className="list-group">
													<li className="list-group-item">
														Rocket Name: {name}
													</li>
													<li className="list-group-item">
														Description: {description}
													</li>
												</ul>
											</div>
										);
									}}
								</Query>
								<hr />

								<Link to="/" className="btn btn-secondary">
									Back
								</Link>
							</div>
						);
					}}
				</Query>
			</Fragment>
		);
	}
}

export default Launch;
