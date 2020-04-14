import React, { Component } from "react";
import Spinner from "../spinner";
import SwapiService from "../../services/swapi-service";
import ErrorComponent from "../error-component";

import "./item-list.css";

export default class ItemList extends Component {
  swapiService = new SwapiService();

  state = {
    people: {},
    loading: true,
    error: false,
  };

  constructor() {
    super();
    this.updatePeople();
  }

  onPeopleLoaded = (people) => {
    this.setState({
      people,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updatePeople() {
    this.swapiService
      .getAllPeople()
      .then(this.onPeopleLoaded)
      .catch(this.onError);
  }

  render() {
    const { people, loading, error } = this.state;

    const errorMessage = error ? <ErrorComponent /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <PeopleView people={people} /> : null;
    return (
      <div className="random-planet jumbotron list">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}
const PeopleView = ({ people }) => {
  const namePeople = [];

  for (let i = 0; i < people.length; i++) {
    namePeople.push(people[i].name);
  }

  const listName = namePeople.map((name) => {
    return (
      <li className="list-group-item" key={name}>
        {name}
      </li>
    );
  });

  return <ul className="item-list list-group">{listName}</ul>;
};
