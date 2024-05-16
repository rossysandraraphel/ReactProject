import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const PersonList = () => {
  const [persons, setPersons] = useState([]);
  const [fetchMethod, setFetchMethod] = useState('api');

  useEffect(() => {
    if (fetchMethod === 'api') {
      axios.get(`https:d2b83f18-f85b-41e1-95fd-a175ef150e62.mock.pstmn.io/delivered`)
        .then(res => {
          setPersons(res.data);
        })
        .catch(error => console.error('Error fetching data from API:', error));
    } else if (fetchMethod === 'json') {
      fetch('./order_replace.json')
        .then(response => response.json())
        .then(data => setPersons(data))
        .catch(error => console.error('Error fetching data from JSON:', error));
    }
  }, [fetchMethod]);

  const fetchDataFromApi = () => {
    setFetchMethod('api');
  };

  const fetchDataFromJson = () => {
    setFetchMethod('json');
  };

  return (
    <div>
       <Stack spacing={2} direction="row">
       <Button variant="contained" onClick={fetchDataFromApi}>Successful delivery</Button>
      <Button variant="contained" onClick={fetchDataFromJson}>Order replacement</Button>
       </Stack>
      
      {/* <button onClick={fetchDataFromApi}>Fetch Data from API</button>
      <button onClick={fetchDataFromJson}>Fetch Data from JSON</button> */}
      <Timeline position="alternate">
        {persons.map((person, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot color="success"/>
              {index !== persons.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>{person.event}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};

export default PersonList;
