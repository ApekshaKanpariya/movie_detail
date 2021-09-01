import {useState, useEffect} from "react";

import Card from 'react-bootstrap/Card';
import InfiniteScroll from 'react-infinite-scroll-component';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import classes from './actor.module.css';
import Spinner from 'react-bootstrap/Spinner';

const Movie = () => {

    const [peoples ,setPeoples] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState();

    useEffect (() =>{
        fetchMoviesHandler();
      }, [page]);

      async function fetchMoviesHandler() {
        const response = await fetch('https://swapi.dev/api/people/?page='+page);
        const data = await response.json();
        setCount(data.count);
        const transformedPeople = data.results.map((peopleData) => {
          return {
            name: peopleData.name,
            gender: peopleData.gender,
            height: peopleData.height,
            weight: peopleData.mass
          };
        });
        setPeoples([...peoples, ...transformedPeople]);
        console.log(page);
      }
    
      const getMoreData = () => {
        setPage(page + 1);
      }

      return (

        <InfiniteScroll
            dataLength={peoples.length} //This is important field to render the next data
            next={getMoreData}
            hasMore={peoples.length !== count}
            loader={<div className={classes.spinner}><Spinner animation="grow" className={classes.load} /></div>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                <b className={classes.end}>Yay! You have seen it all</b>
                </p>
            }
            // below props only if you need pull down functionality
            >
            <Container>
              <div className={classes.main}>
              <Row xs={2} md={4} className="g-4">
                {peoples.map((people, index) => (
                  <Col key={index}> 
                    <Card border="danger" style={{ width: '18rem' }}>
                      <Card.Header>People Detail</Card.Header>
                      <Card.Body>
                          <Card.Title className={classes.title}>Name : {people.name}</Card.Title>
                          <Card.Text>
                            Gender : {people.gender} <br/>
                            Height : {people.height} <br/>
                            Weight : {people.weight} <br/>
                          </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              </div>
            </Container>
        </InfiniteScroll>
      );
};

export default Movie;